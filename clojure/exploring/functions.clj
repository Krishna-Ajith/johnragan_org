(ns exploring.functions
  (:gen-class))
(use 'clojure.contrib.test-is)
    
; Applies the str method to each of the individual characters    
(deftest test-apply
  (is (= "dcoagt" (apply str (interleave "dog" "cat")))))

; filter specifies what must be true to pass through
; this anonymous function uses the fn format  
(defn filter_with_fn_anonymous_functions []
  (filter (fn [w] (> (count w) 2)) [[1 2 3] [4 5] [7 8 9]])) 
(deftest test-filter_and_fn_anonymous_function
  (is (= 2 (count (filter_with_fn_anonymous_functions))))
)  
  
;now does the anonymous function using the other format  
(defn filter_with_hash_anonymous_functions []
  (filter #(> (count %) 2) [[1 2 3] [4 5] [7 8 9]]))
(deftest test-filter_and_hash_anonymous_function
  (is (= 2 (count (filter_with_hash_anonymous_functions))))
)  

; now, try an anonymous function with let
(defn filter_with_fn_anonymous_functions_with_let []
  (let [minimum_of_2 (fn [w] (> (count w) 2))]
  (filter minimum_of_2 [[1 2 3] [4 5] [7 8 9]]))) 
(deftest test-filter_and_fn_anonymous_function_with_let
  (is (= 2 (count (filter_with_fn_anonymous_functions_with_let))))
)
   
  
(deftest test-common-predicates
  (is (= true (string? "howdy")))
  (is (= true (keyword? :howdy)))
  (is (= true (symbol? 'howdy)))
)


; Using multiple signatures allows you to have overloaded methods by count (not sure about typing hints)
(defn overloaded-method
"Returns that the Saints are the best team if none specified, else the one that is specified"
([] (overloaded-method "Saints"))
([team] (str "The best football team is the " team))
)
(deftest test-overloaded-function
  (is (= "The best football team is the Saints" (overloaded-method)))
  (is (= "The best football team is the Rams" (overloaded-method "Rams")))
)  


; Create a function dynamically at run-time using anonymous functions
(defn make_best_team [team]
  (fn [] (str "The best football team is the " team))
)
(def best_team_saints (make_best_team "Saints"))
(def best_team_rams (make_best_team "Rams"))
(deftest test-dynamically_created_functions
  (is (= "The best football team is the Saints", (best_team_saints)))
  (is (= "The best football team is the Rams", (best_team_rams)))
)


; Using an ampersand you can have variable arity
(defn countries_visited [name origin_country & countries]
  (str name " from " origin_country " has visited " (count countries) " countries.")
)
(deftest test-variable-arity
  (is (= "John from USA has visited 5 countries." (countries_visited "John" "USA" "UK" "France" "Switzerland" "Germany" "Luxembourg")))
)


; When you use def or defn, you can refer to the variable itself (rather than what it is bound to)
; using either (var foo) or #'foo


; Here we are doing destructing using a map.  This means that instead of having to use the entire
; structure, you can work with just a sub-structure
(defn best_movie_title [{movie_title :title}]
  (str "The best movie ever is " movie_title))
(deftest test-destructuring_with_map
  (is (= "The best movie ever is Amelie" (best_movie_title {:title "Amelie" :origin "France"})))
)  


; Now, lets try destructuring with a vector.  First lets get the first 2 of 4
(defn first_two_of_four [the_vector]
  (let [[x y] the_vector]
    [x, y])
)
(deftest test-destructure_first_part_of_vector
  (is (= [1 2] (first_two_of_four [1 2 3 4]))))
  
; Now lets try the last two
(defn last_two_of_four [the_vector]
  (let [[_ _ x y] the_vector]
    [x, y])
)
(deftest test-destructure_last_part_of_vector
  (is (= [3 4] (last_two_of_four [1 2 3 4]))))
  
; Inside a destructuring, the :as clause gives you access to the entire collection  
(defn first_two_of_four_with_as_clause [the_vector]
  (let [[x y :as all_in_vector] the_vector]
    (str "x is " x " y is " y " and all the entries total " (count all_in_vector)))
)
(deftest test-destructure_first_part_of_vector_with_as_clause
  (is (= "x is 1 y is 2 and all the entries total 4" (first_two_of_four_with_as_clause [1 2 3 4]))))
  
  
(defn test-all []
  (test-apply)
  (test-filter_and_fn_anonymous_function)
  (test-filter_and_hash_anonymous_function)
  (test-common-predicates)
  (test-overloaded-function)
  (test-variable-arity)
  (test-filter_and_fn_anonymous_function_with_let)
  (test-dynamically_created_functions)
  (test-destructuring_with_map)
  (test-destructure_first_part_of_vector)
  (test-destructure_last_part_of_vector)
  (test-destructure_first_part_of_vector_with_as_clause)
)

(defn -main [& args]
  (test-all)
)