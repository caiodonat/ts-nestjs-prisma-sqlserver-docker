#!/bin/bash

# npx prisma generate
npx prisma db push

exec npm run start:dev