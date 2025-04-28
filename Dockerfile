# Шаг 1: Сборка приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Шаг 2: Настройка сервера (nginx)
FROM nginx:alpine

# Копируем собранные файлы из builder в nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфиг nginx (если нужен кастомный)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]