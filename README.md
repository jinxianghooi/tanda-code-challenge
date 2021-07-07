# Adnat Code Challenge
This is my take on the Adnat challenge which consists of a Ruby on Rails backend and a React front end. The implementation is containerised with Docker for easy deployment in all operating systems (also because I accidentally used the Ruby on macOS system and sudo installed all the gems before I knew what I was doing and encountered a whole bunch of issues so Docker it is).

# Usage
## Git clone
```bash
git clone https://github.com/jinxianghooi/tanda-code-challenge.git && cd tanda-code-challenge
```

## Dev Enviroment Setup
```bash
cd ruby_environment
[ ! -d "./tmp/db" ] && mkdir -p tmp/db
docker compose run --rm --service-ports ruby_dev

# Run in docker container
bundle update && bundle install
rails server -p $PORT -b 0.0.0.0
```
If this is the first time running the dev environment, create the database:
```bash
# run commands in container after 'bundle update && bundle install'
rails db:create
rails db:migrate
rails db:seed
```
on a new terminal:
```bash
cd tanda-code-challenge/frontend
yarn
yarn start
```

## Production Build (sort of)
```bash
[ ! -d "./tmp/db" ] && mkdir -p tmp/db
docker compose up
```
If this is the first time running the build, create the database:
(on a new terminal)
```bash
cd tanda-code-challenge
docker compose run backend bundle exec rake db:create
docker compose run backend bundle exec rake db:migrate
docker compose run backend bundle exec rake db:seed
```

## Cleanup
```bash
docker compose down
docker image prune -a
```

# Notes
## Error when running `docker compose`
In the event of this error message:
```bash
Error response from daemon: invalid mount config for type "bind": bind source path does not exist: ....../tmp/db
```
it means that the tmp/db path does not exist. Simply run `mkdir -p tmp/db` to resolve this issue.
# References
