---
name: vue-component
description: Use when creating or editing a Vue component in app/components. Enforces this project's conventions: Composition API with <script setup lang="ts">, defineProps/defineEmits, shadcn-vue Ui* components, vee-validate + zod for forms, and the import ordering from AGENTS.md. Triggers on "создай компонент", "добавь форму", "сделай компонент для ...", mentions of UiButton, UiInput, shadcn.
---

# Vue-компоненты

Строгие конвенции проекта. Соблюдай их при создании/правке компонентов.

## Каркас компонента

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { IUser } from '@/types'

interface Props {
  user: IUser
  isLoading?: boolean
}

const props = defineProps<Props>()

const $emit = defineEmits<{
  submit: [string]
  deleteUser: [id: string]
}>()

const displayName = computed(() => props.user.name || 'Anonymous')
</script>
```

## Обязательные правила

- Всегда `<script setup lang="ts">`, никаких Options API.
- Типы-интерфейсы `I`-префикс (например `IUser`, `IDealForm`) из `@/types`; типы-алиасы с суффиксом `Type`. `any` запрещён.
- Импорты в строгом порядке, разделены пустыми строками: Vue/Nuxt (`@/`) → сторонние (nanoid, vee-validate, zod) → компоненты → типы (`@/types`) → стили.
- UI-компоненты берём из shadcn-vue с префиксом `Ui`: `UiButton`, `UiInput`, `UiFormField`, `UiFormItem`, `UiFormControl`, `UiFormLabel`, `UiFormMessage`, `UiDialog`, `UiSelect` и т.д. Папки `app/components/ui/...`.
- Props/emits строго типизированы через `defineProps<Props>()` и `defineEmits<{...}>()`. Emits объявляем через `$emit` в `defineEmits`, затем используем.
- События на клик/сабмит — `@click="handle..."`, формы — через `onSubmit = handleSubmit(...)`.
- `defineProps`, `defineEmits`, `definePageMeta` импортировать не нужно (автоимпорт Nuxt).

## Формы (vee-validate + zod)

Паттерн из `app/components/customers/EditForm.vue`:

```ts
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(50),
    email: z.email().max(50)
  })
)

const { handleSubmit, isFieldDirty, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: { name: '', email: '' }
})

const onSubmit = handleSubmit((values) => {
  $emit('submit', values)
})
```

В шаблоне каждый контрол оборачивается: `UiFormField` (с `v-slot="{ componentField }"`) → `UiFormItem` → `UiFormControl` → `UiFormLabel` + `UiInput v-bind="componentField"` → `UiFormMessage`.

## Взаимодействие с данными

- Запросы — `useLazyAsyncData('ключ', () => $fetch('/api/...', { credentials: 'include' }))` в composable (`use<Name>sQuery.ts`).
- Мутации — composable-действия `use<Name>Actions.ts` с `$fetch` + `credentials: 'include'`. Смотри `app/composables/useDealActions.ts`.
- После мутации обновляй query (`await refresh()` / `useDealsQuery().refresh()`) и показывай уведомление через `useToast`.
- Пути до API — только относительные (`/api/deals`), не хардкодь Appwrite-коллекции на клиенте.
