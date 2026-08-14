---
name: conventional-commit
description: Use when committing changes or preparing a PR in this repo. Enforces Conventional Commits, branch naming, and the git flow defined in AGENTS.md. Triggers on "сделай коммит", "закоммить", "создай PR", "git commit", "ветка", "commit message".
---

# Conventional Commits и git-процесс

Перед любым коммитом: проверь `git status`, `git diff` и `git log --oneline -10`. Стейджи только намеренные файлы, никогда секреты.

## Формат коммита

```
<type>(<scope>): <subject>
```

Типы (Conventional Commits):
- `feat` — новая функциональность
- `fix` — исправление ошибки
- `refactor` — рефакторинг без изменения функциональности
- `chore` — рутинные задачи, сборка, зависимости

Примеры:
- `feat(board): add drag-n-drop reordering of deals`
- `fix(api): validate deal status before update`
- `refactor(auth): extract session cookie helper`

## Ветки

- `feature/<название-фичи>`
- `bugfix/<описание-бага>`
- `release/<версия>`

## PR

- Меньше 500 строк изменённого кода.
- Один PR = одна логическая единица работы.

## Автоформатирование

Перед коммитом `lint-staged` запускает `pnpm run lintfix` для `*.{js,ts,vue}`. Если коммит упал из-за линта — почини и сделай новый коммит, не амендай неудавшийся.

## Запрещено

- Коммитить без явной просьбы пользователя.
- `git add .` вслепую — только осознанные файлы.
- Пустые коммиты, force-push, правка чужого git config.