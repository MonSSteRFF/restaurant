FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 80
CMD ["npm", "run", "build"]
CMD ["npm", "run", "serve"]
