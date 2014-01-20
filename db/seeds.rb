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
  if Page.last.nil?
  	p.page_url = "/pages/1"
  else
  	p.page_url = "/pages/#{Page.last.id+1}"
  end
  p.keywords = "keywords"
  p.description = "descriprion"
  p.content = nil
  p.parent_page_id = nil
  p.page_type = nil
  p.display_top_menu = false
  p.display_bottom_menu = false
  p.published = [true, false].sample
  p.save!
end