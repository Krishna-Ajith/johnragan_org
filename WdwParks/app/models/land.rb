class Land < ActiveRecord::Base
  attr_accessible :name

  belongs_to :park
  has_many :attractions
  has_many :dinings
  has_many :stores

  validates :name, presence: true
  validates_length_of :name, :maximum => 60
end
