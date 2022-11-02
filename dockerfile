FROM node:18.10

LABEL RUN="podman run -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY -v $(pwd)/src:/app/src --rm -it electron-wrapper bash"

RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN chown -R node /app

USER node
RUN npm install
RUN npx electron-rebuild
# https://stackoverflow.com/questions/60164544/how-to-run-electron-app-inside-docker-image
# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
# USER root
# RUN chown root /node_modules/electron/dist/chrome-sandbox
# RUN chmod 4755 /node_modules/electron/dist/chrome-sandbox

# Electron doesn't like to run as root
USER node
CMD bash
