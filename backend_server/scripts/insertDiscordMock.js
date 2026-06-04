const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'notifyhub_db',
    port: parseInt(process.env.DB_PORT) || 3306
  });

  try {
    const sql = `
      INSERT INTO notifications (platform, sender, subject, message, created_at, is_read)
      VALUES
        ('discord', 'DatDo',     '#general',       'Chào cả nhà, hệ thống NotificationHub đã tích hợp xong Discord mock rồi nhé!', DATE_SUB(NOW(), INTERVAL 5 MINUTE), false),
        ('discord', 'PhuongThao','#projects',      'Mọi người nhớ hoàn thành task đúng hạn nha.',                                   DATE_SUB(NOW(), INTERVAL 2 HOUR),   false),
        ('discord', 'Long',      '#gaming',        'Tối nay 9h làm trận game giải trí đi anh em ơi!',                               DATE_SUB(NOW(), INTERVAL 1 DAY),    true),
        ('discord', 'HR Bot',    '#announcements', 'Thông báo: Ngày mai công ty có tiệc teambuilding lúc 15:00.',                    DATE_SUB(NOW(), INTERVAL 3 DAY),    false)
    `;

    const [result] = await pool.execute(sql);
    console.log('✅ Inserted Discord mock rows:', result.affectedRows);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log('⚠️  Discord mock data already exists (duplicate external_id), skipping.');
    } else {
      console.error('❌ Error:', err.message);
    }
  } finally {
    await pool.end();
  }
}

run();
