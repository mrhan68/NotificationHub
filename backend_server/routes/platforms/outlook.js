const { createMockPlatformRouter } = require('./mockPlatform');

module.exports = createMockPlatformRouter({
  platform: 'outlook',
  displayName: 'Outlook',
  samples: [
    {
      id: 'outlook-mock-1',
      from: '人事部',
      subject: 'Interview Schedule',
      bodyPreview: '今週の面接スケジュールが更新されました。ご確認ください。',
      receivedDateTime: '2026-06-02T10:00:00.000Z',
      isRead: true
    },
    {
      id: 'outlook-mock-2',
      from: 'Project Office',
      subject: 'Weekly Summary',
      bodyPreview: '週次サマリーがメールボックスに送信されました。',
      receivedDateTime: '2026-06-02T08:05:00.000Z',
      isRead: false
    },
    {
      id: 'outlook-mock-3',
      from: 'Security Team',
      subject: 'Account Verification',
      bodyPreview: 'セキュリティ設定を完了するためにアカウントを確認してください。',
      receivedDateTime: '2026-06-01T17:40:00.000Z',
      isRead: false
    }
  ]
});