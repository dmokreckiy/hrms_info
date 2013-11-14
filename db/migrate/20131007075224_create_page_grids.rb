class CreatePageGrids < ActiveRecord::Migration
  def change
    create_table :page_grids do |t|

      t.timestamps
    end
  end
end
