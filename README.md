# Adnat Code Challenge
This is my take of the Adnat challenge which consists of a Ruby on Rails backend and a React front end. The implementation is containerised with Docker for easy deployment in all operating systems (also I accidentally used the Ruby on macOS system and sudo installed all the gems before I knew what I was doing and encountered a whole bunch of issues so Docker it is).

# Usage
```bash
cd frontend
yarn
yarn start
```
(open another terminal)
```bash
cd ruby_environment
docker compose run --rm --service-ports ruby_dev
bundle update && bundle install
rails server -p $PORT -b 0.0.0.0
```

# Notes
Docker Ruby Environment command:
```bash
docker compose run --rm --service-ports ruby_dev
```

In the Docker container run:
```bash
bundle update && bundle install
rails server -p $PORT -b 0.0.0.0
```

# References