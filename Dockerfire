FROM node:18-bullseye

RUN apt-get update && apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pixman-1-dev

WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "index.js"]
