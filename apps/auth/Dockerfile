# Stage 1: Build for Staging
FROM node:18.15.0-alpine AS build-stage
WORKDIR /app
COPY package.json yarn.lock ./
COPY nest-cli.json ./
COPY tsconfig.build.json tsconfig.json ./
COPY .eslintrc.js ./
COPY .prettierrc ./
COPY ./apps/auth ./apps/auth
COPY ./libs ./libs

RUN yarn install
RUN yarn build:auth

# Stage 2: Build for Production
FROM node:18.15.0-alpine AS production-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=build-stage /app/dist ./dist
COPY ./apps/auth/start.sh ./
COPY ./databases/auth ./database
RUN chmod +x /app/start.sh

ENV NODE_ENV=production

CMD ["/app/start.sh"]