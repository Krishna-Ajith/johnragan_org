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
    
    # 2. Replace the contents of a string within a document with something else
    def test_regex2
      the_string = 'what was once foo'
      the_string.gsub! /foo/, 'bar'
      assert_equal("what was once bar", the_string)
    end
    
    # 3. Find three keys parts of a document and pull them out
    def test_regex3
      regex = /(snap)\sand\s(crackle)\sand\s(pop)/
      sentence = 'this is snap and crackle and pop cereal'
      
      assert_equal(8, sentence  =~ regex)
      assert_equal('snap and crackle and pop', regex.match(sentence)[0])
      assert_equal('snap', regex.match(sentence)[1])
      assert_equal('crackle', regex.match(sentence)[2])
      assert_equal('pop', regex.match(sentence)[3])
    end
    
    # 4. Find the word "foo" in a sentence but it cannot be "foobar".
    def test_regex4
      regex = /\bfoo(?!bar)\b/
      sentence = '123 ab4 foobar foo bar'
      
      assert_equal(15, sentence  =~ regex)
      assert_equal('foo', regex.match(sentence)[0])
    end
    
    # 5.  Find a character only string that is a whole word only
    def test_regex5
      regex = /\b[a-zA-Z]+\b/
      sentence = '123 ab4 4ab ab 1234'
      
      assert_equal(12, sentence  =~ regex)
      assert_equal('ab', regex.match(sentence)[0])
    end
    
    # 6. Find a string that is not a case-sensitive match
    def test_regex6
      sentence = 'Have a nice day'
      
      assert_equal(nil, /have/.match(sentence))
      assert_equal("Have", /have/i.match(sentence)[0])
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
    
    #8.  Match foo and goo (and so forth) but not boo without using these as words in your formula
    def test_regex8
      regex = /[^b]oo/
      sentence1 = 'here is boo and foo and I am through'
      sentence2 = 'here is boo and goo and I am through'
      
      assert_equal(16, sentence1 =~ regex)
      assert_equal('foo', regex.match(sentence1)[0])
      assert_equal(16, sentence2 =~ regex)
      assert_equal('goo', regex.match(sentence2)[0])
    end
    
    #9.  Find the strings that end in "oo" (3 character, and unlimited characters)
    def test_regex9
      regex = /\b\wooo*\b/
      sentence1 = 'here is bo, boo and foo and I am through'
      sentence2 = 'here is go, goooo and boo and I am through'
      
      assert_equal(12, sentence1 =~ regex)
      assert_equal('boo', regex.match(sentence1)[0])
      # TODO - Fix the following - how do you find ALL strings?
      #assert_equal('foo', regex.match(sentence1)[1])
      
      assert_equal(12, sentence2 =~ regex)
      assert_equal('goooo', regex.match(sentence2)[0])
      # TODO - Fix the following - how do you find ALL strings?
      #assert_equal('boo', regex.match(sentence2)[1])
    end
    
    #10.  Find any string that ends in "oo" but boo is not valid (REPEATS #8?  Or subtle difference?  I think I reversed them)
    
    #11.  See if a word matches that starts with "foo".  Additionally, one that does not start with "foo".
    def test_regex11
      regex1 = /\bfoo\w*\b/
      regex2 = /\b(^(foo))\w*\b/
      sentence1 = 'here is fo, fooshizzle, and so forth'
      sentence2 = 'fooshizzle thistle'
      
      assert_equal(12, sentence1 =~ regex1)
      assert_equal('fooshizzle', regex1.match(sentence1)[0])
      
      # TODO - Figure out how to do this
      #assert_equal(11, sentence2 =~ regex2)
      #assert_equal('thistle', regex2.match(sentence2)[0])
    end  
    
    # 12a. See if a string matches that starts with 1 or more characters and ends with "bar".  
    def test_regex12a
      regex = /[a-zA-Z]+bar$/
      sentence = ' foo 12345fkbar'
      
      assert_equal(nil, 'abasdfkers' =~ regex)
      assert_equal(10, sentence =~ regex)
      assert_equal('fkbar', regex.match(sentence)[0])
    end
    
    # 12b. Additionally, one that does not end with "bar".  NOT SURE HOW TO DO THIS ONE
    # http://stackoverflow.com/questions/323697/regular-expression-to-match-a-string-1-characters-that-does-not-end-in-ext
    # You'll need to use negative look behind
    def test_regex12b
      regex = /[a-zA-Z]+bar$/
      sentence = '12345fkbar foo'
      
      # assert_equal(11, sentence =~ regex)
      # assert_equal('foo', regex.match(sentence)[0])
    end
    
    #13.  Find a substring that begins with "foo" and ends with "bar".
    def test_regex13
      regex = /foo\w*bar/
      sentence1 = "here if fooshizzlebar and the rest"
      sentence2 = "here if foobar and the rest"
      
      assert_equal(8, sentence1 =~ regex)
      assert_equal('fooshizzlebar', regex.match(sentence1)[0])
      
      assert_equal(8, sentence1 =~ regex)
      assert_equal('foobar', regex.match(sentence2)[0])
    end
    
    #14. Find the first and last word in a sentence
    def test_regex14
      regex = /\b\w+\b/
      sentence = "have a happy birthday"
      
      assert_equal(0, sentence =~ regex)
      assert_equal('have', regex.match(sentence)[0])
      # TODO - Not sure how to find the last word (or even all the words)
    end
    
    # 15.  Find the first character that is not a number or digit in a string
    def test_regex15
      regex = /[^\d]/
      sentence = "123456789a1234bd cadf 1342here"
      
      assert_equal(9, sentence =~ regex)
      assert_equal('a', regex.match(sentence)[0])
    end
    
    # 16. Find the first number in a string (and last number)
    def test_regex16
      regex = /\d+/
      sentence = "abc 1343 dser 78234"
      
      assert_equal(4, sentence =~ regex)
      assert_equal('1343', regex.match(sentence)[0])
      # TODO - not sure how to get the last number
    end
    
    #17. What is the text before the phrase "in the middle"?  What is the text that follows?
    def test_regex17
      regex = /in the middle/
      sentence = "at the front in the middle at the end"
      
      assert_equal(13, sentence =~ regex)
      assert_equal('in the middle', regex.match(sentence)[0])
      assert_equal('at the front ', regex.match(sentence).pre_match)
      assert_equal(' at the end', regex.match(sentence).post_match)
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
    
    #19. Find the string "abc" or "abcdef"
    def test_regex19
      regex = /(abcdef)|(abc)/
      # Since abc is a subset of abcdef, order matters
      #regex = /(abc)|(abcdef)/
      sentence = "13234 asdf 234 asjfk abcdef abc"
      
      assert_equal(21, sentence =~ regex)
      assert_equal('abcdef', regex.match(sentence)[0])
    end
    
    #20. Find the string "abc" or "abc1" or "abc11" and so forth
    def test_regex20
      regex = /abc1*/
      sentence = "123456789abc111234bd cadf 1342here"
      
      assert_equal(9, sentence =~ regex)
      assert_equal('abc111', regex.match(sentence)[0])
    end
    
    #21 Find all alphabetic words that end with the first "3"
    def test_regex21
      regex = /\b[a-zA-z]+3\b/
      sentence = "Here are some words excited3 that I am looking for"
      
      assert_equal(20, sentence =~ regex)
      assert_equal('excited3', regex.match(sentence)[0])
    end
    
    #22. Find the word that starts with an alphabetic character and ends with 17
    def test_regex22
      regex = /\ba\w*17\b/
      sentence = 'what is abig #17 abig17 12going o123-444-7918n abc foo shizzle this is it'
      
      assert_equal(17, sentence =~ regex)
      assert_equal('abig17', regex.match(sentence)[0])
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
    
    #26. Find the word that matches a sequence of 5 instances where there is one to 3 numbers and a single character
    def test_regex26
      regex = /\b(\d{1,3}[a-zA-Z]){5}\b/
      sentence = 'what is this 234m54234i3n42j67u 234m54i3n42j67u789v23w 234m54i3n42j67u foo shizzle this is it'
      
      assert_equal(55, sentence =~ regex)
      assert_equal('234m54i3n42j67u', regex.match(sentence)[0])
    end
    
    #27. Find the string "abc" at the end of the string where there is a newline character
    
    #28 - Given a dollar figure, return the portion without the cents.
    def test_regex28
      regex = /\$(\d|\,)+/
      sentence1 = 'it will cost $1,512.34 or even more'
      sentence2 = 'it will cost $316.00 or even more'
      
      assert_equal(13, sentence1 =~ regex)
      assert_equal('$1,512', regex.match(sentence1)[0])
      assert_equal(13, sentence2 =~ regex)
      assert_equal('$316', regex.match(sentence2)[0])
    end
    
    #29. Given string "#@%# 123bar 23bar 342 siojbar", find the first word that does not have "bar" in it
    # I had trouble doing this with matching characters [a-zA-Z], since bar also falls under [a-zA-Z]
    def test_regex29      
      regex = /\b\d+(?!bar)\b/
      sentence = '#@%# 123bar 23bar 342 siojbar'
      
      assert_equal(18, sentence =~ regex)
      assert_equal('342', regex.match(sentence)[0])
    end
    
    #30.  Find all the instances of numbers greater than 5 digits
    def test_regex30
      regex = /\b\d{6,}\b/
      sentence = '1 12 123 1234 12345 123456 1234567 12345678'
      
      assert_equal(20, sentence =~ regex)
      assert_equal('123456', regex.match(sentence)[0])
      # TODO - Not sure how to get all of them
    end
    
    #31.  Find the number followed by the a space and word "bang" from "123 howdy 456 wow 789 bang"
    def test_regex31
      regex = /\b\d+(?=\sbang)\b/
      sentence = '123 howdy 456 wow 789 bang'
      
      #assert_equal(18, sentence =~ regex)
      assert_equal('789', regex.match(sentence)[0])
    end
    
    #32.  Do a greedy match (from "abc!def!ghi!" get the whole thing for .+!)
    def test_regex32
      regex = /.+!/
      sentence = 'abc!def!ghi!'
      
      assert_equal(0, sentence =~ regex)
      assert_equal('abc!def!ghi!', regex.match(sentence)[0])
    end
    
    #33.  Do a non-greedy match (from "abc!def!ghi!" get "the whole thing"abc!"" for .+!)
    def test_regex33
      regex = /.+?!/
      sentence = 'abc!def!ghi!'
      
      assert_equal(0, sentence =~ regex)
      assert_equal('abc!', regex.match(sentence)[0])
    end
  end