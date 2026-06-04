const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'teams',
  displayName: 'Microsoft Teams',
  samples: [
    {
      id: 'teams-mock-1',
      from: { displayName: '田中 太郎' },
      subject: 'AI Vision Meeting',
      body: { content: 'AI Visionミーティングであなたへの言及がありました。' },
      createdDateTime: '2026-06-02T08:30:00.000Z',
      read: false
    },
    {
      id: 'teams-mock-2',
      from: { displayName: 'Product Owner' },
      subject: 'Sprint Review',
      body: { content: 'スプリントレビューの結果がプロジェクトチャンネルに更新されました。' },
      createdDateTime: '2026-06-02T06:15:00.000Z',
      read: true
    },
    {
      id: 'teams-mock-3',
      from: { displayName: 'HR Team' },
      subject: 'Onboarding Checklist',
      body: { content: '新入社員向けのオンボーディングチェックリストが用意されました。' },
      createdDateTime: '2026-06-01T14:20:00.000Z',
      read: false
    }
  ]
});