FROM node:10.13.0

WORKDIR src/app

# copy only package files to install the dependencies
COPY package*.json ./

RUN npm install

# copy the project code
COPY . .

# make the server port avaiblabe for the outer world
EXPOSE 3000

# start the application
CMD ["npm" , "start"]





