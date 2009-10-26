class CreateFilterDemos < ActiveRecord::Migration
  def self.up
    create_table :filter_demos do |t|
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :filter_demos
  end
end
