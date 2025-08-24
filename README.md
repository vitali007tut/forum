# 💬 JSONPlaceholder Forum

A modern, responsive forum application built with **React + TypeScript**, powered by the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.

🔗 **Live Demo:** [link](https://vitali007tut.github.io/forum/)

---

## ✨ Features

- **👥 Users list:** Browse all users, view individual profiles.
- **📝 Posts feed:** View all posts or filter them by user.
- **🔍 Post details:** Open each post on its own page with comments.
- **💬 Comments:** Read comments and add new ones (client‑side only for demo purposes).
- **➕➖ Create/Delete posts:** Simulated via the API with immediate UI updates.
- **👍👎 Reactions:** Like/Dislike posts.
- **⭐ Favorites:** Save posts to favorites (persisted locally).
- **🙍 Personal profile:** View and edit your info (name, email, address, etc.).
- **🛡️ Admin panel:**  
  - Manage all users (edit info).  
  - Set post priority (pin/reorder in feed).

---

## 🛠️ Tech Stack

- **⚛️ React** 19 + **TypeScript**
- **🧭 React Router** v7
- **📦 Zustand** state management
- **🎨 Tailwind CSS** for styling
- **🌐 i18next** + **react‑i18next** for internationalization
- **⚡ Vite** for build and dev environment

---

## 🌍 API

Data is provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing and prototyping.

---

## 🚀 Installation

```bash
git clone https://github.com/vitali007tut/forum.git
cd forum
npm install
npm run dev
