FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3010
CMD ["node", "src/index.js"]
