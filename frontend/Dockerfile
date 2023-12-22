FROM node:alpine AS builder

WORKDIR /app

COPY ./package.json ./
RUN yarn install

COPY . .

RUN find . -type f -exec sed -i 's#"http://localhost:5000#window.location.origin + ":5000#g' {} +
RUN yarn run build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/ /etc/ssl/private/

COPY --from=builder /app/dist /usr/share/nginx/html
