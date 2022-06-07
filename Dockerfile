FROM node:16.13-alpine3.11 as builder

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.22-alpine

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder build /usr/share/nginx/html