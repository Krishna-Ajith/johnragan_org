(ns java2.javainteraction
  (:gen-class))
(use 'clojure.contrib.test-is)
      
; TODO - change to a different function to differentiate from Stu        
; invokes the Java static method Character.isWhiteSpace()
(defn invokeJavaStatic [s]
  (every? #(Character/isWhitespace %) s))
  

(deftest test-invokeJavaStatic
  (is (true? (invokeJavaStatic "    "))))
  
(deftest test-invokeRegularJavaMethod
  (is (= "FOO" (.toUpperCase "foo"))))  
  
(defn test-all []
  (test-invokeJavaStatic)
  (test-invokeRegularJavaMethod))

(defn -main [& args]
  (test-all)
)