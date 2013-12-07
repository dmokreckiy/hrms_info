# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131007075224) do

  create_table "page_grids", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pages", force: true do |t|
    t.string   "page_title"
    t.string   "page_url"
    t.text     "keywords"
    t.string   "description"
    t.text     "content"
    t.integer  "parent_page_id"
    t.integer  "page_type"
    t.boolean  "display_top_menu"
    t.boolean  "display_bottom_menu"
    t.boolean  "published"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pages", ["page_title"], name: "index_pages_on_page_title"

end
