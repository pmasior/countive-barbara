FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]
RUN ["npx", "prisma", "migrate", "dev"]

CMD ["npm", "run", "dev"]
