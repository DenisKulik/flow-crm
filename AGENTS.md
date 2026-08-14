# Рекомендации для AI-агентов в проекте flow-crm

Этот документ содержит важную информацию для AI-агентов, работающих с данным репозиторием, для обеспечения эффективной и точной работы.

## 1. Краткое описание проекта

- **Фреймворк:** Nuxt.js (Vue.js 3, Composition API, `<script setup>`).
- **Бэкенд:** Appwrite (используется как BaaS для базы данных и авторизации) через Nitro-роуты на сервере (`server/api`).
- **Стилизация:** Tailwind CSS, Shadcn-Vue UI.
- **Управление состоянием:** Pinia с персистентностью.
- **Основная цель:** CRM-система для управления потоком сделок и клиентами.

## 2. Структура директорий

- `app/components`: Переиспользуемые Vue-компоненты.
  - `app/components/ui`: Компоненты UI из Shadcn-Vue.
  - `app/components/board`: Компоненты доски сделок.
  - `app/components/auth`: Компоненты для аутентификации.
  - `app/components/customers`: Компоненты для управления клиентами.
  - `app/components/sidebar`: Компоненты боковой панели навигации.
- `app/composables`: Функции Composition API (хуки) для переиспользуемой логики, запросов данных и действий.
- `app/constants`: Константы, используемые в приложении.
- `app/data`: Статические данные, такие как пункты меню или колонки доски.
- `app/layouts`: Макеты страниц Nuxt (`default.vue`, `empty.vue`).
- `app/lib`: Вспомогательные функции общего назначения (например, `utils.ts` с `cn`).
- `app/middleware`: Nuxt middleware (например, `auth.global.ts` для глобальной аутентификации).
- `app/pages`: Страницы приложения Nuxt, маршрутизация определяется структурой файлов.
- `app/plugins`: Nuxt плагины (например, `auth.server.ts`).
- `app/stores`: Pinia-хранилища для управления состоянием приложения (`auth.store.ts`, `app.store.ts`).
- `app/types`: Определение TypeScript-типов и интерфейсов.
- `app/utils`: Вспомогательные утилиты и функции.
- `server`: Директория серверных API-маршрутов Nitro и инфраструктуры Appwrite.
  - `server/api`: Nitro-роуты API (аутентификация, сделки, клиенты, комментарии, загрузка файлов).
  - `server/lib`: Серверные утилиты (`appwrite.ts` с клиентами Appwrite, `session-cookie.ts`).
  - `server/constants`: Серверные константы (`appwrite.ts` с ID коллекций, именем сессионной cookie).
  - `server/middleware`: Серверный middleware (например, `auth.ts`, подставляющий `event.context.user`).
  - `server/types`: Серверные TypeScript-типы.

## 3. Команды для разработки

- **Предпочтительный менеджер пакетов:** `pnpm`
- **Установка зависимостей:** `pnpm install`
- **Запуск dev сервера:** `pnpm dev` (доступен по `http://localhost:3000`)
- **Сборка для продакшена:** `pnpm build`
- **Генерация статического сайта:** `pnpm generate`
- **Подготовка Nuxt (postinstall):** `pnpm postinstall`
- **Предварительный просмотр продакшн-сборки:** `pnpm preview`
- **Линтинг:** `pnpm run lint:eslint`
- **Линтинг и автоформатирование:** `pnpm run lintfix` (запускает `eslint . --fix` и `prettier --write --list-different .`)
- **Тесты:** В проекте отсутствуют явные скрипты для запуска тестов. При необходимости их нужно будет создать.

## 4. Стиль кода и соглашения

- **TypeScript правила:**
  - Используется строгий режим.
  - Явное типизирование данных.
  - Импорты типов (`import type`) используются, когда это уместно.
  - **`any` запрещён.** Вместо него следует использовать `unknown` с последующим сужением типа (type narrowing).
- **Vue компоненты:**
  - Используется Composition API с `<script setup lang="ts">`.
  - Props и Emits определяются с помощью `defineProps` и `defineEmits`.
  - Для реактивного состояния используются `ref` и `computed`.
  - Компоненты UI из Shadcn-Vue используются для создания пользовательского интерфейса.
