# 🍽️ Tastebite

**Tastebite** — это веб-приложение, позволяющее пользователям создавать, просматривать, редактировать и делиться кулинарными рецептами. Проект состоит из фронтенда на Angular и бэкенда на Node.js с использованием Express и MongoDB.

---

## 📦 Технологии

- **Frontend**: [Angular](https://angular.io/) 
- **Backend**: [Node.js](https://nodejs.org/),  [Express](https://expressjs.com/) 
- **База данных**: [MongoDB](https://www.mongodb.com/)  + [Mongoose](https://mongoosejs.com/) 
- **Дополнительно**: 
  - JWT (JSON Web Tokens) для аутентификации
  - REST API
  - Валидация данных
  - Загрузка изображений и видео

---

## 🧰 Возможности

- Регистрация и вход пользователей
- Просмотр списка рецептов
- Поиск и фильтрация по категориям / ингредиентам
- Создание, редактирование и удаление собственных рецептов
- Загрузка фотографий к рецептам
- Добавление рецептов в "Избранное"
- Комментарии и оценки рецептов *(опционально)*

---

## 🚀 Установка и запуск

### Предварительные требования

- [Node.js](https://nodejs.org/en/download/)  (v14.x или выше)
- [npm](https://www.npmjs.com/) 
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)  *(можно использовать Atlas или локальную базу)*

---

### Шаг 1: Клонирование репозитория

```bash
git clone https://github.com/ваше-имя/recipe-sharing-app.git 
cd recipe-sharing-app
```
## 📁 Структура проекта
```
recipe-sharing-app/
├── server/
│   |── src/
|   |   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
│   └── index.js
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   └── angular.json
Angular CLI
│
└── README.md
```
## 🌐 API Endpoints
<table>
    <thead>
        <tr>
            <td>Метод</td>
            <td>Эндпоинт</td>
            <td>Описание</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/auth/signup</td>
            <td>Регистрация пользователя</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/auth/login</td>
            <td>Вход пользователя</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/recipes</td>
            <td>Получить все рецепты</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/recipes/:id</td>
            <td>Получить рецепт по ID</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/recipes</td>
            <td>Создать новый рецепт</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/api/recipes/:id</td>
            <td>Обновить рецепт</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/recipes/:id</td>
            <td>Удалить рецепт</td>
        </tr>
    </tbody>
</table>