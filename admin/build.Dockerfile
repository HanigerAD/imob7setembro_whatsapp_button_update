FROM node:16

RUN mkdir -p /home/utils
RUN chmod -R +x /home/utils

RUN mkdir -p /home/temp

WORKDIR /home/app

EXPOSE 3000

CMD [ "sh", "/home/utils/build.command.sh" ]