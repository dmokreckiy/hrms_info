# == Schema Information
#
# Table name: pages
#
#  id                  :integer          not null, primary key
#  page_title          :string(255)
#  page_url            :string(255)
#  keywords            :text
#  description         :string(255)
#  content             :text
#  parent_page_id      :integer
#  page_type           :integer
#  display_top_menu    :boolean
#  display_bottom_menu :boolean
#  published           :boolean
#  created_at          :datetime
#  updated_at          :datetime
#

class Page < ActiveRecord::Base
	VALID_NAME_REGEX = /[a-zA-Z0-9+\'\"\.\,\:\;\-]/

	before_save do
		self.page_title.squish!
		self.description.squish!
	end
	
  attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id, :page_type, :display_top_menu, :display_bottom_menu, :published
  validates :page_title, presence: true, format: { with: VALID_NAME_REGEX }, length: { minimum: 3, maximum: 50 }
  validates :page_url, format: { with: VALID_NAME_REGEX }, presence: true
  validates :description, length: { maximum: 200 }, format: { with: VALID_NAME_REGEX }

end
