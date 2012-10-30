class CreateResorts < ActiveRecord::Migration
  def change
    create_table :resorts do |t|
      t.string :name, :limit => 60, :null => false
      t.integer :cost, :null => false, :limit => 4

      t.timestamps
    end
  end
end
