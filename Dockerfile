FROM node:22-alpine AS base

# builder
FROM base AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json .
RUN npm install

# Copy application files
COPY . .

RUN npm run build


# production
FROM base AS production
WORKDIR /app

COPY package.json package-lock.json .
RUN npm install --omit=dev

COPY --from=builder /app/dist dist
COPY . .

EXPOSE 80

CMD [ "node", "dist/index.js" ]