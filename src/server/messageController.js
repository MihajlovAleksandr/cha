const db = require('./db');

// Создание сообщения
exports.createMessage = (req, res) => {
    console.log(req.body);
  const { userId, time, text } = req.body;
  db.query(
    'INSERT INTO messages (UserId, Text) VALUES (?,?)',
    [userId, text],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Сообщение создано', messageId: results.insertId });
    }
  );
};

// Получение сообщений пользователя
exports.getMessagesByUser = (req, res) => {
  const { userId } = req.params;
  db.query(
    'SELECT * FROM messages WHERE UserId = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getMessages = (req, res) => {
  db.query('SELECT m.text, m.time, m.userId, u.username from messages m JOIN users u ON m.UserId = u.Id ORDER BY m.time', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

