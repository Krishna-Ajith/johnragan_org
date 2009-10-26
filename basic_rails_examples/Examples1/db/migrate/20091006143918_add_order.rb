class AddOrder < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.string :pay_type
    end
  end

  def self.down
    drop_table :orders
  end
end
