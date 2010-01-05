require 'test/unit'

class RegExTest < Test::Unit::TestCase
    # def setup
    # end

    # def teardown
    # end

    # 1. Find out if a certain string (abc) exists in as a substring within a document; and if so, where
    def test_regex1
      regex = /abc/
      sentence = '123abcdef'
      
      assert_equal(3, sentence =~ regex)
      assert_equal('abc', regex.match(sentence)[0])
    end
    
    # 5.  Find a character only string that is a whole word only
    def test_regex5
      regex = /\b[a-zA-Z]+\b/
      sentence = '123 ab4 4ab ab 1234'
      
      assert_equal(12, sentence  =~ regex)
      assert_equal('ab', regex.match(sentence)[0])
    end
    
    # 7.  Find the string foo or bar
    def test_regex7
      regex = /(foo)|(bar)/
      sentence1 = '123foodef'
      sentence2 = '123bardef'
      
      assert_equal(3, sentence1 =~ regex)
      assert_equal('foo', regex.match(sentence1)[0])
      assert_equal(3, sentence2 =~ regex)
      assert_equal('bar', regex.match(sentence2)[0])
    end
    
    
    # 12a. See if a string matches that starts with 1 or more characters and ends with "bar".  
    def test_regex12a
      regex = /[a-zA-Z]+bar$/
      sentence = '12345fkbar'
      
      assert_equal(nil, 'abasdfkers' =~ regex)
      assert_equal(5, sentence =~ regex)
      assert_equal('fkbar', regex.match(sentence)[0])
    end
    
    # 12b. Additionally, one that does not end with "bar".  NOT SURE HOW TO DO THIS ONE
    # http://stackoverflow.com/questions/323697/regular-expression-to-match-a-string-1-characters-that-does-not-end-in-ext
    def test_regex12b
      regex = /[a-zA-Z]+bar$/
      
      #assert_equal(nil, '12345fkbar' =~ regex)
      #assert_equal(7, '12345fkbat' =~ regex)
    end
    
    # 18. Find  "abc" or "abcabc" and so forth in the sentence
    def test_regex18
      # Without the double parenthesis, it only gets "abc" when "abcabc" is present.
      regex = /((abc)+)/
      sentence1 = 'what is going on abc foo shizzle this is it'
      sentence2 = 'what is going on abcabcabc foo shizzle this is it'
      
      assert_equal(17, sentence1 =~ regex)
      assert_equal('abc', regex.match(sentence1)[0])
      assert_equal(17, sentence2 =~ regex)
      assert_equal('abcabcabc', regex.match(sentence2)[0])
    end
    
    # 23. Find the telephone number in the format 571-217-9451
    def test_regex23
      regex = /\d{3}-\d{3}-\d{4}/
      sentence = 'what is 12going o123-444-7918n abc foo shizzle this is it'
      
      assert_equal(17, sentence =~ regex)
      assert_equal('123-444-7918', regex.match(sentence)[0])
    end
    
    #24 - Find a number (without commas) that is at least 5 digits
    def test_regex24
      regex = /\d{5,}/
      sentence1 = 'what is 12going 123o1234 or 1234567 or something more'
      sentence2 = 'what is 12going 123o1234 or 12345 or something more'
      
      assert_equal(28, sentence1 =~ regex)
      assert_equal('1234567', regex.match(sentence1)[0])
      assert_equal(28, sentence2 =~ regex)
      assert_equal('12345', regex.match(sentence2)[0])
    end
    
    #25 - Find a number between 4 to 9 digits
    def test_regex25
      regex = /\d{4,9}/
      sentence1 = 'what 1 and 12 or 123 and 1234 and 12345 or 123456789 and 1234567890'
      sentence2 = 'what 1 and 12 or 123 and 12345678 and 12345 or 123456789 and 1234567890'
      sentence3 = 'what 1 and 12 or 123 and 123456789 and 12345 or 123456789 and 1234567890'
      sentence4 = 'what 1 and 12 or 123 and 1234567890 and 12345 or 123456789 and 1234567890'
      
      assert_equal(25, sentence1 =~ regex)
      assert_equal('1234', regex.match(sentence1)[0])
      assert_equal(25, sentence2 =~ regex)
      assert_equal('12345678', regex.match(sentence2)[0])
      assert_equal(25, sentence3 =~ regex)
      assert_equal('123456789', regex.match(sentence3)[0])
      assert_equal(25, sentence4 =~ regex)
      # It matches on up to the first nine digits, as opposed to ignoring 1234567890 (which is 10 digits)
      assert_equal('123456789', regex.match(sentence4)[0])
    end
  end