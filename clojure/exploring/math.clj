(ns exploring.math
  (:gen-class))
(use 'clojure.contrib.test-is)

(deftest test-numeric
  (is (= 56 56)))
  
(deftest test-basic-addition
  (is (= 7 (+ 3 4))))  

(deftest test-basic-subtraction
  (is (= 3 (- 7 4))))
  
(deftest test-basic-multiplication
  (is (= 12 (* 3 4))))  
  
(deftest test-basic-ratio
  (is (= 11/15 (/ 11 15)))) 
  
(deftest test-basic-division
  (is (= 3.25 (/ 13.0 4)))) 
  
(deftest test-multi-add
  (is (= 12 (+ 3 4 5))))
  
(deftest test-robust-defaults
  (is (= 0 (+))))  

; also supports >, < and <=
(deftest test-comparison
  (is (true? (>= 5 3))))  
  
(deftest test-quotient
  (is 3 (quot 14 4)))
  
(deftest test-remainder
  (is 2 (rem 14 4)))  
  
(defn test-all []
  (test-numeric)
  (test-basic-addition)
  (test-basic-subtraction)
  (test-basic-multiplication)
  (test-basic-ratio)
  (test-basic-division)
  (test-multi-add)
  (test-robust-defaults)
  (test-comparison)
  (test-quotient)
  (test-remainder))

(defn -main [& args]
  (test-all)
)