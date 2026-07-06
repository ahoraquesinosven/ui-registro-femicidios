################################################################################
# Development environment
################################################################################
FROM node:24 AS development

ARG API_AQSNV_SERVER
ARG API_AQSNV_CLIENT_ID

ENV VITE_API_AQSNV_SERVER=${API_AQSNV_SERVER}
ENV VITE_API_AQSNV_CLIENT_ID=${API_AQSNV_CLIENT_ID}

# Ensure we have a valid working directory
RUN mkdir -p /app
WORKDIR /app

# Setup linter rules
COPY .eslintrc.cjs ./

# Setup project dependencies
COPY package*.json ./
RUN npm install

# Setup the rest of the application
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY index.html ./
COPY src ./src

# Build the application
RUN npm run build

################################################################################
# Production environment
################################################################################
FROM nginx:1.27.0-alpine-slim AS production

# Setup nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=development /app/dist /usr/share/nginx/html
