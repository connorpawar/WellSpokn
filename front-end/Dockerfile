FROM node AS frontend-packages
COPY package*.json ./
RUN npm install

FROM frontend-packages as frontend-builder
COPY . /
RUN npm run build

FROM node
COPY --from=frontend-builder build /build
RUN npm install -g serve
EXPOSE 5000
CMD serve -p 5000 -s /build
