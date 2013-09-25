class Page < ActiveRecord::Base

validates :page_title, presence: true
validates :page_url, presence: true
validates :description, length: { maximum: 200 }

end
