FROM node AS wellspokn-frontend-packages
COPY package*.json /
RUN npm install
RUN npm install -g serve

FROM wellspokn-frontend-packages
COPY build /build
EXPOSE 5000
CMD serve -p 5000 -s /build