# Flow CRM

CRM-система для управления потоком сделок и клиентами, построенная на базе Nuxt 3 и Appwrite.

## ✨ Особенности

- Управление сделками (создание, просмотр, обновление, удаление)
- Управление клиентами
- Интуитивно понятный пользовательский интерфейс на базе Shadcn-Vue
- Быстрая разработка с Nuxt 4 (Vue 3, Composition API, `<script setup>`)
- Гибкая и масштабируемая архитектура с Appwrite как BaaS

## 🚀 Используемые технологии

- **Фреймворк:** Nuxt.js (Vue.js 3, Composition API, `<script setup>`)
- **Бэкенд:** Appwrite (BaaS для базы данных и авторизации)
- **Стилизация:** Tailwind CSS, Shadcn-Vue UI
- **Управление состоянием:** Pinia с персистентностью
- **Иконки:** Lucide-vue-next
- **Drag and Drop:** `@dnd-kit/vue`
- **Формы и валидация:** `vee-validate`, `@vee-validate/zod`, `zod`
- **Другое:** `@vueuse/core`, `@tanstack/vue-table`, `@formkit/auto-animate`

## 🛠 Установка

Предпочтительный менеджер пакетов: `pnpm`.

1.  **Клонировать репозиторий:**

    ```bash
    git clone https://github.com/ваше-имя-пользователя/flow-crm.git
    cd flow-crm
    ```

2.  **Установить зависимости:**
    ```bash
    pnpm install
    ```

## 💻 Команды для разработки

- **Запуск dev сервера:**

  ```bash
  pnpm dev
  ```

  Приложение будет доступно по адресу `http://localhost:3000`.

- **Сборка для продакшена:**

  ```bash
  pnpm build
  ```

- **Предварительный просмотр продакшн-сборки:**

  ```bash
  pnpm preview
  ```

- **Линтинг:**

  ```bash
  pnpm run lint:eslint
  ```

- **Линтинг и автоформатирование (исправление ошибок):**
  ```bash
  pnpm run lintfix
  ```

## 📂 Структура проекта

- `app/api/services`: Клиентские сервисы для взаимодействия с Appwrite API.
- `app/components`: Переиспользуемые Vue-компоненты (UI, board, auth, customers, sidebar).
- `app/composables`: Функции Composition API (хуки) для переиспользуемой логики и запросов данных.
- `app/constants`: Константы (ID коллекций Appwrite, статусы сделок).
- `app/data`: Статические данные (пункты меню, колонки доски).
- `app/layouts`: Макеты страниц Nuxt.
- `app/middleware`: Nuxt middleware (например, `auth.global.ts`).
- `app/pages`: Страницы приложения Nuxt.
- `app/plugins`: Nuxt плагины (для персистентности Pinia).
- `app/stores`: Pinia-хранилища для управления состоянием.
- `app/types`: Определение TypeScript-типов и интерфейсов.
- `app/utils`: Вспомогательные утилиты и функции.

---

© 2026 Flow CRM. Все права защищены.
