# FROM node:16-alpine3.11 as angular

# WORKDIR /app

# COPY . .
# RUN npm install
# RUN npm run build

# FROM httpd:alpine3.15

# WORKDIR /usr/local/apache2/htdocs
# COPY --from=angular /app/dist/my-app .    
# Pull the base image
FROM node:18.16.0-alpine

# Set the working directory
WORKDIR /usr/app

# Copy app dependencies to container
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy code from host to container
COPY . .

# Expose Port
EXPOSE 8000

# Deploy app for local development
CMD [ "npm","start" ]