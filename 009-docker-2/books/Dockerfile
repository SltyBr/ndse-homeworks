FROM node:20.10

WORKDIR /app
ARG NODE_ENV=production

COPY ./*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]