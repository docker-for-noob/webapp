
# pull official base image
FROM nginx:latest

RUN apt-get update --fix-missing
RUN apt-get -y upgrade


RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

RUN npm -g install yarn

WORKDIR /tmp

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY . /tmp

RUN rm -rf node_modules yarn.lock
RUN yarn run install-project
RUN yarn run build

RUN mkdir /app

RUN mv src/infrastructure/views/react-ui/build/* /app

RUN chown www-data:www-data -R /app

CMD ["nginx", "-g", "daemon off;"]