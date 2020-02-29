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
COPY ./auth /auth
RUN npm install --only=dev
RUN npm run unit-test
ENV GOOGLE_APPLICATION_CREDENTIALS /auth/authKey.json
RUN npm run integration-test
RUN npm run build

FROM production-only-packages
COPY config/production.json /config/production.json
COPY --from=backend-compiler backend.js /
ENV NODE_ENV production
EXPOSE 8080
CMD node backend.js