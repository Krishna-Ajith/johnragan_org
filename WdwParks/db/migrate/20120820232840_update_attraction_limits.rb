class UpdateAttractionLimits < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE attractions
        ADD CONSTRAINT chk_Rating CHECK (rating >=1 AND rating <=10),
        ADD CONSTRAINT chk_Intensity CHECK (intensity >=1 AND intensity <=10),
        ADD CONSTRAINT chk_Height CHECK (height >=0 AND height <=48)
    SQL
  end

  def down
  end
end
