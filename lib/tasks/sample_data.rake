namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
<<<<<<< HEAD
    Page.create!(page_title: "Example page",
                 page_url: "example url",
                 keywords: "keywords",
                 description: "description")
=======
    Page.create!(title: "Page 1",
                 body: " bla bla bla")
    15.times do |n|
      title  = Faker::Name.name
      body  = "bla bla"
      Page.create!(title: title,
                   body: body)
    end
>>>>>>> pagination
  end
end