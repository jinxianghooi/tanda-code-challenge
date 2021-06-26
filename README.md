# Tanda Code Challenge
This is my take of the Adnat challenge which consists of a Ruby on Rails backend and a React front end. The implementation is containerised with Docker for easy deployment in all operating systems (also I accidentally used the Ruby on macOS system and sudo installed all the gems before I knew what I was doing and encountered a whole bunch of issues so Docker it is).

# Thought Process

## TLDR

## Setting Up the Dev Environment
Initially, the plan was to follow the quickstart guide of Compose and Rails on the Docker docs to setup the Rails skeleton code with a few alterations. However, due to unknown reasons (probably due to the missing Yarn packages), the Rails app did not boot as expected. Naturally, one would think that the alterations to the process was the culprit here so I recreated a new Rails apps while following the steps from the guide exactly, but without success. 

# Usage

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