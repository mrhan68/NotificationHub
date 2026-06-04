const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'zalo',
  displayName: 'Zalo',
  samples: [
    {
      id: 'zalo-mock-1',
      sender: '田中 太郎',
      senderName: '田中 太郎',
      subject: 'プロジェクトのリマインダー',
      message: 'Zaloモック版が通知受信フローのテストに対応しました。',
      timestamp: '2026-06-02T09:10:00.000Z',
      read: false
    },
    {
      id: 'zalo-mock-2',
      sender: '営業部',
      senderName: '営業部',
      subject: '顧客情報の更新',
      message: '新規顧客リストがシステムに同期されました。',
      timestamp: '2026-06-02T07:45:00.000Z',
      read: true
    },
    {
      id: 'zalo-mock-3',
      sender: '運用チーム',
      senderName: '運用チーム',
      subject: 'システムメンテナンス',
      message: '本日22:00よりシステムメンテナンスを実施します。',
      timestamp: '2026-06-01T20:00:00.000Z',
      read: false
    }
  ]
});