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
          res.status(200).json({ message: 'LoginIn', userId: user.Id });
        } else {
          // Пароль не совпадает
          console.log("uncorrectPassword");
          res.status(401).json({ message: 'UncorrectPassword' });
        }
      } else {
        // Пользователя нет - создаем нового и выполняем вход
        db.query(
          'INSERT INTO users (Username, Password) VALUES (?, ?)',
          [username, password],
          (err, insertResults) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
              message: 'Registration', 
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

exports.updateUserRole = (req, res) => {
  const { role, id } = req.body;
  if (!role || !id) {
    return res.status(400).json({ error: 'Роль и ID пользователя обязательны' });
  }

  console.log(`Updating user ${id} with role ${role}`);

  db.query(
    'UPDATE Users SET Role = ? WHERE Id = ?',
    [role, id],
    (err, results) => {
      if (err) {
        console.error('Ошибка базы данных:', err);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.status(200).json({ status: true, message: 'Роль успешно обновлена' });
    }
  );
};