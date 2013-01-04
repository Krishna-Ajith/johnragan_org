class Store < ActiveRecord::Base
  attr_accessible :name

  belongs_to :park
  belongs_to :resort
  belongs_to :land

  validates :name, presence: true
  validates_length_of :name, :maximum => 60
end
