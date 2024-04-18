#!/bin/bash

npx prisma generate --schema=./src/database/prisma/schema.prisma

npm run build

# # if $some_parameter run `npx prisma migrate reset`
# npx prisma migrate deploy

npx prisma migrate reset

exec npm run start:dev