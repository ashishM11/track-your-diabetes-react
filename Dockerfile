#This command will get download the latest apline node image
FROM node:lts-alpine as tyd-builder

# Current working directory
WORKDIR /tyd-ui-prod

# This command will first copy package.json file into current working directory
COPY ./package.json /tyd-ui-prod

# This will install all the required npm libraries which is mentioned inside package.json
RUN npm install

# After node_modules is created inside working directory then will copy all the files from local to alpine node image
COPY . .

# After all the files are copied then we will run npm build command to get build files
RUN npm run build

#nginx run code
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=tyd-builder /tyd-ui-prod/build .

ENTRYPOINT [ "nginx","-g","daemon off;" ]