const express = require('express');
const cors = require('cors'); // Импортируем CORS
const app = express();
const routes = require('./routes');

app.use(cors()); // Добавляем поддержку CORS
app.use(express.json());
app.use('/api', routes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
