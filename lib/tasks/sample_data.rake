namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    Page.create!(page_title: "Example page",
                 page_url: "example url",
                 keywords: "keywords",
                 description: "description")
  end
end