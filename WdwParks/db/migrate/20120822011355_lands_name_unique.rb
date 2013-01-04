class LandsNameUnique < ActiveRecord::Migration
  def up
    add_index :lands, :name, :unique => true
  end

  def down
    remove_index :lands, :name
  end
end
