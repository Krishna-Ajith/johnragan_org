class CreateAttractions < ActiveRecord::Migration
  def change
    create_table :attractions do |t|
      t.string :name, :limit => 60, :null => false
      t.string :description, :limit => 512, :null => false
      t.string :url, :limit => 256, :null => false
      t.integer :rating, :null => false, :limit => 4
      t.integer :wait_type, :null => false, :limit => 4
      t.integer :intensity, :null => false, :limit => 4
      t.integer :height, :default => 0, :null => false, :limit => 4
      t.boolean :fast_pass, :default => false, :null => false
      t.boolean :pal_mickey, :default => false, :null => false
      t.boolean :rider_swap, :default => false, :null => false
      t.boolean :wheelchair, :default => false, :null => false

      t.timestamps
    end
  end
end
