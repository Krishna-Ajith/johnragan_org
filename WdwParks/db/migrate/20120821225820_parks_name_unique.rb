class ParksNameUnique < ActiveRecord::Migration
  def up
    add_index :parks, :name, :unique => true
  end

  def down
    remove_index :parks, :name
  end
end
