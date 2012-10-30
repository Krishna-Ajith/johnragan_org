class StoreRestrictName < ActiveRecord::Migration
  def up
    change_column(:stores, :name, :string, :limit => 60, :null => false)
  end

  def down
  end
end
