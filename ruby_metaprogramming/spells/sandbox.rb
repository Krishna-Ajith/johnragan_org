require 'test/unit'

def sandbox(&code)
  proc {
    $SAFE = 2
    yield
  }.call
end

class SandboxSpellTest < Test::Unit::TestCase
  def test_it
    begin
      sandbox { File.delete 'a_file' }
    rescue Exception => ex
      assert_equal "Insecure operation `delete' at level 2", ex.to_s
    end 
  end
end