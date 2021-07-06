FROM ruby:3.0.1

RUN gem install rails bundler
RUN apt-get update -qq && apt-get install -y \
    curl \
    build-essential \
    libpq-dev &&\
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

WORKDIR /app/backend
COPY ./Gemfile /app/backend/Gemfile
COPY ./Gemfile.lock /app/backend/Gemfile.lock
RUN bundle update && bundle install
COPY . /app/backend

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
ENV PORT 3001
EXPOSE $PORT

# Configure the main process to run when running the image
# CMD ["rails", "server", "-p", $PORT, "-b", "0.0.0.0"]