class SetupRelationships < ActiveRecord::Migration
  def up
    add_column :stores, :park_id, :integer
    add_column :stores, :land_id, :integer
    add_column :stores, :resort_id, :integer

    add_column :attractions, :park_id, :integer
    add_column :attractions, :land_id, :integer

    add_column :dinings, :park_id, :integer
    add_column :dinings, :land_id, :integer
    add_column :dinings, :resort_id, :integer
  end

  def down
    remove_column :stores, :park_id
    remove_column :stores, :land_id
    remove_column :stores, :resort_id

    remove_column :attractions, :park_id
    remove_column :attractions, :land_id

    remove_column :dinings, :park_id
    remove_column :dinings, :land_id
    remove_column :dinings, :resort_id
  end
end
