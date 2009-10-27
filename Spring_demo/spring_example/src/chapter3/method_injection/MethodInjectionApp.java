package chapter3.method_injection;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Performer;

public class MethodInjectionApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter3/method_injection/injection.xml");
		
		Performer magician = (Performer)ctx.getBean("harry");
		magician.perform();
	}

}
