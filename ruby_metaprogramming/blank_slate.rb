require 'test/unit'

class BlankSlate
  # Hide the method named +name+ in the BlankSlate class. Don't
  # hide +instance_eval+ or any method beginning with "__".
  def self.hide(name)
     if instance_methods.include?(name.to_s) and name !~ /^(__|instance_eval)/
       @hidden_methods ||= {}
       @hidden_methods[name.to_sym] = instance_method(name)
       undef_method name
     end
   end

   instance_methods.each { |m| hide(m) }
   
   def method_missing(method_name, *args, &block)
     "method #{method_name} is not found"
    end 
end

class NotBlankSlate
end

class BlankSlateTest < Test::Unit::TestCase
  def test_blank_slate
    assert BlankSlate.instance_methods.size < NotBlankSlate.instance_methods.size
    assert BlankSlate.instance_methods.include? "instance_eval"
    assert_equal "method ghost_method is not found", BlankSlate.new.ghost_method
  end
end