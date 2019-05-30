# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


char1 = Character.create(name: "Star Ship", bio: "Intergalactic space cruiser", image: "./public/starwars.png")
char2 = Character.create(name: "Starcraft", bio: "Icy blue like your soul", image: "./public/starcraft.png")
char3 = Character.create(name: "Astronaut", bio: "The original space explorer", image: "./public/astronaut.png")
 

user1 = User.create(name: "Rebecca", character_id: char1.id)
user2 = User.create(name: "Ash", character_id: char3.id)
user3 = User.create(name: "Fran", character_id: char2.id)






