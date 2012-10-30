class DiningLimitRating < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE dinings
        ADD CONSTRAINT chk_Rating CHECK (rating >=1 AND rating <=10)
    SQL
  end

  def down
  end
end
