FROM node:20.10-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]