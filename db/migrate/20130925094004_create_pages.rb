class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
    	t.string :page_title
    	t.string :page_url
    	t.text :keywords
    	t.text :description
    	t.text :content
    	t.integer :parent_page_id
    	t.integer :page_type_id
    	t.boolean :display_top_menu
			t.boolean :display_bottom_menu
			t.boolean :published

      t.timestamps
    end
  end
end
