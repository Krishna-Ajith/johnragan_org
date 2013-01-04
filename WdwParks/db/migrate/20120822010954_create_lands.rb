class CreateLands < ActiveRecord::Migration
  def change
    create_table :lands do |t|
      t.string :name, :limit => 60, :null => false

      t.timestamps
    end
  end
end
