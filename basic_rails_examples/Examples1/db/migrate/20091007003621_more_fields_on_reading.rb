class MoreFieldsOnReading < ActiveRecord::Migration
  def self.up
    add_column :readings, :before_add_status, :string
    add_column :readings, :after_add_status, :string
    add_column :readings, :before_remove_status, :string
    add_column :readings, :after_remove_status, :string
  end

  def self.down
    remove_column :readings, :before_add_status, :string
    remove_column :readings, :after_add_status, :string
    remove_column :readings, :before_remove_status, :string
    remove_column :readings, :after_remove_status, :string
  end
end
