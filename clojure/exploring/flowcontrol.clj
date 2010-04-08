(ns exploring.flowcontrol
  (:gen-class))
(use 'clojure.contrib.test-is)

; Only false and nil are false; all else is true        
(deftest test-emptyListTrue
  (is (= "empty list true" (if () "empty list true" "empty list false"))))
  
(deftest test-0True
  (is (= "0 true" (if 0 "0 true" "0 false")))) 
  
(defn test-all []
  (test-emptyListTrue)
  (test-0True)
)

(defn -main [& args]
  (test-all)
)