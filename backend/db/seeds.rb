# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

organisations = Organisation.create([
  {
    name: "Bob's Burgers",
    hourly_rate: 20
  },
  {
    name: "Moe's Tavern",
    hourly_rate: 30
  },
  {
    name: "Sally's Sandwiches",
    hourly_rate: 40
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
    organisation: organisations[1]
  },
  {
    name: "Jane Brown",
    email_address: "janebrown@gmail.com",
    password: "123abc",
    organisation: organisations.first
  },
  {
    name: "Ellen Jones",
    email_address: "ellenjones@gmail.com",
    password: "123abc",
    organisation: organisations.first
  },
  {
    name: "Oliver Smith",
    email_address: "oliversmith@gmail.com",
    password: "567def",
    organisation: nil
  }
])

shifts = Shift.create([
  {
    start: DateTime.new(2019, 2, 7, 10, 15, 0, '+10:00'),
    finish: DateTime.new(2019, 2, 7, 13, 30, 0, '+10:00'),
    break_length: 0,
    user: users[2], 
    organisation: organisations.first
  }, 
  {
    start: DateTime.new(2019, 2, 5, 9, 0, 0, '+10:00'),
    finish: DateTime.new(2019, 2, 5, 13, 00, 0, '+10:00'),
    break_length: 30,
    user: users.first, 
    organisation: organisations.first
  }, 
  {
    start: DateTime.new(2019, 1, 31, 11, 0, 0, '+10:00'),
    finish: DateTime.new(2019, 1, 31, 23, 00, 0, '+10:00'),
    break_length: 60,
    user: users[3], 
    organisation: organisations.first
  }
])