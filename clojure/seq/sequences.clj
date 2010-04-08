(ns seq.sequences
  (:gen-class))
(use 'clojure.contrib.test-is)
    
(deftest test-concat
  (is (= [1 2 3 4] (concat [1 2] [3 4]))))
  
  
(def presidents {:US "Obama" :France "Sarkozy"})  
(deftest test-Map
  (is (= "Obama" (:US presidents)))
  (is (= "Sarkozy" (presidents :France)))
)

; You don't actually have to provide all of these, but the specified ones will be indexed for faster reference
(defstruct movie :title :rating)
(def movie_last_night (struct movie "The Fabulous Mr Fox" "PG-13"))
(deftest test-defstruct
  (is (= "The Fabulous Mr Fox" (movie_last_night :title)))
)
(def another_movie (struct-map movie :review "Thumbs Up!" :title "Nowhere in Africa"))
(deftest test-struct-map
  (is (= "Nowhere in Africa" (:title another_movie)))
  (is (= "Thumbs Up!" (another_movie :review)))
  (is (= nil (another_movie :rating)))
)
  
(defn test-all []
  (test-concat)
  (test-Map)
  (test-defstruct)
  (test-struct-map))

(defn -main [& args]
  (test-all)
)