Results = Struct.new(:list, :count, :summary, :offset, :limit, :ids)
a = Results.new(1,2,3,4,5,6)
puts a
puts a.list
