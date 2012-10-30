class UpdateAttractionsUnique < ActiveRecord::Migration
  def up
    #change_column :attractions, :name, limit: 60, null: false, unique: true
    #change_column :attractions, :description, limit: 512, null: false, unique: true
    #change_column :attractions, :image_url, limit: 256, null: false, unique: true
  end

  def down
    #change_column :attractions, :name, limit: 60, null: false
    #change_column :attractions, :description, limit: 512, null: false
    #change_column :attractions, :image_url, limit: 256, null: false
  end
end
