FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn
COPY . /app
RUN yarn test
RUN yarn build
RUN npx mikro-orm schema:drop -r 
RUN npx mikro-orm schema:create -r
CMD ["node","dist/src"]
EXPOSE 3030