package chapter3.setter_injection;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterInjectionApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter3/setter_injection/injection.xml");
		
		Instrumentalist3 performer = (Instrumentalist3)ctx.getBean("stevie");
		performer.perform();
	}

}
