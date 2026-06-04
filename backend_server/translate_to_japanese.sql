-- ============================================================
-- Translate existing notifications from Vietnamese to Japanese
-- Run this once against your Aiven (MySQL) database
-- ============================================================

-- Teams notifications
UPDATE notifications
SET sender  = '田中 太郎',
    message = 'AI Visionミーティングであなたへの言及がありました。'
WHERE sender  = 'Nguyễn Văn A'
  AND message = 'Bạn được nhắc đến trong cuộc họp AI Vision.';

UPDATE notifications
SET sender  = '鈴木 花子',
    message = '倉庫管理ソフトウェアプロジェクトの進捗が更新されました。'
WHERE sender  = 'Trần Thị B'
  AND message = 'Cập nhật tiến độ dự án phần mềm quản lý kho hàng';

-- Slack notifications
UPDATE notifications
SET message = 'notification-service APIがステージング環境へのデプロイに成功しました。'
WHERE sender  = 'Backend Team'
  AND message = 'API notification-service đã deploy thành công lên môi trường Staging.';

UPDATE notifications
SET message = 'E2Eテスト結果が出ました。レビューをお願いします。'
WHERE sender  = 'QA Team'
  AND message = 'Kết quả test e2e đã có sẵn. Vui lòng review.';

-- Outlook notifications
UPDATE notifications
SET sender  = '人事部',
    message = '今週の面接スケジュールが更新されました。ご確認ください。'
WHERE sender  = 'Phòng nhân sự'
  AND message = 'Lịch phỏng vấn tuần này đã được cập nhật. Vui lòng kiểm tra.';

UPDATE notifications
SET message = '週次サマリーがメールボックスに送信されました。'
WHERE message = 'Bản tổng kết tuần đã được gửi tới hộp thư của bạn.';

UPDATE notifications
SET message = 'セキュリティ設定を完了するためにアカウントを確認してください。'
WHERE message = 'Vui lòng xác minh tài khoản để hoàn tất cấu hình bảo mật.';

-- Zalo notifications
UPDATE notifications
SET sender  = '営業部',
    message = '新規顧客リストがZaloモックシステムに同期されました。'
WHERE sender  = 'Phòng Kinh Doanh'
  AND message = 'Danh sách khách hàng mới đã được đồng bộ vào hệ thống Zalo mock.';

UPDATE notifications
SET sender  = '田中 太郎',
    message = 'Zaloモック版が通知受信フローのテストに対応しました。'
WHERE message = 'Anh ơi, bản mock Zalo đã sẵn sàng để test luồng nhận thông báo.';

UPDATE notifications
SET sender  = '運用チーム',
    message = '本日22:00よりシステムメンテナンスを実施します。'
WHERE message = 'Thông báo bảo trì hệ thống sẽ diễn ra vào tối nay lúc 22:00.';

-- Discord notifications
UPDATE notifications
SET message = 'みなさん、NotificationHubへのDiscordモック統合が完了しました！'
WHERE sender  = 'DatDo'
  AND message = 'Chào cả nhà, hệ thống NotificationHub đã tích hợp xong Discord mock rồi nhé!';

UPDATE notifications
SET message = 'タスクを期限内に完了させることを忘れないでください。'
WHERE sender  = 'PhuongThao'
  AND message = 'Mọi người nhớ hoàn thành task đúng hạn nha.';

UPDATE notifications
SET message = '今夜21時にゲームで息抜きしましょう！'
WHERE sender  = 'Long'
  AND message = 'Tối nay 9h làm trận game giải trí đi anh em ơi!';

UPDATE notifications
SET message = 'お知らせ：明日15:00より会社のチームビルディングイベントがあります。'
WHERE sender  = 'HR Bot'
  AND message = 'Thông báo: Ngày mai công ty có tiệc teambuilding lúc 15:00.';

-- Verify result
SELECT id, platform, sender, message FROM notifications ORDER BY id;
