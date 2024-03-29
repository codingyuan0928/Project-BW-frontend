FROM node:20.4.0
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g serve
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]