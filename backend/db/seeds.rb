# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

organisations = Organisation.create([
  {
    name: "Moe's Tavern",
    hourly_rate: 30
  },
  {
    name: "Sally's Sandwiches",
    hourly_rate: 40
  },
  {
    name: "Bob's Burgers",
    hourly_rate: 20
  }
])

users = User.create([
  {
    name: "John Smith",
    email_address: "johnsmith@gmail.com",
    password: "123456",
    organisation: organisations.first
  },
  {
    name: "John Appleseed",
    email_address: "johnappleseed@gmail.com",
    password: "abcdef",
    organisation: organisations.first
  },
  {
    name: "Jane Brown",
    email_address: "janebrown@gmail.com",
    password: "123abc",
    organisation: organisations[1]
  }
])

shifts = Shift.create([
  {
    start: DateTime.new(2021, 5, 10, 9, 0, 0, '+10:00'),
    finish: DateTime.new(2021, 5, 10, 21, 0, 0, '+10:00'),
    break_length: 60,
    user: users.first
  }
])