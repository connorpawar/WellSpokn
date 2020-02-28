FROM node AS has_ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

FROM has_ffmpeg AS production-only-packages
COPY package*.json /
RUN npm install --only=prod
RUN npm install pg

FROM production-only-packages AS backend-compiler
COPY ./src /src
COPY ./config /config
COPY *.js* /
RUN npm install --only=dev
RUN npm run unit-test
RUN npm run integration-test
RUN npm run build

FROM production-only-packages
COPY config/production.json /config/production.json
COPY --from=backend-compiler backend.js /
ENV NODE_ENV production
RUN npm install pg
EXPOSE 8080
CMD node backend.js