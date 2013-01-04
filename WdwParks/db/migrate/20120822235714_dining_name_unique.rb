class DiningNameUnique < ActiveRecord::Migration
  def up
    add_index :dinings, :name, :unique => true
  end

  def down
    remove_index :dinings, :name
  end
end
