FROM node:13.12-alpine3.11 as builder

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.17-alpine

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder build /usr/share/nginx/html