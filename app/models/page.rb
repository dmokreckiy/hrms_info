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

# чистка пробелов(в начале, в конце, несколько пробелов подряд в середине), переводов строки и табуляции
  before_save do
    self.page_title.squish!
    self.description.squish!
  end
  
  attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id, :page_type, :display_top_menu, :display_bottom_menu, :published
# валидации на наличие заголовка страницы, соответствии формату и требованиям по размеру (мин 3, макс 50)
  validates :page_title, presence: true, format: { with: VALID_NAME_REGEX }, length: { minimum: 3, maximum: 50 }
# валидации на наличие ссылки страницы, соответствии формату 
  validates :page_url, presence: true, format: { with: VALID_NAME_REGEX }
# валидации на длину описания и соответствующий формат  
  validates :description, length: { maximum: 200 }, format: { with: VALID_NAME_REGEX }
end
