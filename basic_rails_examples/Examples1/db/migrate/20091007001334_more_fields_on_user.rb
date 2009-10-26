class MoreFieldsOnUser < ActiveRecord::Migration
  def self.up
    add_column :users, :before_add_status, :string
    add_column :users, :after_add_status, :string
    add_column :users, :before_remove_status, :string
    add_column :users, :after_remove_status, :string
  end

  def self.down
    remove_column :users, :before_add_status, :string
    remove_column :users, :after_add_status, :string
    remove_column :users, :before_remove_status, :string
    remove_column :users, :after_remove_status, :string
  end
end
