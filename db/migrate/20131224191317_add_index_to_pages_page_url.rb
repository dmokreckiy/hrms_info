class AddIndexToPagesPageUrl < ActiveRecord::Migration
  def change
    add_index :pages, :page_url, unique: true
  end
end
