class Page < ActiveRecord::Base
	attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id,
									:page_type, :display_top_menu, :display_bottom_menu, :published							 
	validates :page_title, presence: true
	validates :page_url, presence: true
end
