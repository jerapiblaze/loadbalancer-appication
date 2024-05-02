FROM node:21.5

# Telegraf config
RUN wget -O /tmp/telegraf.deb https://dl.influxdata.com/telegraf/releases/telegraf_1.20.2-1_amd64.deb 
RUN dpkg -i /tmp/telegraf.deb
RUN rm -f /etc/telegraf/telegraf.conf
RUN echo '\
[agent]\n\
    interval = "10s"\n\
    round_interval = true\n\
    metric_batch_size = 1000\n\
    metric_buffer_limit = 10000\n\
    collection_jitter = "0s"\n\
    flush_interval = "10s"\n\
    flush_jitter = "0s"\n\
    precision = ""\n\
    hostname = ""\n\
    omit_hostname = true\n\
    logtarget = "file"\n\
    logfile = "/tmp/telegraf.log"\n\
[[outputs.prometheus_client]]\n\
    listen = ":9126"\n\
    path = "/metrics"\n\
[[outputs.file]]\n\
    files = ["/tmp/telegraf_stats.txt"]\n\
    data_format = "wavefront"\n\
    rotation_max_size = "5MB"\n\
[[inputs.mem]]\n\
[[inputs.cpu]]\n\
[[inputs.net]]\n\
[[inputs.diskio]]\n\
' > /etc/telegraf/telegraf.conf
RUN rm -f /tmp/telegraf.deb
EXPOSE 8125/udp
EXPOSE 8092/udp
EXPOSE 8094/tcp
# RUN service telegraf restart

# Actual build
## Copy code (all files except items in .dockerignore)
WORKDIR /usr/server/loadbalancer-application
# COPY app ./app
# COPY server.js .
# COPY prep.js .
# COPY package.json .
# COPY package-lock.json .
COPY . .
## Install node modules
RUN npm install
## Config server using environment variables
ENV SERVER_PORT=8888
ENV SERVER_DEBUG=0
ENV DUMMYFILES_SMALL_PATH=/tmp/loadbalancer-application/dummy_files/small
ENV DUMMYFILES_SMALL_SIZE=1024
ENV DUMMYFILES_SMALL_COUNT=10000
ENV DUMMYFILES_LARGE_PATH=/tmp/loadbalancer-application/dummy_files/large
ENV DUMMYFILES_LARGE_SIZE=5242880
ENV DUMMYFILES_LARGE_COUNT=1000
## Expose ports to outsides
EXPOSE 8888/tcp
EXPOSE 8888/udp
## Start the server with telegraf
CMD service telegraf restart && npm run container