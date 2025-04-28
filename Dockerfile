# Stage 1 - Build
FROM node:18-alpine as builder

WORKDIR /app

# Устанавливаем системные зависимости для сборки (если нужны)
RUN apk add --no-cache build-base python3

COPY package*.json ./

ENV NODE_ENV=production

# Чистая установка зависимостей
RUN npm install --frozen-lockfile

COPY . .

# Запускаем сборку (убедитесь, что "build" есть в package.json!)
RUN npm run build --max_old_space_size=1024

# Stage 2 - Serve
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]