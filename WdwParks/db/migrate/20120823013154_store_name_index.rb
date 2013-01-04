class StoreNameIndex < ActiveRecord::Migration
  def up
    add_index :stores, :name, :unique => true
  end

  def down
    remove_index :stores, :name
  end
end
