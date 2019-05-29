# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


char1 = Character.create(name: "Mario", bio: "Whipped", image: "https://mario.nintendo.com/assets/img/home/intro/mario-pose2.png")
char2 = Character.create(name: "Luigi", bio: "Plumber", image: "https://www.smashbros.com/wiiu-3ds/sp/images/character/luigi/main.png")
char3 = Character.create(name: "Princess Peach", bio: "Spoilt richkid.", image: "https://aff5fa4925746bf9c161-fb36f18ca122a30f6899af8eef8fa39b.ssl.cf5.rackcdn.com/images/Masthead_Peach.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png")


user1 = User.create(name: "Rebecca", character_id: char1.id)
user2 = User.create(name: "Ash", character_id: char3.id)
user3 = User.create(name: "Fran", character_id: char2.id)






