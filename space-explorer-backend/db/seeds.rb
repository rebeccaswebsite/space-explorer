# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


char1 = Character.create(name: "Mario", bio: "Whipped")
char2 = Character.create(name: "Luigi", bio: "Plumber")
char3 = Character.create(name: "Princess Peach", bio: "Spoilt richkid.")


user1 = User.create(name: "Rebecca", character_id: char1.id)
user2 = User.create(name: "Ash", character_id: char3.id)
user3 = User.create(name: "Fran", character_id: char2.id)






