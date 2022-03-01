FROM ubuntu:20.04
RUN apt update \
    && apt install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh \
    && sh ./setup_14.sh \
    && apt install nodejs \
    && apt install netcat -yq
WORKDIR /var/www
COPY utils/wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
