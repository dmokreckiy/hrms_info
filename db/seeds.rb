# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
100.times do 
  p = Page.new
  p.page_title = Faker::Name.first_name + " "  + Faker::Name.last_name
  p.page_url = "/page/#{rand(1000)}"
  p.keywords = "keywords"
  p.description = "descriprion"
  p.parent_page_id = 'None'
  p.page_type = 'None'
  p.save!
end