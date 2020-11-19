FROM node:14

WORKDIR /app/APower/user

COPY *.json ./

RUN npm install

COPY ./src ./src

EXPOSE 3008

ENTRYPOINT ["npm", "start"]