FROM node:18
WORKDIR /usr/src/app

COPY yarn.lock package.json ./
COPY patches ./patches
COPY packages/shared/package.json packages/shared/package.json
COPY packages/api/package.json packages/api/package.json
COPY packages/web/package.json packages/web/package.json
COPY packages/database/package.json packages/database/package.json

# Install all dependencies
RUN yarn install --frozen-lockfile

ENV NODE_ENV production
ENV PORT 8080

COPY . .

RUN yarn build

# Install again to remove devDependencies because NODE_ENV is set to production
RUN yarn install --frozen-lockfile

# TODO: Remove src files

RUN chmod +x ./entrypoint.sh

EXPOSE 8080
ENTRYPOINT [ "./entrypoint.sh" ]
