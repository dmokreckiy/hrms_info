namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    Page.create!(title: "Page 1",
                 body: " bla bla bla")
    96.times do |n|
      title  = Faker::Name.name
      body  = "bla bla"
      Page.create!(title: title,
                   body: body)
    end
  end
end