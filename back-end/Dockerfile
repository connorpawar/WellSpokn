FROM alpine AS LangaugeToolDownloader
RUN apk --no-cache add curl
RUN curl https://languagetool.org/download/LanguageTool-4.8.zip --output /LanguageTool-4.8.zip
#Not sure how to make this extraction more grandular
RUN unzip /LanguageTool-4.8.zip

FROM node AS additionalPackages
RUN apt-get -qq update && apt-get install -y ffmpeg default-jre sox libsox-fmt-all 

FROM additionalPackages AS production-only-packages
COPY package*.json /
#TODO: Dependency Folder?
COPY --from=LangaugeToolDownloader /LanguageTool-4.8/ /languagetool/
COPY ./auth/authKey.json /authKey.json
ENV GOOGLE_APPLICATION_CREDENTIALS '/authKey.json'
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
EXPOSE 8080
CMD node backend.js