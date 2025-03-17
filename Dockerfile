# Build stage
FROM node:23-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

# Production stage
FROM node:23-alpine as production-stage

WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
