FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci

EXPOSE 4000

RUN echo "#!/bin/sh" > entrypoint.sh
RUN echo "npx prisma db push" >> entrypoint.sh
RUN echo "npm run build" >> entrypoint.sh
RUN echo "npm run start:prod" >> entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
