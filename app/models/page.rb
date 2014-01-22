# == Schema Information
#
# Table name: pages
#
#  id                  :integer          not null, primary key
#  page_title          :string(255)      page title
#  page_url            :string(255)      page url
#  keywords            :text             keywords for HTML metadata
#  description         :string(255)      description for HTML metadata
#  content             :text             page content
#  parent_page_id      :integer          parent page id (for view and reference)
#  page_type           :integer          page type id (view types)
#  display_top_menu    :boolean          display at top propetry
#  display_bottom_menu :boolean          display at bottom property
#  published           :boolean          publish property
#  created_at          :datetime         self explanatory
#  updated_at          :datetime         self explanatory
#  ancestry            :string(255)      Ancestry string for tree structure (Parent Page function)
#

class Page < ActiveRecord::Base
#  RegEx for page title and page url validation
  VALID_NAME_REGEX = /\A[a-zA-Z0-9+\'\"\.\,\:\;\-\s]*[a-zA-Z\s][a-zA-Z0-9+\'\"\.\,\:\;\-\s]*\z/
  VALID_URL_REGEX = /\A[a-zA-Z0-9+\'\"\.\,\:\;\-\/\s]*[a-zA-Z\s][a-zA-Z0-9+\'\"\.\,\:\;\-\/\s]*\z/
  attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id, :page_type, :display_top_menu, :display_bottom_menu, :published
# whitespace cleaning
  before_save do
    self.page_title.squish!
    self.description.squish! unless self.description.blank?
  end

# default value insertion for page title and page url (mandatory fields)
  before_validation do
    if Page.last.nil?
      @page_def_num = 1
    else
      @page_def_num = Page.last.id
    end
    self.page_title = "Page#{@page_def_num+1}" if self.page_title.blank?
    self.page_url = "/page#{@page_def_num+1}" if self.page_url.blank?
  end
  
# validations for page title
  validates :page_title, presence: true, format: { with: VALID_NAME_REGEX }, length: { minimum: 3, maximum: 50 }, uniqueness: true
# validations for page url
  validates :page_url, presence: true, format: { with: VALID_URL_REGEX }, uniqueness: true
# validations for description 
  validates :description, length: { maximum: 200 }
end
