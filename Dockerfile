FROM node:16.13.0 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:16.13.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]