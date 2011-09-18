class Bid
     include Comparable
     attr_accessor :contractor
     attr_accessor :estimate

  def <=>(other_bid)
       if self.estimate < other_bid.estimate
            -1
       elsif self.estimate > other_bid.estimate
            1
       else
            0
      end
  end
end

puts "we created a <=> for comparable for a Bid that compares estimate fields."
low_bid = Bid.new
low_bid.estimate = 10
high_bid = Bid.new  
high_bid.estimate = 20
puts "we will compare the lower bid to the higher, which should give us -1"
puts low_bid.<=>(high_bid)
