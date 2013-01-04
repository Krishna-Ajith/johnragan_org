class Resort < ActiveRecord::Base
  attr_accessible :cost, :name

  has_many :dinings
  has_many :stores

  validates :name, presence: true
  validates_length_of :name, :maximum => 60
end
