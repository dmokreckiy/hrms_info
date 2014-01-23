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
  has_ancestry
  
  VALID_NAME_REGEX = /\A[a-zA-Z0-9+\'\"\.\,\:\;\-\s]*[a-zA-Z\s][a-zA-Z0-9+\'\"\.\,\:\;\-\s]*\z/
  VALID_URL_REGEX = /\A[a-zA-Z0-9+\'\"\.\,\:\;\-\/\s]*[a-zA-Z\s][a-zA-Z0-9+\'\"\.\,\:\;\-\/\s]*\z/
  attr_accessible :page_title, :page_url, :keywords, :description, :content, :parent_page_id, :page_type, :display_top_menu, :display_bottom_menu, :published
# чистка пробелов(в начале, в конце, несколько пробелов подряд в середине), переводов строки и табуляции
  before_save do
    self.page_title.squish!
    self.description.squish! unless self.description.blank?
    self.display_top_menu = false if self.display_top_menu.nil?
    self.display_bottom_menu = false if self.display_bottom_menu.nil?
    self.published = false if self.published.nil?
    unless self.parent_page_id.blank?
      if self.id.nil?
          self.parent_id = Page.find(self.parent_page_id) 
      else
        self.parent_id = Page.find(self.parent_page_id) unless self.parent_page_id == Page.find(self.id).parent_page_id            
      end
    end
  end

# вставка значений по умолчанию в поля page_title и page_url пустые в форме
  before_validation do
    if Page.last.nil?
      @page_def_num = 1
    else
      @page_def_num = Page.last.id
    end
    self.page_title = "Page#{@page_def_num+1}" if self.page_title.blank?
    self.page_url = "/page-#{@page_def_num+1}" if self.page_url.blank?
  end
  
# валидации на наличие заголовка страницы, соответствии формату и требованиям по размеру (мин 3, макс 50)
  validates :page_title, presence: true, format: { with: VALID_NAME_REGEX }, length: { minimum: 3, maximum: 50 }, uniqueness: true
# валидации на наличие ссылки страницы, в соответствии формату 
  validates :page_url, presence: true, format: { with: VALID_URL_REGEX }, uniqueness: true
# валидации на длину описания 
  validates :description, length: { maximum: 200 }
end




