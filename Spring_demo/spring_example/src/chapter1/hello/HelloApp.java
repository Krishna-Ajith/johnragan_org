package chapter1.hello;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.FileSystemResource;

public class HelloApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		BeanFactory factory =
			new XmlBeanFactory(new FileSystemResource("src/chapter1/hello/hello.xml"));

		GreetingService greetingService  =
			(GreetingService) factory.getBean("greetingService");
		
		greetingService.sayGreeting();
	}

}
