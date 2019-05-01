FROM node
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /usr/src/app
EXPOSE 3000
WORKDIR /usr/src/app
ADD package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app/
ENTRYPOINT ["npm", "start"]