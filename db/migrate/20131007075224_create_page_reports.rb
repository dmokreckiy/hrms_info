class CreatePageReports < ActiveRecord::Migration
  def change
    create_table :page_reports do |t|

      t.timestamps
    end
  end
end
