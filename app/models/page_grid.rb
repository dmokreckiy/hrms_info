class PageGrid
  include Datagrid

  # Scope
  # DB select with default sorting
  scope do
    Page.order("updated_at desc")
  end

  # Filters
  # filters for different DB types (SQLite and Oracle)
  filter(:page_title, :string) do |value, scope|
    #scope.where("page_title like '%#{value.downcase}%'")
    #oracle case insensitive search
    scope.where("page_title LIKE INITCAP('%?%')", value)
  end

  # Columns
  # checkbox column
  column(:id, header: "", html: true, order: false) do |record|
    tag("input", type: 'checkbox', name: 'id', value: record.id)
  end

  # page title column
  column(:page_title, header: "Title")

  # published property column
  column(:published, header: "Published", order: false) do |published_record|
    published_record.published ? 'true' : 'false'
  end

  # last changed date and time column
  column(:updated_at, header: "Last changed") do |record|
    record.updated_at.strftime("%d/%m/%y %l:%M %p")
  end
end