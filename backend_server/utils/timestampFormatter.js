/**
 * Timestamp Formatter - ユーザーフレンドリーな形式でタイムスタンプをフォーマット
 */

const japaneseMonths = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
];

function toValidDate(timestamp) {
  if (timestamp instanceof Date) {
    return Number.isNaN(timestamp.getTime()) ? null : timestamp;
  }

  if (timestamp === undefined || timestamp === null || timestamp === '') {
    return null;
  }

  const parsed = new Date(timestamp);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * タイムスタンプをフレンドリー形式でフォーマット: "5分前", "昨日 16:20"
 */
function formatTimeAgo(timestamp) {
  const date = toValidDate(timestamp);
  if (!date) {
    return 'たった今';
  }

  const now = new Date();
  const diffMs = now - date;
  if (diffMs <= 0) {
    return 'たった今';
  }
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'たった今';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }
  if (diffDays === 1) {
    const timeStr = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    return `昨日 ${timeStr}`;
  }
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  const day = date.getDate();
  const month = japaneseMonths[date.getMonth()];
  const time = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  return `${month}${day}日 ${time}`;
}

/**
 * タイムスタンプを日付形式でフォーマット: "今日", "昨日", "先週"
 */
function formatDate(timestamp) {
  const date = toValidDate(timestamp);
  if (!date) {
    return '今日';
  }

  const now = new Date();
  const diffMs = now - date;
  if (diffMs <= 0) {
    return '今日';
  }
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今日';
  }
  if (diffDays === 1) {
    return '昨日';
  }
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '先週' : `${weeks}週間前`;
  }

  const day = date.getDate();
  const month = japaneseMonths[date.getMonth()];
  return `${month}${day}日`;
}

/**
 * ISO形式でタイムスタンプをフォーマット
 */
function formatISO(timestamp) {
  const date = toValidDate(timestamp) || new Date();
  return date.toISOString();
}

/**
 * カスタム形式でタイムスタンプをフォーマット
 */
function formatCustom(timestamp, format = 'DD/MM/YYYY HH:mm') {
  const date = toValidDate(timestamp) || new Date();
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

module.exports = {
  formatTimeAgo,
  formatDate,
  formatISO,
  formatCustom
};
