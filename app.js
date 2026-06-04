/* =========================
   DATA INITIALIZATION
========================= */
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000/api"
  : "https://notificationhub-sg9k.onrender.com/api";

const apps = [
  { id: "teams", name: "Teams", color: "#6264a7", connected: true },
  { id: "slack", name: "Slack", color: "#e01e5a", connected: true },
  { id: "outlook", name: "Outlook", color: "#0078d4", connected: true },
  { id: "zalo", name: "Zalo", color: "#0068ff", connected: true },
  { id: "discord", name: "Discord", color: "#5865f2", connected: false }
];

let notifications = [
  { id: 1, app: "teams", sender: "田中 太郎", message: "AI Visionミーティングであなたへの言及がありました。", time: "5分前", date: "今日", read: false },
  { id: 2, app: "slack", sender: "バックエンドチーム", message: "notification-service APIがステージング環境へのデプロイに成功しました。", time: "20分前", date: "今日", read: false },
  { id: 3, app: "outlook", sender: "人事部", message: "今週の面接スケジュールが更新されました。ご確認ください。", time: "昨日 16:20", date: "昨日", read: true },
  { id: 4, app: "zalo", sender: "営業部", message: "新規顧客リストがZaloモックシステムに同期されました。", time: "30分前", date: "今日", read: false }
];

const fallbackNotifications = [...notifications];

let selectedStatus = "all";
let selectedApp = "all";
let notificationIdToDelete = null; // 削除予定の通知IDを一時保存

/* =========================
   DOM ELEMENTS
========================= */
const appList = document.getElementById("appList");
const appFilters = document.getElementById("appFilters");
const notificationsContainer = document.getElementById("notificationsContainer");

const detailModal = document.getElementById("detailModal");
const closeDetailModal = document.getElementById("closeDetailModal");

const detailBadge = document.getElementById("detailBadge");
const detailSender = document.getElementById("detailSender");
const detailSubject = document.getElementById("detailSubject");
const detailMessage = document.getElementById("detailMessage");
const detailTime = document.getElementById("detailTime");
// Modal Elements
const deleteModal = document.getElementById("deleteModal");
const btnCancelDelete = document.getElementById("btnCancelDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");

/* =========================
   RENDER FUNCTIONS
========================= */
function renderApps() {
  appList.innerHTML = apps.map(app => `
    <div class="app-item">
      <div class="app-left">
        <div class="app-icon" style="background:${app.color}">${app.name.charAt(0)}</div>
        <div class="app-name">${app.name}</div>
      </div>
      <button class="connect-btn ${app.connected ? 'connected' : 'not-connected'}" data-app="${app.id}">
        ${app.connected ? "切断" : "接続"}
      </button>
    </div>
  `).join("");
}

function renderAppFilters() {
  let html = `<button class="app-filter-btn ${selectedApp === 'all' ? 'active' : ''}" data-app="all">すべてのアプリ</button>`;

  apps.filter(app => app.connected).forEach(app => {
    html += `<button class="app-filter-btn ${selectedApp === app.id ? 'active' : ''}" data-app="${app.id}">${app.name}</button>`;
  });

  appFilters.innerHTML = html;
}

function groupByDate(data) {
  const grouped = {};
  data.forEach(n => {
    if (!grouped[n.date]) grouped[n.date] = [];
    grouped[n.date].push(n);
  });
  return grouped;
}

function mapApiNotification(notification) {
  const sender = notification.sender || notification.from?.displayName || notification.username || notification.user || notification.subject || notification.platform || "Unknown";
  const message = notification.message || notification.text || notification.bodyPreview || notification.subject || "";
  const time = notification.timeAgo || notification.timestamp || "たった今";
  const date = notification.date || "今日";

  return {
    id: notification.id,
    app: notification.platform,
    sender,
    subject: notification.subject || "",
    message,
    time,
    date,
    read: Boolean(notification.is_read ?? notification.read),
    timestamp: notification.timestamp || null
  };
}

function normalizeApiResponse(payload) {
  if (!payload) return [];

  if (Array.isArray(payload.data)) {
    return payload.data.map(mapApiNotification);
  }

  if (Array.isArray(payload.notifications)) {
    return payload.notifications.map(mapApiNotification);
  }

  if (Array.isArray(payload.data?.notifications)) {
    return payload.data.notifications.map(mapApiNotification);
  }

  return [];
}

