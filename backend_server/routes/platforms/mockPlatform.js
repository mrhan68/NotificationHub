const express = require('express');

const { pool } = require('../../config');
const { normalizeNotification } = require('../../utils/dataNormalizer');

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clampCount(value, fallback, max = 20) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, max);
}

function shiftTimestamp(timestamp, offsetMinutes) {
  const baseDate = timestamp ? new Date(timestamp) : new Date();
  if (Number.isNaN(baseDate.getTime())) {
    return new Date(Date.now() - offsetMinutes * 60 * 1000);
  }

  return new Date(baseDate.getTime() - offsetMinutes * 60 * 1000);
}

function buildPlatformPayload(platform, sample, index) {
  const offsetMinutes = index * 17;
  const timestamp = shiftTimestamp(sample.timestamp || sample.createdDateTime || sample.receivedDateTime, offsetMinutes).toISOString();

  switch (platform) {
    case 'teams':
      return {
        id: sample.id || `${platform}-${index + 1}`,
        from: sample.from || { displayName: sample.sender || sample.senderName || 'Teams Mock' },
        subject: sample.subject || 'Teams Mock Conversation',
        body: sample.body || { content: sample.message || 'Teams mock message' },
        message: sample.message || sample.body?.content || 'Teams mock message',
        createdDateTime: timestamp,
        timestamp,
        read: sample.read ?? false
      };
    case 'zalo':
      return {
        id: sample.id || `${platform}-${index + 1}`,
        sender: sample.sender || sample.from || 'Zalo Mock',
        senderName: sample.senderName || sample.sender || 'Zalo Mock',
        subject: sample.subject || 'Zalo Conversation',
        message: sample.message || sample.text || sample.content || 'Zalo mock message',
        timestamp,
        read: sample.read ?? false
      };
    case 'outlook':
      return {
        id: sample.id || `${platform}-${index + 1}`,
        from: sample.from || sample.sender || 'Outlook Mock',
        subject: sample.subject || 'Outlook Mock Mail',
        bodyPreview: sample.bodyPreview || sample.message || sample.text || 'Outlook mock message',
        receivedDateTime: timestamp,
        timestamp,
        isRead: sample.isRead ?? sample.read ?? false
      };
    default:
      return deepClone(sample);
  }
}

function createStoredNotification(platform, basePayload, insertedId) {
  const payload = {
    ...basePayload,
    id: insertedId || basePayload.id,
    platform
  };

  return normalizeNotification(payload, platform);
}

function createMockPlatformRouter({ platform, displayName, samples }) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      success: true,
      platform,
      displayName,
      endpoints: {
        mock: `/api/platforms/${platform}/mock`
      }
    });
  });

  router.get('/mock', (req, res) => {
    const count = clampCount(req.query.count, samples.length, 20);

    const data = Array.from({ length: count }, (_, index) => {
      const sample = samples[index % samples.length];
      const payload = buildPlatformPayload(platform, sample, index);
      return normalizeNotification(payload, platform);
    });

    res.json({
      success: true,
      platform,
      displayName,
      count: data.length,
      data
    });
  });

  router.post('/mock', async (req, res) => {
    const incoming = req.body?.data || req.body?.notification || req.body || {};
    const payload = buildPlatformPayload(platform, incoming, 0);
    const normalized = normalizeNotification(payload, platform);
    const createdAt = normalized.timestamp instanceof Date && !Number.isNaN(normalized.timestamp.getTime())
      ? normalized.timestamp
      : new Date();

    try {
      const [result] = await pool.query(
        'INSERT INTO notifications (platform, sender, subject, message, created_at, is_read) VALUES (?, ?, ?, ?, ?, ?)',
        [
          normalized.platform,
          normalized.sender,
          normalized.subject || null,
          normalized.message,
          createdAt,
          Boolean(normalized.read)
        ]
      );

      const stored = createStoredNotification(platform, payload, result.insertId);
      return res.status(201).json({
        success: true,
        platform,
        displayName,
        message: `${displayName} mock notification stored successfully`,
        data: stored
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        platform,
        displayName,
        message: `${displayName} mock notification generated in-memory`,
        storage: 'memory',
        data: normalized
      });
    }
  });

  return router;
}

module.exports = {
  createMockPlatformRouter,
  buildPlatformPayload
};