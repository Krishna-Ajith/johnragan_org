class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.string :name, :limit => 60, :null => false

      t.timestamps
    end
  end
end
