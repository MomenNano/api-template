FROM       node:16-alpine

RUN        apk add dumb-init

# Workdir
WORKDIR    /usr/src/app

# Copy and install production packages
COPY       dist/ dist/
COPY       package*.json ./
COPY       database/ database/

RUN        npm ci --only=production
RUN        npm install prisma -D
RUN        npx prisma generate

# Non root user
USER       node

# Running port is configured through PORT env variable
EXPOSE     8080

CMD        ["dumb-init", "node", "dist/index.js"]