class DropAttractionsDescIndex < ActiveRecord::Migration
  def up
    remove_index :attractions, :name => :index_attractions_on_description
  end

  def down
  end
end
