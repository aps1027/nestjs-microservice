# For Docker
## Prerequisites
1) install Docker

## Production
1) comment out env variables in .env for local env
1) run if don't want to setup mysql on local
    ```
    docker compose -f production-docker-compose.yml up --build
    ```
1) access API Docs
    ```
    http://localhost:8000/api
    ```
## Development
1) comment out env variables in .env for local env
1) run if don't want to setup mysql on local
    ```
    docker compose up --build
    ```
1) access API Docs
    ```
    http://localhost:8000/api
    ```

# For Local
## Prerequisites
1) install NodeJS (v18.15.0)
2) install MySQL (v5.7)

## Development
1) comment out env variables in .env for docker env
1) run if don't want to setup mysql on local
    ```
    docker compose -f local-docker-compose.yml up
    ```
1) run to install node_modules
    ```
    yarn
    ```
1) run for API Gateway
    ```
    yarn start:api-gateway:dev
    ```
1) run for Auth MS
    ```
    npx prisma generate --schema databases/auth/schema.prisma
    npx prisma migrate deploy --schema databases/auth/schema.prisma
    yarn start:auth:dev auth
    ```
1) access API Docs
    ```
    http://localhost:8000/api
    ```