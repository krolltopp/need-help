#  Then, from your al-simulator repo directory, build the project, then build a docker container by:
#    1. "docker build -t simulator ."
#    2. "docker tag simulator containers.cisco.com/accountlinking/al-simulator:latest"
#    3. "docker push containers.cisco.com/accountlinking/al-simulator:latest"
#
#  The docker image will now be built and pushed to the container repo.

FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
