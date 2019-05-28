FROM node:8
ARG JOB
ARG BIT_ENV_URL
RUN apt-get update
RUN mkdir /usr/src/app
RUN mkdir /env
RUN rm -rf node_modules
WORKDIR /usr/src/app
COPY / /usr/src/app/
RUN git clone $BIT_ENV_URL /env
RUN cp /env/$JOB/userapp/env /usr/src/app/.env

RUN npm install
# RUN VALID="$(npm run build | grep -o 'FAIL')"
# RUN if [[$VALID = 'FAIL']]; then\
#   RUN echo $VALID; RUN exit;\
#  fi  
# RUN npm run build || exit 1
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]