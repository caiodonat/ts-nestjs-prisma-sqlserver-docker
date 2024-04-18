#!/bin/bash

npx prisma generate --schema=./src/database/prisma/schema.prisma

npm run build

npx prisma db push

exec npm run start:dev