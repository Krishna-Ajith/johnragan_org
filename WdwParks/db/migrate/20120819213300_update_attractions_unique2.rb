class UpdateAttractionsUnique2 < ActiveRecord::Migration
  def up
    add_index :attractions, :name, :unique => true
    add_index :attractions, :description, :unique => true
    add_index :attractions, :image_url, :unique => true
  end

  def down
    remove_index :attractions, :name
    remove_index :attractions, :description
    remove_index :attractions, :image_url
  end
end
