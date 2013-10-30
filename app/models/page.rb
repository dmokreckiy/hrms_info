class Page < ActiveRecord::Base
  
  VALID_NAME_REGEX = /[a-zA-Z0-9+\'\"\.\,\:\;\-]/

  default_scope order: 'pages.created_at DESC'
  
  before_save do
    self.page_title.squish!
    self.description.squish!
  end
  
  attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id, :page_type, :display_top_menu, :display_bottom_menu, :published
  validates :page_title, presence: true, format: { with: VALID_NAME_REGEX }, length: { minimum: 3, maximum: 50 }
  validates :page_url, format: { with: VALID_NAME_REGEX }, presence: true
  validates :description, length: { maximum: 200 }, format: { with: VALID_NAME_REGEX }

end
