import { useState } from 'react';
import './Styles/Role.css';

export default function RoleSelection() {
  const [role, setRole] = useState('');

  const handleRoleSubmit = (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("userId");
  console.log(userId);
  if (role.trim() && userId) {
    fetch('http://localhost:3001/api/updateUserRole', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, id: userId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Роль успешно обновлена:', data);
      if (data.status) {
        window.location.href = '/'; // Здесь укажите нужный URL для перенаправления
      }
    })
    .catch(error => console.error('Ошибка:', error));
  } else {
    console.error('Ошибка: userId отсутствует или роль не выбрана.');
  }
};


  return (
    <div className="role-container">
      <form onSubmit={handleRoleSubmit} className="role-form">
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled>Выберите роль</option>
          <option value="product">Product</option>
          <option value="user">Пользователь</option>
          <option value="guest">Гость</option>
        </select>
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}
