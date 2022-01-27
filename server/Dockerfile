# Build dev environment
FROM node:14 AS development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/
RUN yarn install
COPY . .  
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:dev" ]

# Building integration and production environment
FROM node:14 AS production
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/
RUN yarn install --production
COPY . .
RUN yarn build
ENV PORT 8080
EXPOSE 8080
CMD [ "yarn", "start:prod" ]
