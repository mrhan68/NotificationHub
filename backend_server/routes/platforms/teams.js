const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'teams',
  displayName: 'Microsoft Teams',
  samples: [
    {
      id: 'teams-mock-1',
      from: { displayName: 'Nguyễn Văn A' },
      subject: 'AI Vision Meeting',
      body: { content: 'Bạn được nhắc đến trong cuộc họp AI Vision.' },
      createdDateTime: '2026-06-02T08:30:00.000Z',
      read: false
    },
    {
      id: 'teams-mock-2',
      from: { displayName: 'Product Owner' },
      subject: 'Sprint Review',
      body: { content: 'Kết quả sprint review đã được cập nhật trong kênh dự án.' },
      createdDateTime: '2026-06-02T06:15:00.000Z',
      read: true
    },
    {
      id: 'teams-mock-3',
      from: { displayName: 'HR Team' },
      subject: 'Onboarding Checklist',
      body: { content: 'Danh sách onboarding cho nhân sự mới đã sẵn sàng.' },
      createdDateTime: '2026-06-01T14:20:00.000Z',
      read: false
    }
  ]
});