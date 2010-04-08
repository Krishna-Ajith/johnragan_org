(ns exploring.meta
  (:gen-class))
(use 'clojure.contrib.test-is)
    
(deftest test-class
  (is (= "class clojure.lang.Ratio" (str (class 14/3)))))
  
(defn test-all []
  (test-class))

(defn -main [& args]
  (test-all)
)