-- ============================================================
-- Translate ALL remaining Vietnamese notifications to Japanese
-- Uses broader matching (platform + sender, no exact message match)
-- Safe to run multiple times (already-translated rows won't match)
-- ============================================================

-- -------------------------------------------------------
-- TEAMS
-- -------------------------------------------------------
UPDATE notifications
SET sender  = '田中 太郎',
    message = 'AI Visionミーティングであなたへの言及がありました。'
WHERE platform = 'teams'
  AND (sender REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
    OR message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]')
  AND (sender LIKE '%Nguy%' OR sender LIKE '%V_n%' OR message LIKE '%AI Vision%' OR message LIKE '%nh_c%');

UPDATE notifications
SET sender  = '鈴木 花子',
    message = '倉庫管理ソフトウェアプロジェクトの進捗が更新されました。'
WHERE platform = 'teams'
  AND (sender REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
    OR message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]')
  AND (sender LIKE '%Tr_n%' OR message LIKE '%kho%' OR message LIKE '%ti%n%');

UPDATE notifications
SET message = 'スプリントレビューの結果がプロジェクトチャンネルに更新されました。'
WHERE platform = 'teams'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND message LIKE '%sprint%';

UPDATE notifications
SET message = '新入社員向けのオンボーディングチェックリストが用意されました。'
WHERE platform = 'teams'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND message LIKE '%onboard%';

-- -------------------------------------------------------
-- SLACK
-- -------------------------------------------------------
UPDATE notifications
SET message = 'notification-service APIがステージング環境へのデプロイに成功しました。'
WHERE platform = 'slack'
  AND sender = 'Backend Team'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

UPDATE notifications
SET message = 'E2Eテスト結果が出ました。レビューをお願いします。'
WHERE platform = 'slack'
  AND sender = 'QA Team'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

-- -------------------------------------------------------
-- OUTLOOK
-- -------------------------------------------------------
UPDATE notifications
SET sender  = '人事部',
    message = '今週の面接スケジュールが更新されました。ご確認ください。'
WHERE platform = 'outlook'
  AND (sender REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
    OR message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]')
  AND (message LIKE '%ph%ng v%n%' OR message LIKE '%l%ch%');

UPDATE notifications
SET message = '週次サマリーがメールボックスに送信されました。'
WHERE platform = 'outlook'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND message LIKE '%t%ng k%t%';

UPDATE notifications
SET message = 'セキュリティ設定を完了するためにアカウントを確認してください。'
WHERE platform = 'outlook'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND (message LIKE '%x%c minh%' OR message LIKE '%b%o m%t%');

-- -------------------------------------------------------
-- ZALO
-- -------------------------------------------------------
UPDATE notifications
SET sender  = '営業部',
    message = '新規顧客リストがZaloモックシステムに同期されました。'
WHERE platform = 'zalo'
  AND (sender REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
    OR message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]')
  AND message LIKE '%kh%ch h%ng%';

UPDATE notifications
SET sender  = '田中 太郎',
    message = 'Zaloモック版が通知受信フローのテストに対応しました。'
WHERE platform = 'zalo'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND message LIKE '%mock%';

UPDATE notifications
SET sender  = '運用チーム',
    message = '本日22:00よりシステムメンテナンスを実施します。'
WHERE platform = 'zalo'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
  AND message LIKE '%b%o tr%';

-- -------------------------------------------------------
-- DISCORD
-- -------------------------------------------------------
UPDATE notifications
SET message = 'みなさん、NotificationHubへのDiscordモック統合が完了しました！'
WHERE platform = 'discord'
  AND sender = 'DatDo'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

UPDATE notifications
SET message = 'タスクを期限内に完了させることを忘れないでください。'
WHERE platform = 'discord'
  AND sender = 'PhuongThao'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

UPDATE notifications
SET message = '今夜21時にゲームで息抜きしましょう！'
WHERE platform = 'discord'
  AND sender = 'Long'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

UPDATE notifications
SET message = 'お知らせ：明日15:00より会社のチームビルディングイベントがあります。'
WHERE platform = 'discord'
  AND sender = 'HR Bot'
  AND message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]';

-- -------------------------------------------------------
-- CATCH-ALL: any remaining rows still in Vietnamese
-- Shows you what is left untranslated (review manually)
-- -------------------------------------------------------
SELECT id, platform, sender, LEFT(message, 80) AS message_preview
FROM notifications
WHERE sender  REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
   OR message REGEXP '[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'
ORDER BY platform, id;
