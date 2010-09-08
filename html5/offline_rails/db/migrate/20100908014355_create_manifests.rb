class CreateManifests < ActiveRecord::Migration
  def self.up
    create_table :manifests do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :manifests
  end
end
