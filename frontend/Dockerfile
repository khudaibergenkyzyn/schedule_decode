# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /frontend
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
# Start the app
# CMD [ "npx", "serve", "build" ]


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /frontend/build /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]