- **Именование:**
  - Компоненты: PascalCase (например, `DealCard.vue`, `UiButton.vue`).
  - Composables: `use` префикс (например, `useDealsQuery`, `useAuth`).
  - Pinia Stores: `use` префикс и суффикс `.store.ts` (например, `auth.store.ts`).
  - Переменные и функции: camelCase.
  - Интерфейсы: PascalCase с `I`-префиксом (например, `IUser`, `IDealForm`).
  - Типы-алиасы: PascalCase с суффиксом `Type` (например, `DealDBType`, `CustomerFormType`).
- **State management (Pinia):**
  - Стороны определяются с помощью `defineStore`.
  - Состояние хранится в `ref`, геттеры – в `computed`.
  - Действия (actions) определяются как обычные функции.
  - Используется `pinia-plugin-persistedstate` для сохранения состояния в локальном хранилище (`persist: true` в конфигурации store).
  - Часто используется функция `getDefaultState` для инициализации и сброса состояния хранилища.
- **API calls (сервер):**
  - Серверные роуты находятся в `server/api` и используют `defineEventHandler`.
  - Для работы с Appwrite применяются клиенты из `server/lib/appwrite.ts`: `createAdminClient()` (админ-клиент с ключом, возвращает `account`, `tablesDB`, `storage`) и `createSessionClient(event)` (для сессионных операций, например `account.get()`).
  - ID баз и коллекций берутся только из констант `server/constants/appwrite.ts` (`DB_ID`, `COLLECTION_DEALS`, `COLLECTION_CUSTOMERS`, `COLLECTION_COMMENTS`, `STORAGE_ID`, `SESSION_COOKIE`).
  - CRUD через Tables API Appwrite: `tablesDB.listRows`, `tablesDB.getRow`, `tablesDB.createRow`, `tablesDB.updateRow` с аргументами `{ databaseId, tableId, rowId?, data? }`.
  - Для уникальных ID используется `nanoid`.
  - Валидация входа: `readBody(event)`, `getRouterParam(event, 'id')`, ошибки через `throw createError({ statusCode, statusMessage })`.
  - Server middleware `server/middleware/auth.ts` подставляет `event.context.user`.
- **API calls (клиент):**
  - Клиент обращается к API через `$fetch('/api/...', { credentials: 'include' })` — без прямого вызова Appwrite SDK на клиенте.
  - Запросы данных — в composable с `useLazyAsyncData('ключ', () => $fetch(...), { transform })` (например, `useCustomersQuery`).
  - Мутации — в composable действий (`useDealActions`) с `$fetch` + `credentials: 'include'`.

## 5. Используемые библиотеки (основные)

- **UI фреймворк:** Nuxt.js
- **UI компоненты:** Shadcn-Vue, reka-ui, vaul-vue, lucide-vue-next (иконки).
- **Формы и валидация:** `vee-validate`, `@vee-validate/zod`, `zod`.
- **HTTP клиент:** `node-appwrite` (на сервере), клиент работает через `$fetch` к Nitro-роутам.
- **Styling:** Tailwind CSS, `@nuxtjs/tailwindcss`, `tailwindcss-animate`, `tailwind-merge`, `class-variance-authority`, `clsx`.
- **Управление состоянием:** Pinia, `@pinia/nuxt`, `pinia-plugin-persistedstate`.
- **Другие:**
  - `@dnd-kit/vue`: Для функциональности Drag and Drop.
  - `@formkit/auto-animate`: Для плавных анимаций.
  - `@vueuse/core`: Коллекция полезных Vue Composition Utilities.
  - `@tanstack/vue-table`: Для работы с таблицами.

## 6. Архитектурные паттерны

- **CRUD операции:** Реализованы через Nitro-роуты в `server/api/` с подключением к Appwrite по админ-клиенту (`createAdminClient`). Роуты индексируются структурой файлов: `index.get.ts`, `index.post.ts`, `[id].get.ts`, `[id].patch.ts`, `[id].delete.ts`.
- **Composables:** Используются для извлечения и переиспользования логики, связанной с данными (например, `useDealsQuery` для получения списка сделок) и действий (например, `useDealActions` для манипулирования сделками).
- **API роуты (сервер):** `server/api` — это основной слой взаимодействия с Appwrite на сервере. На клиенте нет прямых вызовов Appwrite SDK: всё идёт через `$fetch('/api/...', { credentials: 'include' })`.
- **Модульная структура:** Проект организован по функциональным областям (board, customers, auth) и типам файлов (components, composables, stores, types), что способствует модульности и чистоте кода.

