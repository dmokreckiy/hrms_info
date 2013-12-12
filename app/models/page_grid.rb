class PageGrid
  include Datagrid
  
  # Scope

  scope do
    Page.order("updated_at desc")
  end

  # Filters
  
  filter(:page_title, :string) do |value, scope|
    scope.where("page_title like '%#{value}%'")
    #oracle case insensitive search
    #scope.where("page_title LIKE INITCAP('%?%')", value)
  end

  # Columns

  column(:id, header: "", html: true, order: false) do |record|
    tag("input", type: 'checkbox', name: 'id', value: record.id)
  end

  column(:page_title, header: "Title")
  column(:published, header: "Published", order: false) do |published_record| 
    published_record.published ? 'true' : 'false'
    # published_record0.published ? '<input type="checkbox" disabled="disabled" checked="checked">' : '<input type="checkbox" disabled="disabled">'
  end

  column(:updated_at, header: "Last changed") do |record|
    record.updated_at.strftime("%d/%m/%y %l:%M %p")
  end
end