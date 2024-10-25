# FROM node:10.18.0

# # Create app directory
# WORKDIR /app
# ADD . /app/

# # global install & update
# # RUN npm i -g npm && npm i -g yarn

# # RUN rm yarn.lock
# # RUN yarn
# # RUN yarn build

# ENV HOST 0.0.0.0
# EXPOSE 3000

# # start command
# # CMD [ "yarn", "start" ]

FROM node:10.18.0

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "dev" ]
