const db = require('./db');

// Создание пользователя
exports.handleUserAuth = (req, res) => {
  const { username, password } = req.body;
  
  // Сначала проверяем, существует ли пользователь
  db.query(
    'SELECT * FROM users WHERE Username = ?',
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      if (results.length > 0) {
        const user = results[0];

        console.log(`${user.Password} ${password}`)
        if (user.Password === password) {
          // Пароль совпадает - вход выполнен
          res.status(200).json({ message: 'Вход выполнен', userId: user.Id });
        } else {
          // Пароль не совпадает
          res.status(401).json({ message: 'Неверный пароль' });
        }
      } else {
        // Пользователя нет - создаем нового и выполняем вход
        db.query(
          'INSERT INTO users (Username, Password) VALUES (?, ?)',
          [username, password],
          (err, insertResults) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
              message: 'Пользователь создан и вход выполнен', 
              userId: insertResults.insertId 
            });
          }
        );
      }
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

