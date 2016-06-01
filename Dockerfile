FROM node:argon
 
CMD ["npm", "start"]
 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
