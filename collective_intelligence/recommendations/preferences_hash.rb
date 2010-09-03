@critics =  [
              'Lisa Rose',
              'Gene Seymour',
              'Michael Phillips',
              'Claudia Puig',
              'Mike LaSalle',
              'Jack Matthews',
              'Toby'
            ]
            
@movies = [
            'Lady in the Water', 
            'Snakes on a Plane',
            'Just My Luck', 
            'Superman Returns', 
            'You, Me and Dupree',
            'The Night Listener'
          ]

@ratings=
  [#{'Lisa Rose'=> 
    { 'Lady in the Water'=> 2.5, 
      'Snakes on a Plane'=> 3.5,
      'Just My Luck'=> 3.0, 
      'Superman Returns'=> 3.5, 
      'You, Me and Dupree'=> 2.5,
      'The Night Listener'=> 3.0},
  #'Gene Seymour'=> 
    { 'Lady in the Water'=> 3.0, 
      'Snakes on a Plane'=> 3.5,
      'Just My Luck'=> 1.5, 
      'Superman Returns'=> 5.0, 
      'The Night Listener'=> 3.0,
      'You, Me and Dupree'=> 3.5},
  #'Michael Phillips'=> 
    { 'Lady in the Water'=> 2.5, 
      'Snakes on a Plane'=> 3.0,
      'Superman Returns'=> 3.5, 
      'The Night Listener'=> 4.0},
  #'Claudia Puig'=> 
    { 'Snakes on a Plane'=> 3.5, 
      'Just My Luck'=> 3.0,
      'The Night Listener'=> 4.5, 
      'Superman Returns'=> 4.0,
      'You, Me and Dupree'=> 2.5},
  #'Mick LaSalle'=> 
    { 'Lady in the Water'=> 3.0, 
      'Snakes on a Plane'=> 4.0,
      'Just My Luck'=> 2.0, 
      'Superman Returns'=> 3.0, 
      'The Night Listener'=> 3.0,
      'You, Me and Dupree'=> 2.0},
  #'Jack Matthews'=> 
    { 'Lady in the Water'=> 3.0, 
      'Snakes on a Plane'=> 4.0,
      'The Night Listener'=> 3.0, 
      'Superman Returns'=> 5.0, 
      'You, Me and Dupree'=> 3.5},
  #'Toby'=> 
    { 'Snakes on a Plane'=> 4.5,
      'You, Me and Dupree'=> 1.0,
      'Superman Returns'=> 4.0}
]

@euclidian_scores = Array.new(@ratings.length)
@pearson_scores = Array.new(@ratings.length)
@ratings.each_with_index do |ignore, i|
  @euclidian_scores[i] = Array.new(@ratings.length)
  @pearson_scores[i] = Array.new(@ratings.length)
end

def power_2(value)
  value * value
end

def sum_axes(ratings_1, ratings_2)
  sum = 0;
  ratings_1.keys.each do |key|
    unless ratings_2[key].nil?
      sum += power_2(ratings_2[key] - ratings_1[key])
    end
  end
  sum;
end

def euclidian_distance_pairing(ratings_1, ratings_2, i, j)
  result = 1/
            (1 + 
              Math.sqrt(
                sum_axes(ratings_1, ratings_2)
              )
            )
  @euclidian_scores[i][j] = result          
  #puts result
end

def all_euclidian_pairings
  @ratings.each_with_index do |rating1, i|
    @ratings.each_with_index do |rating2, j|
      euclidian_distance_pairing(rating1, rating2, i, j)
    end
  end
  #puts @euclidian_scores
end

def find_most_similar_euclidian_critics
  all_euclidian_pairings
  
  top_score = 0
  top_i = 0
  top_j = 0
  @euclidian_scores.each_with_index do |score1, i|
    @euclidian_scores.each_with_index do |score2, j|
      if (i != j && @euclidian_scores[i][j] > top_score)
        top_score = @euclidian_scores[i][j]
        top_i = i
        top_j = j
      end   
    end
  end
  puts "top score is #{top_score}"
  puts "first critic is #{@critics[top_i]}"
  puts "second critic is #{@critics[top_j]}"
end

find_most_similar_euclidian_critics

# Returns the Pearson correlation coefficient for p1 and p2
def sim_pearson(ratings_1, ratings_2)
  # Get the list of mutually rated items
  similar_item={}
  
  ratings_1.keys.each do |movie|
    similar_item[movie] = 1 unless ratings_2[movie].nil?
  end
  
  # Find the number of elements
  n = similar_item.size
  
  # if they are no ratings in common, return 0
  return 0 if n == 0
  
  # Add up all the preferences
  sum1 = 0
  sum2 = 0
  sum1Sq = 0
  sum2Sq = 0
  pSum = 0
  similar_item.each do |item|
    sum1 += ratings_1[item]
    sum2 += ratings_2[item]
    sum1Sq += power_2(ratings_1[item])
    sum2Sq += power_2(ratings_2[item])
    pSum += ratings_1[item] * ratings_2[item]
  end

  # Calculate Pearson score
  num=pSum-(sum1*sum2/n)
  den=sqrt((sum1Sq-power_2(sum1)/n)*(sum2Sq-power_2(sum2)/n))
  
  return 0 if den == 0
  
  r = num / den
  return r
end  

def all_pearson_pairings
  @ratings.each_with_index do |rating1, i|
    @ratings.each_with_index do |rating2, j|
      @pearson_scores[i][j] = sim_pearson(rating1, rating2)
    end
  end
  #puts @pearson_scores
end

def find_most_similar_pearson_critics
  all_pearson_pairings
  
  top_score = 0
  top_i = 0
  top_j = 0
  @pearson_scores.each_with_index do |score1, i|
    @pearson_scores.each_with_index do |score2, j|
      if (i != j && @pearson_scores[i][j] > top_score)
        top_score = @pearson_scores[i][j]
        top_i = i
        top_j = j
      end   
    end
  end
  puts "top score is #{top_score}"
  puts "first critic is #{@critics[top_i]}"
  puts "second critic is #{@critics[top_j]}"
end

find_most_similar_pearson_critics