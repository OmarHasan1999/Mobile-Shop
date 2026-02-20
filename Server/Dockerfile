# use the node image as the base image
FROM node:20-alpine

# set the working directory
WORKDIR /app

# copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# install the dependencies
RUN npm install

# copy the rest of the application code to the working directory
COPY . .

# expose the port that the application will run on
EXPOSE 4242

# start the application
CMD ["npm", "run", "dev"]