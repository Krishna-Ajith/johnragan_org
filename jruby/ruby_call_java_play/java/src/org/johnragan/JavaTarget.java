package org.johnragan;

import java.util.List;
import java.util.Arrays;

public class JavaTarget {
  private String message;
  
  public JavaTarget() {
    this("have a nice day");
  }
  
  public static void staticMethodGreeting(String message) {
    System.out.println(message);
  }
  
  public JavaTarget(String message) {
    this.message = message;
  }
  
  public void printMessage() {
    System.out.println(message);
  }
  
  public String toUpper(String lowerCase) {
    return lowerCase.toUpperCase();
  }
  
  public String[] arrayToUpper(String[] stringArray) {
    int length = stringArray.length;
    String[] targetArray = new String[length];
    for (int i = 0; i < length; ++i) {
      targetArray[i] = stringArray[i].toUpperCase();
    }
    
    return targetArray;
  }
  
  public List arrayToUpperAsList(String[] stringArray) {
    return Arrays.asList(arrayToUpper(stringArray));
  }
  
  public void variableArgsMethod(String... stringArguments) {
    for (String argument : stringArguments) {
      System.out.println(argument);
    }
  }
  
  public String overloadedMethod(String value) {
    return "overloadedMethod - String";
  }
  
  public String overloadedMethod(int value) {
    return "overloadedMethod - long";
  }
  
  public int howManyBitsNeeded(int i) {
    return 32;
  }
  
  public int howManyBitsNeeded(long i) {
    return 64;
  }
}