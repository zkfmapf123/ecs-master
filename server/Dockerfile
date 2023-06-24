## Build Stage
FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

## Product Stage
FROM node:16-alpine 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]