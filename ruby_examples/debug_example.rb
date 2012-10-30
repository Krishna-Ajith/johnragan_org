#use rdebug debug_example.rb, with ruby-debug gem

def func(*args)
  if args.size != 1
    raise "func() needs one argument, not #{args.size}"
  end
  if args[0].kind_of?(String)
    puts "using func() as a string"
  elsif args[0].kind_of?(Fixnum)
    puts "Using func() as fixnum"
  else
    raise "Invoked func() with improper argument"
  end
end

debugger
func("foo")