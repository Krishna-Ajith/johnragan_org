class Attraction < ActiveRecord::Base
  attr_accessible :name, :description, :image_url, :height, :intensity, :rating, :wait_type, :fast_pass, :pal_mickey, :rider_swap, :wheelchair

  belongs_to :park
  belongs_to :land

  validates :name, :description, :image_url, :height, :intensity, :rating, :wait_type, presence: true

  validates :name, :description, :image_url, :uniqueness => true
  validates_length_of :name, :maximum => 60
  validates_length_of :description, :maximum => 512
  validates_length_of :image_url, :maximum => 200
  validates :image_url, allow_blank: true, :format => {
    :with => %r{\.(gif|jpg|png)\Z}i,
    :message => 'must be a URL for GIF, JPG or PNG image.'
  }

  validates :height,
            :numericality => {:only_integer => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 48}
  validates :intensity, :rating,
            :numericality => {:only_integer => true, :greater_than_or_equal_to => 1, :less_than_or_equal_to => 10}
end
