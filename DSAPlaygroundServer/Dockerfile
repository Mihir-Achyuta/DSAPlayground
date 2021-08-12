FROM node:14

# app directory
WORKDIR /app

# install app dependencies by taking the package.json and installing everything there
COPY package.json /app
RUN npm install

# bundles app source
COPY . /app

# exposes port 3001 and runs the server file
EXPOSE 3001 
CMD node server.js
