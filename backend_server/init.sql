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

-- Insert sample data
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
        'Nguyễn Văn A',
        'AI Vision Meeting',
        'Bạn được nhắc đến trong cuộc họp AI Vision.',
        0
    ),
    (
        'slack',
        'Backend Team',
        'API Deployment',
        'API notification-service đã deploy thành công lên môi trường Staging.',
        0
    ),
    (
        'outlook',
        'Phòng nhân sự',
        'Interview Schedule',
        'Lịch phỏng vấn tuần này đã được cập nhật. Vui lòng kiểm tra.',
        1
    ),
    (
        'zalo',
        'Phòng Kinh Doanh',
        'Customer Update',
        'Danh sách khách hàng mới đã được đồng bộ vào hệ thống Zalo mock.',
        0
    ),
    (
        'teams',
        'Trần Thị B',
        'Project Update',
        'Cập nhật tiến độ dự án phần mềm quản lý kho hàng',
        0
    ),
    (
        'slack',
        'QA Team',
        'Test Results',
        'Kết quả test e2e đã có sẵn. Vui lòng review.',
        1
    ),
    (
        'discord',
        'DatDo',
        '#general',
        'Chào cả nhà, hệ thống NotificationHub đã tích hợp xong Discord mock rồi nhé!',
        0
    ),
    (
        'discord',
        'PhuongThao',
        '#projects',
        'Mọi người nhớ hoàn thành task đúng hạn nha.',
        0
    ),
    (
        'discord',
        'Long',
        '#gaming',
        'Tối nay 9h làm trận game giải trí đi anh em ơi!',
        1
    ),
    (
        'discord',
        'HR Bot',
        '#announcements',
        'Thông báo: Ngày mai công ty có tiệc teambuilding lúc 15:00.',
        0
    );