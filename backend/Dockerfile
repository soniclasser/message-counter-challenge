FROM node:20-alpine AS dev 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=dev /app/package.json /app/package-lock.json ./
COPY --from=dev /app/node_modules ./node_modules
COPY --from=dev /app/dist ./dist

CMD ["node", "dist/api.js"]