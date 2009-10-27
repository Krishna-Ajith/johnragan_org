package chapter2.autowire.name;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Instrumentalist;

public class AutoWireByName {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
			"chapter2/autowire/name/name.xml");
		
		Instrumentalist instrumentalist = (Instrumentalist) ctx.getBean("kenny");
		instrumentalist.perform();
	}

}
