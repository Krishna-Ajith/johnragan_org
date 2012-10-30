class Park < ActiveRecord::Base
  attr_accessible :name

  has_many :lands
  has_many :attractions
  has_many :dinings
  has_many :stores

  validates :name, presence: true
    validates_length_of :name, :maximum => 60
end
