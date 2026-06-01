const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'outlook',
  displayName: 'Outlook',
  samples: [
    {
      id: 'outlook-mock-1',
      from: 'Phòng nhân sự',
      subject: 'Interview Schedule',
      bodyPreview: 'Lịch phỏng vấn tuần này đã được cập nhật. Vui lòng kiểm tra.',
      receivedDateTime: '2026-06-02T10:00:00.000Z',
      isRead: true
    },
    {
      id: 'outlook-mock-2',
      from: 'Project Office',
      subject: 'Weekly Summary',
      bodyPreview: 'Bản tổng kết tuần đã được gửi tới hộp thư của bạn.',
      receivedDateTime: '2026-06-02T08:05:00.000Z',
      isRead: false
    },
    {
      id: 'outlook-mock-3',
      from: 'Security Team',
      subject: 'Account Verification',
      bodyPreview: 'Vui lòng xác minh tài khoản để hoàn tất cấu hình bảo mật.',
      receivedDateTime: '2026-06-01T17:40:00.000Z',
      isRead: false
    }
  ]
});