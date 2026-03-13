FROM node:20.11-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev \
  && npm cache clean --force

COPY . .

USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/server.js"]