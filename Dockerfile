FROM node:10.17 as base
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.17-alpine
COPY --from=base /usr/src/app/build /usr/share/nginx/html
# COPY --from=builder /usr/src/app/data /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]