async function loadNotifications() {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications?page=1&limit=100`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const apiNotifications = normalizeApiResponse(payload);

    if (apiNotifications.length > 0) {
      notifications = apiNotifications;
      console.debug('Loaded notifications from API:', notifications.map(n => ({ id: n.id, platform: n.platform, read: n.read })));
    } else {
      notifications = fallbackNotifications;
    }
  } catch (error) {
    console.warn("バックエンドからデータを取得できませんでした。モックデータを使用します:", error);
    notifications = fallbackNotifications;
  }

  renderNotifications();
}

function renderNotifications() {
  notificationsContainer.innerHTML = "";

  const filtered = notifications.filter(n => {
    const statusMatch = selectedStatus === "all" || !n.read;
    const appMatch = selectedApp === "all" || n.app === selectedApp;
    const isConnected = apps.find(a => a.id === n.app)?.connected;
    return statusMatch && appMatch && isConnected;
  });

  if (filtered.length === 0) {
    notificationsContainer.innerHTML = `<div style="text-align:center; padding: 40px; color:#64748b; font-weight:600;">通知はありません</div>`;
    return;
  }

  const grouped = groupByDate(filtered);

  Object.keys(grouped).forEach(date => {
    const section = document.createElement("div");
    section.className = "date-section";

    const cardsHtml = grouped[date].map(n => {
      const app = apps.find(a => a.id === n.app);
      const displaySender = n.sender && n.sender !== n.subject ? n.sender : app.name;
      const displayMessage = (n.message && n.message.trim() !== '' && n.message !== n.subject) ? n.message : (n.subject || '');
      const displayTime = n.time || '';

      return `
        <div class="card ${n.read ? '' : 'unread'}" data-id="${n.id}">
          <div class="card-header">
            <div class="sender-info">
              <span class="badge" style="background:${app.color}">${app.name}</span>
              <span class="sender">${displaySender}</span>
            </div>
            <div class="card-actions">
                <span class="time">${displayTime}</span>
              <!-- Thay thế bánh răng thành dấu 3 chấm dọc mã hóa HTML -->
              <button class="menu-btn" data-id="${n.id}">&#8942;</button>
              <div class="dropdown-menu" id="menu-${n.id}">
                <div class="dropdown-item mark-action" data-id="${n.id}">${n.read ? '未読にする' : '既読にする'}</div>
                <div class="dropdown-item delete-notification" data-id="${n.id}">通知を削除</div>
              </div>
            </div>
          </div>
            <div class="message">${displayMessage}</div>
        </div>
      `;
    }).join("");

    section.innerHTML = `
      <div class="date-title">${date}</div>
      <div class="notification-list">${cardsHtml}</div>
    `;
    notificationsContainer.appendChild(section);
  });
}

function openDetailModal(notification) {
  const app = apps.find(a => a.id === notification.app);

  detailBadge.innerText = app.name;
  detailBadge.style.background = app.color;

  detailSender.innerText = notification.sender || "Unknown";
  detailSubject.innerText = notification.subject || "件名なし";
  detailMessage.innerText = notification.message || "";
  detailTime.innerText = notification.time || "";

  detailModal.classList.add("show");
}
/* =========================
   CENTRALIZED EVENT LISTENERS
========================= */

// Sự kiện cho bộ lọc Trạng thái (Tất cả / Chưa đọc)
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    selectedStatus = button.dataset.status;
    renderNotifications();
  });
});

// Sự kiện cho bộ lọc Ứng dụng (Ủy quyền hành vi từ container cha)
appFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".app-filter-btn");
  if (!btn) return;
  document.querySelectorAll(".app-filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedApp = btn.dataset.app;
  renderNotifications();
});

// Sự kiện kết nối/ngắt kết nối ứng dụng ở Sidebar
appList.addEventListener("click", (e) => {
  const btn = e.target.closest(".connect-btn");
  if (!btn) return;

  const appId = btn.dataset.app;
  const app = apps.find(a => a.id === appId);
  app.connected = !app.connected;

  if (selectedApp === appId && !app.connected) {
    selectedApp = "all";
  }

  renderApps();
  renderAppFilters();
  renderNotifications();
});

// Sự kiện tương tác trên thẻ thông báo (Card clicks, Menu, Actions)
notificationsContainer.addEventListener("click", (e) => {
  const menuBtn = e.target.closest(".menu-btn");
  const markAction = e.target.closest(".mark-action");
  const deleteBtn = e.target.closest(".delete-notification");
  const card = e.target.closest(".card");

  // 1. Click nút mở menu hành động cá nhân (dấu ba chấm dọc)
  if (menuBtn) {
    e.stopPropagation();
    const id = menuBtn.dataset.id;
    const targetMenu = document.getElementById(`menu-${id}`);

    document.querySelectorAll(".dropdown-menu").forEach(m => {
      if (m !== targetMenu) m.classList.remove("show");
    });
    targetMenu.classList.toggle("show");
    return;
  }

  // 2. Click Đánh dấu đọc / chưa đọc bên trong menu thả xuống
  if (markAction) {
    e.stopPropagation();
    const id = Number(markAction.dataset.id);
    const n = notifications.find(item => item.id === id);
    if (!n) return;

    const newRead = !n.read;
    // optimistic UI update
    n.read = newRead;
    renderNotifications();

    fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: newRead })
    })
      .then(async resp => {
        if (!resp.ok) {
          const body = await resp.json().catch(() => null);
          throw new Error(body?.error?.message || `Update failed (${resp.status})`);
        }
      })
      .catch(err => {
        console.error('Failed to update read status:', err);
        alert('ステータスの更新に失敗しました: ' + (err.message || err));
        // revert optimistic change
        const m = notifications.find(item => item.id === id);
        if (m) { m.read = !newRead; renderNotifications(); }
      })
      .finally(() => {
        // close dropdown menu after action
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
      });
    return;
  }

  // 3. Click Xóa thông báo -> Kích hoạt Custom Pop-up Modal công cụ xác nhận
  if (deleteBtn) {
    e.stopPropagation();
    notificationIdToDelete = Number(deleteBtn.dataset.id);

    // Đóng toàn bộ dropdown đang mở trước
    document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));

    // Hiển thị Custom Modal
    deleteModal.classList.add("show");
    return;
  }

  // 4. Click trực tiếp vào thân Card để chuyển trạng thái đã đọc
  if (card) {
    const id = Number(card.dataset.id);
    const n = notifications.find(item => item.id === id);


    openDetailModal(n);

    if (n && !n.read) {
      const prev = n.read;
      n.read = true; // optimistic
      renderNotifications();

      fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: true })
      })
        .then(async resp => {
          if (!resp.ok) {
            const body = await resp.json().catch(() => null);
            throw new Error(body?.error?.message || `Update failed (${resp.status})`);
          }
        })
        .catch(err => {
          console.error('Failed to mark as read:', err);
          alert('既読にできませんでした: ' + (err.message || err));
          // revert
          n.read = prev;
          renderNotifications();
        });
    }
  }
});

// Click ra ngoài vùng dropdown menu để tự động đóng hành động
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));
});

/* =========================
   CUSTOM MODAL EVENTS
========================= */

// Nhấn nút Hủy trong Modal
btnCancelDelete.addEventListener("click", () => {
  deleteModal.classList.remove("show");
  notificationIdToDelete = null;
});

// Nhấn nút Xác nhận xóa trong Modal
btnConfirmDelete.addEventListener("click", () => {
  if (notificationIdToDelete !== null) {
    const idToDelete = notificationIdToDelete;

    // Call backend API to delete the notification, then update UI
    fetch(`${API_BASE_URL}/notifications/${idToDelete}`, { method: 'DELETE' })
      .then(async resp => {
        if (!resp.ok) {
          const body = await resp.json().catch(() => null);
          throw new Error(body?.error?.message || `Delete failed (${resp.status})`);
        }

        // remove locally and refresh
        notifications = notifications.filter(item => item.id !== idToDelete);
        deleteModal.classList.remove("show");
        notificationIdToDelete = null;
        renderNotifications();
      })
      .catch(err => {
        console.error('Failed to delete notification:', err);
        alert('削除に失敗しました: ' + (err.message || err));
        // close modal and reset selection to avoid stuck state
        deleteModal.classList.remove("show");
        notificationIdToDelete = null;
      });
  }
});

// Nhấn ra ngoài rìa (vùng đen mờ) của modal cũng tự động Hủy đóng trang
deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    deleteModal.classList.remove("show");
    notificationIdToDelete = null;
  }
});

closeDetailModal.addEventListener("click", () => {
  detailModal.classList.remove("show");
});

detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) {
    detailModal.classList.remove("show");
  }
});
/* =========================
   INITIALIZATION
========================= */
renderApps();
renderAppFilters();
loadNotifications();