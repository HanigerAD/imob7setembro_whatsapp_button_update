FROM node:14.17.5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev vim

ENV NODE_ROOT /usr/app/

RUN mkdir -p $NODE_ROOT

WORKDIR $NODE_ROOT

COPY . .

RUN npm install -g @angular/cli@12.2.18 @angular-devkit/build-angular@12.2.18 && npm install

EXPOSE 4200
EXPOSE 49153

CMD npm run start