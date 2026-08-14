---
name: api-route
description: Use when creating, modifying, or understanding a server API route (Nitro endpoint) in the server/api directory. Covers Appwrite CRUD patterns via createAdminClient, readBody, getRouterParam, and this project's actual conventions. Triggers on "add API route", "создать эндпоинт", "сделать CRUD для ...", mentions of server/api, tablesDB, createAdminClient, DB_ID, COLLECTION_ constants.
---

# API-роуты (server/api)

Фактическая архитектура проекта: бэкенд работает через **Nitro-роуты** в `server/api/`, подключённые к Appwrite по админ-клиенту. Клиентские сервисы (`app/api/services`) в коде отсутствуют — не создавай их для новых фич.

## Стандартный каркас обработчика

```ts
import { COLLECTION_DEALS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  // 1. параметры
  // 2. body
  // 3. validations -> throw createError
  // 4. работа с tablesDB
  // 5. return
})
```

Ключевые импорты и псевдоним `~~/`: путь идёт от корня проекта (`~~/server/...`), а **не** от пакета (`@/`).

## Паттерны операций

- **List** (`index.get.ts`):
  ```ts
  const { tablesDB } = createAdminClient()
  const response = await tablesDB.listRows({ databaseId: DB_ID, tableId: COLLECTION_DEALS })
  return { total: response.total, rows: response.rows }
  ```
- **Create** (`index.post.ts`): уникальный id через `nanoid()` (импорт из `nanoid`), затем `tablesDB.createRow({ ...rowId, data: body })`.
- **Read one / Update / Delete** (файл `[id].get.ts`, `[id].patch.ts`, `[id].delete.ts`): id извлекается через `getRouterParam(event, 'id')`.

## Обязательные правила

- Всегда проверяй входные данные и кидай `throw createError({ statusCode: 400, statusMessage: '...' })`.
- Обязательный фрагмент для операций с записью: `if (!body)` → 400.
- Имена коллекций — только через константы из `~~/server/constants` (например `COLLECTION_DEALS`, `DB_ID`). Не хардкодь строки.
- Держи `try/catch` — Appwrite-вызовы оборачиваются, ошибки пробрасываются как `createError`.
- Файлы роутов нумеруются структурой папок: `index.get.ts`, `index.post.ts`, `[id].patch.ts` и т.д.
