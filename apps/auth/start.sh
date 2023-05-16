npx prisma generate --schema /app/database/schema.prisma
npx prisma migrate deploy --schema /app/database/schema.prisma
yarn start:auth:prod