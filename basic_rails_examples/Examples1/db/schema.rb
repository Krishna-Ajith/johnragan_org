# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20091007003621) do

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "filter_demos", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.string  "pay_type"
    t.integer "total"
    t.string  "status"
    t.string  "audit_info"
  end

  create_table "people", :force => true do |t|
    t.string  "type"
    t.string  "name"
    t.string  "email"
    t.string  "region"
    t.integer "reports_to"
    t.integer "dept"
  end

  create_table "readings", :force => true do |t|
    t.integer  "article_id"
    t.integer  "user_id"
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "before_add_status"
    t.string   "after_add_status"
    t.string   "before_remove_status"
    t.string   "after_remove_status"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "before_add_status"
    t.string   "after_add_status"
    t.string   "before_remove_status"
    t.string   "after_remove_status"
  end

  create_table "validation_targets", :force => true do |t|
    t.boolean  "acceptance"
    t.integer  "an_int"
    t.string   "genre_in"
    t.string   "genre_out"
    t.string   "regex_string"
    t.string   "length"
    t.string   "exist_foo"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
