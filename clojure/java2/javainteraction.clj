(ns java2.javainteraction
  (:gen-class))
        
; invokes the Java static method Character.isWhiteSpace()
; TODO - change to a different function to differentiate from Stu

(defn invokeJavaStatic [s]
  (every? #(Character/isWhitespace %) s))
  
(use 'clojure.contrib.test-is)

(deftest test-this
  (is (false? (invokeJavaStatic "   "))))
  
(defn test-all []
  (test-this))

  (defn -main [& args]
    (test-all)
  )
