require 'test/unit'

class SedTest < Test::Unit::TestCase
  def setup
  end
  
  def test_basic_substitution
    assert_equal("hi dog\n", sed_result("hi cat", "sed 's/cat/dog/'"))
  end
  
  def test_other_delimiters
    delimiter = "_"
    assert_equal("/usr/common/bin\n", sed_result("/usr/local/bin", "sed 's#{delimiter}/local/bin#{delimiter}/common/bin#{delimiter}'"))
    
    delimiter = ":"
    assert_equal("/usr/common/bin\n", sed_result("/usr/local/bin", "sed 's#{delimiter}/local/bin#{delimiter}/common/bin#{delimiter}'"))
    
    delimiter = "|"
    assert_equal("/usr/common/bin\n", sed_result("/usr/local/bin", "sed 's#{delimiter}/local/bin#{delimiter}/common/bin#{delimiter}'"))
  end
  
  def test_wrap_something_around_match_not_known_beforehand
    assert_equal("(cat)\n", sed_result("cat", "sed 's/cat/(&)/'"))
  end
  
  def test_duplicating
    assert_equal("cat cat\n", sed_result("cat", "sed 's/cat/& &/'"))
  end
  
  # note that instead of \s, you use an actual space.
  def test_get_first_word_of_sentence
    assert_equal("howdy\n", sed_result("howdy from Texas", %q[sed 's/\([a-zA-Z]*\).*/\1/']))
    assert_equal("from\n", sed_result("howdy from Texas", %q[sed 's/\([a-zA-Z]*\) \([a-zA-Z]*\).*/\2/']))
    assert_equal("Texas\n", sed_result("howdy from Texas", %q[sed 's/\([a-zA-Z]*\) \([a-zA-Z]*\) \([a-zA-Z]*\).*/\3/']))
  end
  
  def test_switch_words
    assert_equal("second first\n", sed_result("first second", %q[sed 's/\([a-zA-Z]*\) \([a-zA-Z]*\)/\2 \1/']))
  end
  
  def test_get_part_of_word
    assert_equal("abcd\n", sed_result("abcd123", %q[sed 's/\([a-z]*\).*/\1/']))
  end
  
  def test_global_replacement
    assert_equal("I like dogs, dogs and more dogs\n", 
      sed_result("I like cats, cats and more cats", "sed 's/cat/dog/g'"))
  end
  
  def test_put_parens_around_every_word
    assert_equal("(howdy) (from) (Texas)\n", sed_result("howdy from Texas", "sed 's/[^ ][^ ]*/(&)/g'"))
  end
  
private

  def sed_result(input_str, sed_str)
    %x[echo #{input_str} | #{sed_str}]
  end
end