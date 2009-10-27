package chapter2.prototype;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Instrumentalist;
import chapter2.springidol.Performer;

public class PrototypeApp {
	static public void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter2/prototype/prototype.xml");
		
		Performer performer1 = (Performer) ctx.getBean("kenny");
		performer1.perform();
		Performer performer2 = (Performer) ctx.getBean("jimbob");
		performer2.perform();
		System.out.println("THE FOLLOWING TWO SHOULD NOT BE EQUAL VALUES (TO DEMONSTRATE PROTOTYPE UNIQUENESS)");
		System.out.println(((Instrumentalist)performer1).getInstrument());
		System.out.println(((Instrumentalist)performer2).getInstrument());
	}

}
