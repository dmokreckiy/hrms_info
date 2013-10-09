class PageReport
  include Datagrid
  #
  # Scope
  #
  
  scope do
    Page
  end

  #
  # Filters
  #
  
  filter(:page_title, :string)
  #filter(:disabled, :eboolean)
  #filter(:registration_type, :enum, :select => User::REGISTRATION_TYPES.map {|r| [r.humanize, r]})
  #filter(:logins_count, :integer, :range => true, :default => proc { [User.minimum(:logins_count), User.maximum(:logins_count)]})
  #filter(:registered_at, :date, :range => true)
  #column_names_filter

  #
  # Columns
  #

  column(:id)
  column(:page_title)

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
