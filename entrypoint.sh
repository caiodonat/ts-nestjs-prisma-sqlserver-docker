#!/bin/bash

npx prisma generate

RUN npm run build

npx prisma db push

exec npm run start:dev