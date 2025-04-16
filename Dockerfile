# Build stage
FROM node:23-alpine AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:23-alpine AS production-stage

WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
