# Development environment
FROM node:14-alpine AS development 
WORKDIR /app
COPY package.json .
COPY yarn.lock .
ENV GENERATE_SOURCEMAP=false
RUN yarn install
COPY . .
RUN yarn global add react-scripts 
CMD ["yarn", "start"]

# Build production assets
FROM node:14 AS production-builder
WORKDIR /app
COPY . .
ENV GENERATE_SOURCEMAP=false
ARG API_SERVER
ENV REACT_APP_API=$API_SERVER
RUN yarn install --production
RUN yarn build

# Build production environment
FROM nginx:alpine AS production 
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=production-builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
