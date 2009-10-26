require File.dirname(__FILE__) + '/../test_helper'

class ReadingTest < ActiveSupport::TestCase
  def test_basic_relationships
    user = User.create(:name => "John")
    assert_not_nil user
    
    article = Article.create(:title => "Ruby on Rails")
    assert_not_nil article
    
    reading = Reading.new(:rating => 10)
    assert_not_nil reading
    
    reading.user = user
    reading.article = article
    reading.save
    
    assert_equal(user.name, reading.user.name)
    assert_equal(article.title, reading.article.title)
    assert_equal(user.readings.first.user.name, user.name)
    assert_equal(article.readings.first.article.title, article.title)
  end
  
  def test_article_to_readings_order_asc
    article = Article.create(:title => "Ruby on Rails")
    assert_not_nil article
    
    reading = Reading.new(:rating => 10)
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 8)
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 9)
    reading.article = article
    reading.save
    
    readings = article.readings
    assert_equal 8, readings[0].rating
    
    readings = article.readings
    assert_equal 9, readings[1].rating
    
    readings = article.readings
    assert_equal 10, readings[2].rating
    
    reading = article.top_rated_reading
    assert_equal 10, reading.rating
  end
  
  def test_conditional_association
    article = Article.create(:title => "Ruby on Rails")
    assert_not_nil article
    
    reading = Reading.new(:rating => 8)
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 3)
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 5)
    reading.article = article
    reading.save
    
    low_ratings = article.low_rated_readings
    
    assert_equal 3, low_ratings[0].rating
    assert_equal 5, low_ratings[1].rating
    
    assert_equal 3, article.readings.reading_rated_at_or_above(3).count
    assert_equal 2, article.readings.reading_rated_at_or_above(5).count
    assert_equal 1, article.readings.reading_rated_at_or_above(8).count
  end
  
  def test_unique_get_users_from_article
    article = Article.create(:title => "Ruby on Rails")
    
    userJohn = User.create(:name => "John")
    userChristine = User.create(:name => "Christine")
    userAllie = User.create(:name => "Allie")
    
    reading = Reading.new(:rating => 8)
    reading.user = userChristine
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 6)
    reading.user = userAllie
    reading.article = article
    reading.save
    
    reading = Reading.new(:rating => 4)
    reading.user = userAllie
    reading.article = article
    reading.save
    
    assert_equal(2, article.users.count)
  end
  
  def test_association_callback
    userJohn = User.create(:name => "John")
    reading = Reading.new(:rating => 8)
    reading.user = userJohn
    reading.save
    
    # assert_equal "added before", reading.before_add_status
  end
end
