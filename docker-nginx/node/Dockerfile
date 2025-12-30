FROM node:15

# Certificados SSL
COPY proxy*.cr[t] /usr/local/share/ca-certificates/
RUN update-ca-certificates 

# Redireciona os repositórios para o archive.debian.org (EOF do node 15)
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org/debian-security|archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    sed -i '/stretch-updates/d' /etc/apt/sources.list

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /usr/src/app
COPY package*.json ./
COPY index.js ./
RUN npm install

EXPOSE 3000
CMD dockerize -wait tcp://db:3306 -timeout 30s node index.js
