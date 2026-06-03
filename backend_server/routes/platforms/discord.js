const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'discord',
  displayName: 'Discord',
  samples: [
    {
      id: 'discord-mock-1',
      author: { username: 'DatDo' },
      guild: { name: '#general' },
      content: 'Chào cả nhà, hệ thống NotificationHub đã tích hợp xong Discord mock rồi nhé!',
      timestamp: '2026-06-03T14:00:00.000Z',
      read: false
    },
    {
      id: 'discord-mock-2',
      author: { username: 'PhuongThao' },
      guild: { name: '#projects' },
      content: 'Mọi người nhớ hoàn thành task đúng hạn nha.',
      timestamp: '2026-06-03T12:00:00.000Z',
      read: false
    },
    {
      id: 'discord-mock-3',
      author: { username: 'Long' },
      guild: { name: '#gaming' },
      content: 'Tối nay 9h làm trận game giải trí đi anh em ơi!',
      timestamp: '2026-06-02T14:00:00.000Z',
      read: true
    },
    {
      id: 'discord-mock-4',
      author: { username: 'HR Bot' },
      guild: { name: '#announcements' },
      content: 'Thông báo: Ngày mai công ty có tiệc teambuilding lúc 15:00.',
      timestamp: '2026-05-31T08:00:00.000Z',
      read: false
    }
  ]
});
