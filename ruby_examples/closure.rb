def call_some_proc(pr)
     a = "- irrelevant 'a' in method scope"
     puts "first we print out the irrelevant a"
     puts a
     puts "with closure, should use the Proc block and not irrelevant a"
     pr.call
end

a = "- 'a' to be used in Proc block"
pr = Proc.new { puts a }
call_some_proc(pr)
