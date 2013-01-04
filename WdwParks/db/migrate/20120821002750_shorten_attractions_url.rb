class ShortenAttractionsUrl < ActiveRecord::Migration
  def up
    change_column(:attractions, :image_url, :string, :limit => 200, :null => false)
  end

  def down
  end
end
