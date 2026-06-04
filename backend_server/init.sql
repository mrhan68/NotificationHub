-- Create database
CREATE DATABASE IF NOT EXISTS notifyhub_db;

USE notifyhub_db;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    sender VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    INDEX idx_platform (platform),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Create platform_tokens table
CREATE TABLE IF NOT EXISTS platform_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    team_id VARCHAR(255) NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT NULL,
    scope TEXT NULL,
    expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_platform_team (platform, team_id),
    INDEX idx_platform_created (platform, created_at)
);

-- Insert sample data (Japanese)
INSERT INTO
    notifications (
        platform,
        sender,
        subject,
        message,
        is_read
    )
VALUES (
        'teams',
        '田中 太郎',
        'AI Vision Meeting',
        'AI Visionミーティングであなたへの言及がありました。',
        0
    ),
    (
        'slack',
        'Backend Team',
        'API Deployment',
        'notification-service APIがステージング環境へのデプロイに成功しました。',
        0
    ),
    (
        'outlook',
        '人事部',
        'Interview Schedule',
        '今週の面接スケジュールが更新されました。ご確認ください。',
        1
    ),
    (
        'zalo',
        '営業部',
        'Customer Update',
        '新規顧客リストがZaloモックシステムに同期されました。',
        0
    ),
    (
        'teams',
        '鈴木 花子',
        'Project Update',
        '倉庫管理ソフトウェアプロジェクトの進捗が更新されました。',
        0
    ),
    (
        'slack',
        'QA Team',
        'Test Results',
        'E2Eテスト結果が出ました。レビューをお願いします。',
        1
    ),
    (
        'discord',
        'DatDo',
        '#general',
        'みなさん、NotificationHubへのDiscordモック統合が完了しました！',
        0
    ),
    (
        'discord',
        'PhuongThao',
        '#projects',
        'タスクを期限内に完了させることを忘れないでください。',
        0
    ),
    (
        'discord',
        'Long',
        '#gaming',
        '今夜21時にゲームで息抜きしましょう！',
        1
    ),
    (
        'discord',
        'HR Bot',
        '#announcements',
        'お知らせ：明日15:00より会社のチームビルディングイベントがあります。',
        0
    );