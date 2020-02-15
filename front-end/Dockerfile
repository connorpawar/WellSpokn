FROM node AS frontend-compiler
COPY . /
RUN npm install
RUN npm run build

FROM frontend-compiler
RUN npm install -g serve
EXPOSE 5000
COPY --from=frontend-compiler /build /
CMD serve -p 5000 -s /build