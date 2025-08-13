FROM node:20.5.1-alpine as builder

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25-alpine

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder build /usr/share/nginx/html