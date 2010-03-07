require 'test/unit'

class CodeProcessorSpellTest < Test::Unit::TestCase
  def test_it
    File.readlines("a_file_containing_lines_of_ruby.txt" ).each do |line|
      puts "#{line.chomp} ==> #{eval(line)}"
    end

    # >> 1 + 1 ==> 2
    # >> 3 * 2 ==> 6
    # >> Math.log10(100) ==> 2.0    
  end
end