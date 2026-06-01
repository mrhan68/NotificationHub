const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'zalo',
  displayName: 'Zalo',
  samples: [
    {
      id: 'zalo-mock-1',
      sender: 'Nguyen Van A',
      senderName: 'Nguyen Van A',
      subject: 'Nhắc việc dự án',
      message: 'Anh ơi, bản mock Zalo đã sẵn sàng để test luồng nhận thông báo.',
      timestamp: '2026-06-02T09:10:00.000Z',
      read: false
    },
    {
      id: 'zalo-mock-2',
      sender: 'Phòng Kinh Doanh',
      senderName: 'Phòng Kinh Doanh',
      subject: 'Cập nhật khách hàng',
      message: 'Danh sách khách hàng mới đã được đồng bộ vào hệ thống.',
      timestamp: '2026-06-02T07:45:00.000Z',
      read: true
    },
    {
      id: 'zalo-mock-3',
      sender: 'Đội vận hành',
      senderName: 'Đội vận hành',
      subject: 'Bảo trì hệ thống',
      message: 'Thông báo bảo trì hệ thống sẽ diễn ra vào tối nay lúc 22:00.',
      timestamp: '2026-06-01T20:00:00.000Z',
      read: false
    }
  ]
});