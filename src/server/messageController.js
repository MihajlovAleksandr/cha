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
  db.query('SELECT m.Id, m.text, m.time, m.userId, u.username, u.role from messages m JOIN users u ON m.UserId = u.Id ORDER BY m.time', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Обновление сообщения
exports.updateMessage = (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;
  
  db.query(
    'UPDATE messages SET Text = ? WHERE Id = ?',
    [text, messageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Сообщение не найдено' });
      }
      res.json({ message: 'Сообщение обновлено' });
    }
  );
};

// Удаление сообщения
exports.deleteMessage = (req, res) => {
  const { messageId } = req.params;
  
  db.query(
    'DELETE FROM messages WHERE Id = ?',
    [messageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Сообщение не найдено' });
      }
      res.json({ message: 'Сообщение удалено' });
    }
  );
};