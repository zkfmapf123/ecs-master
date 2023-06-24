## Build Stage (800MB)
FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Production Stage (500MB)
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["npm", "start"]