FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
RUN chmod 755 /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]