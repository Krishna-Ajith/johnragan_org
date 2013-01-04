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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120823022211) do

  create_table "attractions", :force => true do |t|
    t.string   "name",        :limit => 60,                     :null => false
    t.string   "description", :limit => 512,                    :null => false
    t.string   "image_url",   :limit => 200,                    :null => false
    t.integer  "rating",                                        :null => false
    t.integer  "wait_type",                                     :null => false
    t.integer  "intensity",                                     :null => false
    t.integer  "height",                     :default => 0,     :null => false
    t.boolean  "fast_pass",                  :default => false, :null => false
    t.boolean  "pal_mickey",                 :default => false, :null => false
    t.boolean  "rider_swap",                 :default => false, :null => false
    t.boolean  "wheelchair",                 :default => false, :null => false
    t.datetime "created_at",                                    :null => false
    t.datetime "updated_at",                                    :null => false
    t.integer  "park_id"
    t.integer  "land_id"
  end

  add_index "attractions", ["image_url"], :name => "index_attractions_on_image_url", :unique => true
  add_index "attractions", ["name"], :name => "index_attractions_on_name", :unique => true

  create_table "dinings", :force => true do |t|
    t.string   "name",       :limit => 60, :null => false
    t.integer  "rating",                   :null => false
    t.integer  "cost",                     :null => false
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
    t.integer  "park_id"
    t.integer  "land_id"
    t.integer  "resort_id"
  end

  add_index "dinings", ["name"], :name => "index_dinings_on_name", :unique => true

  create_table "lands", :force => true do |t|
    t.string   "name",       :limit => 60, :null => false
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "lands", ["name"], :name => "index_lands_on_name", :unique => true

  create_table "parks", :force => true do |t|
    t.string   "name",       :limit => 60, :null => false
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "parks", ["name"], :name => "index_parks_on_name", :unique => true

  create_table "resorts", :force => true do |t|
    t.string   "name",       :limit => 60, :null => false
    t.integer  "cost",                     :null => false
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "resorts", ["name"], :name => "index_resorts_on_name", :unique => true

  create_table "stores", :force => true do |t|
    t.string   "name",       :limit => 60, :null => false
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
    t.integer  "park_id"
    t.integer  "land_id"
    t.integer  "resort_id"
  end

  add_index "stores", ["name"], :name => "index_stores_on_name", :unique => true

end
