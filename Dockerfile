# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
# to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code to the working directory.
COPY . .

# Expose the port that your app will run on.
EXPOSE 3000

# Command to run the application.
CMD ["node", "server.js"]
