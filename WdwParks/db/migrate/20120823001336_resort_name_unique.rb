class ResortNameUnique < ActiveRecord::Migration
  def up
    add_index :resorts, :name, :unique => true
  end

  def down
    remove_index :resorts, :name
  end
end
