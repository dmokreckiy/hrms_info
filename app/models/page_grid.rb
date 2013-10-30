class PageGrid
  include Datagrid
  #
  # Scope
  #
  
  scope do
    Page.order("updated_at desc")
  end

  #
  # Filters
  #
  
  filter(:page_title, :string, header: "Search") do |value, scope|
    scope.where("page_title like '%#{value}%'")
    #oracle case insensitive search
    #scope.where("page_title LIKE INITCAP('%#{value}%')")
  end
  #filter(:disabled, :eboolean)
  #filter(:registration_type, :enum, :select => User::REGISTRATION_TYPES.map {|r| [r.humanize, r]})
  #filter(:logins_count, :integer, :range => true, :default => proc { [User.minimum(:logins_count), User.maximum(:logins_count)]})
  #filter(:registered_at, :date, :range => true)
  #column_names_filter

  #
  # Columns
  #

  column(:id, header: "Page ID" )
  column(:page_title, header: "Page Title")
  column(:published, header: "Published", order: false) do |published_record| 
# just yes and no
#    published_record.published ? "Yes" : "No"

# erb checkboxes
    published_record.published ? '<input type="checkbox" disabled="disabled" checked="checked">' : '<input type="checkbox" disabled="disabled">'

# haml checkboxes
#    published_record.published ? "%input{checked: "checked", disabled: "disabled", type: "checkbox"/" : "%input{disabled: "disabled", type: "checkbox"/"
  end

  #column(:registration_type) do |record|
   # record.registration_type.humanize
  #end
  #column(:logins_count)
  #column(:disabled) do
   # disabled? ? "Yes" : "No"
  #end
  column(:updated_at) do |record|
    record.updated_at.strftime("%d/%m/%y %l:%M %p")
  end
end