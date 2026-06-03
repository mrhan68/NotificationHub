-- Insert Discord Mock Data
INSERT INTO public.notifications (source, external_id, title, message, sender, received_at, is_read)
VALUES
('discord', 'discord-mock-1', '#general', 'Chào cả nhà, hệ thống NotificationHub đã tích hợp xong Discord mock rồi nhé!', 'DatDo', NOW() - INTERVAL '5 minutes', false),
('discord', 'discord-mock-2', '#projects', 'Mọi người nhớ hoàn thành task đúng hạn nha.', 'PhuongThao', NOW() - INTERVAL '2 hours', false),
('discord', 'discord-mock-3', '#gaming', 'Tối nay 9h làm trận game giải trí đi anh em ơi!', 'Long', NOW() - INTERVAL '1 day', true),
('discord', 'discord-mock-4', '#announcements', 'Thông báo: Ngày mai công ty có tiệc teambuilding lúc 15:00.', 'HR Bot', NOW() - INTERVAL '3 days', false);
