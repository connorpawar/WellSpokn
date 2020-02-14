FROM node AS wellspokn-backend-packages
COPY package*.json /
RUN npm install --only=prod
RUN npm install pg

FROM wellspokn-backend-packages
COPY config/production.json /config/production.json
COPY backend.js /
ENV NODE_ENV production
EXPOSE 8080
CMD node backend.js