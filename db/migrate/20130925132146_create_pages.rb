class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string  :page_title
      t.string  :page_url
      t.text    :keywords
      t.string  :description
      t.text    :content
      t.integer :parent_page_id
      t.integer :page_type
      t.boolean :display_top_menu
      t.boolean :display_bottom_menu
      t.boolean :published

      t.timestamps
    end
      add_index :pages, :page_title
  end
end
