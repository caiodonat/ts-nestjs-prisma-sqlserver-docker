#!/bin/bash

npx prisma generate

npm run build

npx prisma db push

exec npm run start:dev