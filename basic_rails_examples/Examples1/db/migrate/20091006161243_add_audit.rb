class AddAudit < ActiveRecord::Migration
  def self.up
    add_column :orders, :audit_info, :string
  end

  def self.down
    remove_column :orders, :audit_info
  end
end