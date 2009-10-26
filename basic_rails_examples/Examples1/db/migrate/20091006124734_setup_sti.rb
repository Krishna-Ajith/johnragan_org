class SetupSti < ActiveRecord::Migration
  def self.up
    create_table :people, :force => true do |t|
      t.string :type
      # common attributes
      t.string :name
      t.string :email
      # attributes for type=Customer
      t.string :region
      # attributes for type=Employee
      t.integer :reports_to
      t.integer :dept
      # attributes for type=Manager
      # -- none --
      end
  end

  def self.down
    drop_table :people
  end
end
