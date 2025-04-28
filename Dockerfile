# Stage 1 - Build
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build --max_old_space_size=1024

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]