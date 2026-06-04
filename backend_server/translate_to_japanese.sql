-- ============================================================
-- Translate remaining Vietnamese notifications by exact ID
-- ============================================================

-- id 1 | teams | Nguyễn Văn A
UPDATE notifications
SET sender  = '田中 太郎',
    message = 'AI Visionミーティングであなたへの言及がありました。'
WHERE id = 1;

-- id 2 | slack | Backend Team
UPDATE notifications
SET message = 'notification-service APIがステージング環境へのデプロイに成功しました。'
WHERE id = 2;

-- id 3 | outlook | Phòng nhân sự
UPDATE notifications
SET sender  = '人事部',
    message = '今週の面接スケジュールが更新されました。ご確認ください。'
WHERE id = 3;

-- id 4 | zalo | Phòng Kinh Doanh
UPDATE notifications
SET sender  = '営業部',
    message = '新規顧客リストがZaloモックシステムに同期されました。'
WHERE id = 4;

-- id 6 | slack | QA Team
UPDATE notifications
SET message = 'E2Eテスト結果が出ました。レビューをお願いします。'
WHERE id = 6;

-- id 7 | discord | DatDo
UPDATE notifications
SET message = 'みなさん、NotificationHubへのDiscordモック統合が完了しました！'
WHERE id = 7;

-- id 8 | discord | PhuongThao
UPDATE notifications
SET message = 'タスクを期限内に完了させることを忘れないでください。'
WHERE id = 8;

-- id 9 | discord | Long
UPDATE notifications
SET message = '今夜21時にゲームで息抜きしましょう！'
WHERE id = 9;

-- Verify: should return 0 rows if all done
SELECT id, platform, sender, LEFT(message, 80) AS message_preview
FROM notifications
ORDER BY platform, id;
