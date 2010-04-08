(ns exploring.readermacros
  (:gen-class))
(use 'clojure.contrib.test-is)
  
; a quote causes the list to be unevaluated - '(1 2 3) is an actual list only, not method 1 applied    
(deftest test-quote
  (is (= 1 (first '(1 20))))
  (is (= 20 (first (rest '(1 20)))))
)  
  
(defn test-all []
  (test-quote))

(defn -main [& args]
  (test-all)
)