const db = require('./db');

// Создание пользователя
exports.createUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    'INSERT INTO users (Username, Password) VALUES (?, ?)',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Пользователь создан', userId: results.insertId });
    }
  );
};

// Получение списка пользователей
exports.getUser = (req, res) => {
  const { username, password } = req.params;
  db.query(
    'SELECT * FROM users where username = ? and password = ? Limit 1',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

