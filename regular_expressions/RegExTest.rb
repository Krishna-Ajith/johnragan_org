require 'test/unit'

class RegExTest < Test::Unit::TestCase
    # def setup
    # end

    # def teardown
    # end

    # 1. Find out if a certain string (abc) exists in as a substring within a document; and if so, where
    def test_regex1
      regex = /abc/
      assert_equal(3, '123abcdef' =~ regex)
      assert_equal('abc', regex.match('123abcdef')[0])
    end
    
    # 5.  Find a character only string that is a whole word only
    def test_regex5
      regex = /\b[a-zA-Z]+\b/
      assert_equal(12, '123 ab4 4ab ab 1234' =~ regex)
      assert_equal('ab', regex.match('123 ab4 4ab ab 1234')[0])
    end
    
    # 7.  Find the string foo or bar
    def test_regex7
      regex = /(foo)|(bar)/
      assert_equal(3, '123foodef' =~ regex)
      assert_equal('foo', regex.match('123foodef')[0])
      assert_equal(3, '123bardef' =~ regex)
      assert_equal('bar', regex.match('123bardef')[0])
    end
    
    
    # 12. See if a string matches that starts with 1 or more characters and ends with "bar".  Additionally, one that does not end with "bar".
    def test_regex12a
      regex = /[a-zA-Z]+bar$/
      assert_equal(nil, 'abasdfkers' =~ regex)
      assert_equal(5, '12345fkbar' =~ regex)
      assert_equal('fkbar', regex.match('12345fkbar')[0])
    end
    
    # 12. See if a string matches that ends with "bar".  Additionally, one that does not end with "bar".  NOT SURE HOW TO DO THIS ONE
    # http://stackoverflow.com/questions/323697/regular-expression-to-match-a-string-1-characters-that-does-not-end-in-ext
    def test_regex12b
      regex = /[a-zA-Z]+bar$/
      #assert_equal(nil, '12345fkbar' =~ regex)
      #assert_equal(7, '12345fkbat' =~ regex)
    end
  end
