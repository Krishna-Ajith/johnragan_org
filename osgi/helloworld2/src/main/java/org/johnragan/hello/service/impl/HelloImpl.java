package org.johnragan.hello.service.impl;

import org.johnragan.hello.service.HelloService;

public class HelloImpl implements HelloService {
  public String getHelloMessage() {
    return "Bonjour!" ;
    }
    
    public String getGoodbyeMessage() {
      return "Arrivederci!" ;
    }
}