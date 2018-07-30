ROM node:8
RUN apt-get update

RUN mkdir /usr/src/app
RUN rm -rf node_modules
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install
RUN npm run build-prod
RUN npm install pm2@latest -g

EXPOSE 3000
CMD ["pm2-runtime", "start", "process.yml"]