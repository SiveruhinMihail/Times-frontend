FROM node:20.12.2-alpine

ENV APP_ROOT /app
WORKDIR ${APP_ROOT}

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

RUN chown -R nuxt:nodejs ${APP_ROOT}
USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]