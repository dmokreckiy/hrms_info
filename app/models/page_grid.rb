class PageGrid
  include Datagrid

  # Scope
  # изначальная выборка с нисходящей сортировкой по дате изменения
  scope do
    Page.order("updated_at desc")
  end

  # Filters
  # фильтры для различных баз данных (SQLite и Oracle)
  filter(:page_title, :string) do |value, scope|
    #scope.where("page_title like '%#{value.downcase}%'")
    #oracle case insensitive search
    scope.where("page_title LIKE INITCAP('%?%')", value)
  end

  # Columns
  # столбцы для таблицы
  # столбец для галок отметки страниц
  column(:id, header: "", html: true, order: false) do |record|
    tag("input", type: 'checkbox', name: 'id', value: record.id)
  end

  # столбец для наименования страниц
  column(:page_title, header: "Title")

  # столбец для отображения статус публикации страницы
  column(:published, header: "Published", order: false) do |published_record|
    published_record.published ? 'true' : 'false'
  end

  # столбец для отображения даты последнего изменения в соответствующем формате
  column(:updated_at, header: "Last changed") do |record|
    record.updated_at.strftime("%d/%m/%y %l:%M %p")
  end
end