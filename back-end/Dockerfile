FROM node AS production-only-packages
COPY package*.json /
RUN npm install --only=prod
RUN npm install pg

FROM production-only-packages AS compiler
COPY . /
RUN npm install --only=dev
RUN npm run build

FROM production-only-packages
COPY config/* /config/
COPY --from=compiler backend.js /
ENV NODE_ENV production
RUN npm install pg
EXPOSE 8080
CMD node backend.js