class Dining < ActiveRecord::Base
  attr_accessible :name, :rating, :cost

  belongs_to :park
  belongs_to :resort
  belongs_to :land

  validates :name, presence: true
  validates_length_of :name, :maximum => 60

  validates :rating,
            :numericality => {:only_integer => true, :greater_than_or_equal_to => 1, :less_than_or_equal_to => 10}
end
