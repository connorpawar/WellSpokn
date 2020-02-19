FROM node AS production-only-packages
COPY package*.json /
RUN npm install --only=prod
RUN npm install pg
RUN apt-get update && apt-get install -y ffmpeg

FROM production-only-packages AS backend-compiler
COPY . /
RUN npm install --only=dev
RUN npm run build

FROM production-only-packages
COPY config/* /config/
COPY --from=backend-compiler backend.js /
ENV NODE_ENV production
RUN npm install pg
EXPOSE 8080
CMD node backend.js