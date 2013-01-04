class UpdateAttractions < ActiveRecord::Migration
  def up
    rename_column :attractions, :url, :image_url
  end

  def down
    rename_column :attractions, :image_url, :url
  end
end
