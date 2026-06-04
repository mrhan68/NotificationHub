-- Insert Discord Mock Data (Japanese)
INSERT INTO public.notifications (source, external_id, title, message, sender, received_at, is_read)
VALUES
('discord', 'discord-mock-1', '#general', 'みなさん、NotificationHubへのDiscordモック統合が完了しました！', 'DatDo', NOW() - INTERVAL '5 minutes', false),
('discord', 'discord-mock-2', '#projects', 'タスクを期限内に完了させることを忘れないでください。', 'PhuongThao', NOW() - INTERVAL '2 hours', false),
('discord', 'discord-mock-3', '#gaming', '今夜21時にゲームで息抜きしましょう！', 'Long', NOW() - INTERVAL '1 day', true),
('discord', 'discord-mock-4', '#announcements', 'お知らせ：明日15:00より会社のチームビルディングイベントがあります。', 'HR Bot', NOW() - INTERVAL '3 days', false);
