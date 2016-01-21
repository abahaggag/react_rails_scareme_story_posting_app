# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ghost = Category.create(name: "Ghost")
witch = Category.create(name: "Witch")
monstor = Category.create(name: "Monstor")
stalker = Category.create(name: "Stalker")
night = Category.create(name: "Night")
children = Category.create(name: "Children")

#user = User.create(name: 'Ahmed Bahaggag', email: 'bahajaj@hotmail.com', password: '123')

#30.times do
#  Story.create(body: 'Hello world', user_id: 1, category_id: rand(1..6))
#end