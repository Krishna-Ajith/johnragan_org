class AddValidationTarget < ActiveRecord::Migration
  def self.up
    create_table :validation_targets do |t|
      t.boolean :acceptance
      t.integer :an_int
      t.string :genre_in
      t.string :genre_out
      t.string :regex_string
      t.string :length
      t.string :exist_foo
      
      t.timestamps
    end
  end

  def self.down
    drop_table :validation_targets
  end
end
