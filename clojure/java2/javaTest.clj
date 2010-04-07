(use 'clojure.contrib.test-is)

(deftest test-this
  (is (false? (invokeJavaStatic "   "))))