FROM ruby:3.0.1

RUN gem install rails bundler
RUN gem install rails
RUN apt-get update -qq && apt-get install -y \
    curl \
    build-essential \
    libpq-dev &&\
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

WORKDIR /app/backend

ENV PORT 3001

EXPOSE $PORT

ENTRYPOINT [ "/bin/bash" ]