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
  
  # notice that the & represents the match
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
  
  # this uses g for global replace
  def test_global_replacement
    assert_equal("I like dogs, dogs and more dogs\n", 
      sed_result("I like cats, cats and more cats", "sed 's/cat/dog/g'"))
  end
  
  def test_put_parens_around_every_word
    assert_equal("(howdy) (from) (Texas)\n", sed_result("howdy from Texas", "sed 's/[^ ][^ ]*/(&)/g'"))
  end
  
  def test_limit_replace_with_number_eg_replace_second_word
    assert_equal("howdy REPLACED Texas\n", sed_result("howdy from Texas", "sed 's/[a-zA-Z]* /REPLACED /2'"))
  end
  
  # -n causes SED to not print its result, but using p at the end brings it back
  def test_limit_replace_with_number_eg_replace_second_word
    assert_equal("howdy REPLACED Texas\n", sed_result("howdy from Texas", "sed -n 's/[a-zA-Z]* /REPLACED /2p'"))
  end
  
  # You use the w <filename> to write to a file
  def test_write_to_a_file
    assert_equal("howdy REPLACED Texas\n", sed_result("howdy from Texas", "sed 's/[a-zA-Z]* /REPLACED /2w even'"))
    assert_equal("MATCHED\n", %x[sed 's/howdy REPLACED Texas/MATCHED/' < even])
  end
  
  # 0-indexed number tells where to place new content
  def test_add_text_at_certain_point
    assert_equal("howdy from Louisiana and Texas\n", sed_result("howdy from Texas", "sed 's/./&Louisiana and /11'"))
  end
  
  # You can do multiple commands with -e instead of using multiple pipes
  def test_using_dash_e_with_only_one_command_is_ok
    assert_equal("hi dog\n", sed_result("hi cat", "sed -e 's/cat/dog/'"))
  end
  
  def test_using_dash_e_with_two_commands
    assert_equal("123\n", sed_result("abc", "sed -e 's/abc/ABC/' -e 's/ABC/123/'"))
  end
  
  # grep is getting rid of empty lines here.  Notice how we specify multiple files
  def test_multiple_file_names_and_counting_non_comment_lines
    assert_match(/\s*6\n/, %x[sed 's/^#.*//' f1 f2 f3 | grep -v '^$' | wc -l])
  end
  
  def test_double_print
    assert_equal("hi dog\nhi dog\n", sed_result("hi cat", "sed -e 's/cat/dog/p'"))
  end
  
  def test_sed_script
    assert_equal("hi dog\n", sed_result("hi cat", "sed -f sedscript"))
  end
  
# Here we begin addresses and ranges of text

  def test_delete_first_number_on_line_2
    assert_equal("1 for the money\n for the show\n3 for something\n4 for something else\n", 
      %x[sed '2 s/[0-9][0-9]*//' < four_lines])
  end
  
  def test_delete_first_number_on_first_3_lines
    assert_equal(" for the money\n for the show\n for something\n4 for something else\n", 
      %x[sed '1,3 s/[0-9][0-9]*//' < four_lines])
  end
  
  def test_delete_first_number_on_lines_2_through_4
    assert_equal("1 for the money\n for the show\n for something\n for something else\n", 
      %x[sed '2,4 s/[0-9][0-9]*//' < four_lines])
  end
  
  def test_delete_first_number_on_lines_2_to_rest_of_lines
    assert_equal("1 for the money\n for the show\n for something\n for something else\n", 
      %x[sed '2,$ s/[0-9][0-9]*//' < four_lines])
  end
  
# You can also specify ranges of lines by using regular expressions of just strictly line numbers

  def test_delete_first_number_on_pattern_start_line_to_pattern_end_line
    assert_equal("1 for the money\n for the show\n for something\n for something else\n", 
      %x[sed '/show/,/else/ s/[0-9][0-9]*//' < four_lines])
  end
  
  def test_delete_first_number_on_line_3_to_pattern_end_line
    assert_equal("1 for the money\n2 for the show\n for something\n for something else\n", 
      %x[sed '3,/else/ s/[0-9][0-9]*//' < four_lines])
  end
  
  # the d option is used for deletion
  def test_delete_all_lines_after_2
    assert_equal("1 for the money\n2 for the show\n", 
      %x[sed '3,$ d' < four_lines])
  end
  
  def test_delete_first_two_lines
    assert_equal("3 for something\n4 for something else\n", 
      %x[sed '1,2 d' < four_lines])
  end
  
  def test_delete_up_to_pattern_match_lines
    assert_equal("4 for something else\n", 
      %x[sed '1,/something/ d' < four_lines])
  end
  
  def test_delete_all_comment_lines
    assert_equal("This is code line 1\nThis is code line 2\n", 
      %x[sed '/^#/ d' < f1])
  end
  
private

  def sed_result(input_str, sed_str)
    %x[echo #{input_str} | #{sed_str}]
  end
end