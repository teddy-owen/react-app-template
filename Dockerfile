# Serves static files on Port 80

FROM node:13
RUN mkdir /src
COPY ./ /src/
WORKDIR /src/
RUN yarn install
RUN yarn build
RUN yarn global add serve
CMD ["serve","-s","build","-l","80"]