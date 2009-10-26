def grab_block(&block)
     block.call()
end

grab_block { puts "This block will end up in the variable 'block'" }

lam = lambda { puts "This lambda will serve as a code block" }
grab_block &lam

grab_block &lambda {  puts "This lambda 2 will serve as a code block" }