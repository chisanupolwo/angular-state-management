FROM nginx:1.25.1-alpine-slim
COPY dist/nx-angular-new/server /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8001