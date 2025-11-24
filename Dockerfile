FROM node:20 AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY src ./src
RUN npx tsc

FROM node:20-alpine AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]