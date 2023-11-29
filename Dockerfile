# Etap budowania aplikacji
FROM node:latest as build-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Etap produkcji
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]