package org.johnragan.hello;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.johnragan.hello.service.HelloService;

public class HelloWorld implements BundleActivator {
  public void start(BundleContext context) throws Exception {
    HelloService helloService = getHelloService(context);
    System.out.println(helloService.getHelloMessage());
  }
    
  public void stop(BundleContext context) throws Exception {
    HelloService helloService = getHelloService(context);
    System.out.println(helloService.getGoodbyeMessage());
  }

  private HelloService getHelloService(BundleContext context) {
    ServiceReference ref = context.getServiceReference(HelloService.class.getName());
    HelloService helloService = (HelloService) context.getService(ref);
    return helloService;
  }
}