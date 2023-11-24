FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 4000
CMD ["npx", "prisma", "generate"]
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]
