class Article < ActiveRecord::Base
  has_many :readings, :order => "rating ASC" do
    def reading_rated_at_or_above(rating)
      find :all, :conditions => ['rating >= ?' , rating]
    end
  end
    
  has_one :top_rated_reading,
    :class_name => 'Reading',
    :order => 'rating DESC'  
    
  has_many :low_rated_readings,
    :class_name => "Reading",
    :conditions => "rating < 6",
    :order => 'rating ASC'
    
  has_many :readings_by_rating,
    :class_name => "Reading",
    :conditions => "rating < 6",
    :order => 'rating ASC'
    
  has_many :users, :through => :readings, :uniq => true  # in case user read three times  
end
