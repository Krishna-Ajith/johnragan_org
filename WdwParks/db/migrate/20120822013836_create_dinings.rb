class CreateDinings < ActiveRecord::Migration
  def change
    create_table :dinings do |t|
      t.string :name, :limit => 60, :null => false
      t.integer :rating, :null => false, :limit => 4
      t.integer :cost, :null => false, :limit => 4

      t.timestamps
    end
  end
end