## 7. Обработка ошибок

- **Appwrite операции:** Все операции взаимодействия с Appwrite API должны быть обернуты в `try/catch` блоки для перехвата и обработки возможных ошибок.
- **Уведомления для пользователя:** Для информирования пользователя об ошибках или успешных операциях следует использовать компоненты уведомлений (например, `useToast` или аналогичные из Shadcn-Vue).
- **Глобальная обработка ошибок:** Для необработанных ошибок Nuxt предоставляет возможность создания глобального файла `error.vue` в корне `app/`, который может быть использован для отображения страниц ошибок.

## 8. Порядок импортов

Импорты в файлах TypeScript и Vue должны следовать следующему порядку (сгруппированы и разделены пустой строкой):

1.  Vue/Nuxt-специфичные импорты (например, `ref`, `computed`, `defineProps`, `useRoute`, `@/`)
2.  Сторонние библиотеки (например, `nanoid`, `@dnd-kit/vue`)
3.  Компоненты (из `app/components/`)
4.  Типы и интерфейсы (из `app/types/`)
5.  Стили (если применимо)

## 9. Git & PR Conventions

- **Conventional Commits:** Используйте [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) для коммитов. Основные типы:
  - `feat`: Новая функциональность
  - `fix`: Исправление ошибки
  - `refactor`: Рефакторинг кода без изменения функциональности
  - `chore`: Рутинные задачи, изменения в сборке или зависимостях
- **Именование веток:**
  - `feature/название-фичи`: Для новых фич.
  - `bugfix/описание-бага`: Для исправлений ошибок.
  - `release/версия`: Для релизных веток.
- **Максимальный размер PR:** Старайтесь, чтобы PR не превышали 500 строк измененного кода для упрощения ревью.

## 10. Примеры кода

### Пример: TypeScript `any` vs `unknown`

```typescript
// Плохо: Использование any
function processDataBad(data: any) {
  console.log(data.someProperty) // Нет проверки типа
}

// Хорошо: Использование unknown с сужением типа
function processDataGood(data: unknown) {
  if (typeof data === 'object' && data !== null && 'someProperty' in data) {
    console.log((data as { someProperty: string }).someProperty) // Явная проверка и сужение типа
  } else {
    console.error('Data is not in expected format')
  }
}
```

### Пример: Правильный Vue компонент

```vue
<script setup lang="ts">
import type { IUser } from '@/types' // Имена интерфейсов с I-префиксом

interface Props {
  user: IUser
  isLoading?: boolean
}

const props = defineProps<Props>()

const $emit = defineEmits<{
  updateName: [name: string]
  deleteUser: [id: string]
}>()

const displayName = computed(() => props.user.name || 'Anonymous')

const handleUpdate = () => {
  $emit('updateName', 'Новое имя')
}
</script>

<template>
  <div class="user-card">
    <h2>{{ displayName }}</h2>
    <p v-if="isLoading">Загрузка...</p>
    <button @click="handleUpdate">Обновить имя</button>
  </div>
</template>
```

Примечание: `defineProps`, `defineEmits`, `definePageMeta`, `ref`, `computed` и `watch` не требуют явного импорта в Nuxt (благодаря автоматическому импорту).

## 11. Язык

- **Комментарии и ответы агента:** На русском языке.
- **Код и имена переменных:** На английском языке.
- **Текст пользовательского интерфейса:** На русском языке (для локализации или пользовательских строк).

## 12. Ограничения и особенности проекта

- **Appwrite как основной бэкенд:** Все операции с данными идут через Appwrite SDK на сервере (Nitro-роуты в `server/api`).
- **Серверные API:** `server/api` — канонический слой для всех обращений к Appwrite. Импорты из `server/` используют псевдоним `~~/` (например, `~~/server/lib/appwrite`, `~~/server/constants`), а не `@/`.
- **`lint-staged`:** Автоматическое форматирование и линтинг (`pnpm run lintfix`) запускается перед каждым коммитом для `*.{js,ts,vue}` файлов. Убедитесь, что ваш код соответствует стандартам форматирования и линтинга перед попыткой коммита.
- **Отсутствие встроенных тестов:** На момент анализа явных тестовых фреймворков или скриптов для их запуска не обнаружено. При добавлении функциональности рекомендуется создать соответствующие тесты.
