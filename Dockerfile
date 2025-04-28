# Шаг 1: Сборка приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение (убедитесь, что скрипт "build" существует в package.json)
RUN npm run build

# Шаг 2: Запуск nginx
FROM nginx:alpine

# Копируем билд из стадии builder
COPY --from=builder /app/build /usr/share/nginx/html

# (Опционально) Кастомный конфиг nginx для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]