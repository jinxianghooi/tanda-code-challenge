FROM node
USER root

WORKDIR /frontend
COPY . /frontend

ARG API_URL
ENV HOST_IP_ADDRESS $API_URL

RUN yarn
RUN yarn build