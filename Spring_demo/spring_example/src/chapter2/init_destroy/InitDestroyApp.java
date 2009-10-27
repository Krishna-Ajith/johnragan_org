package chapter2.init_destroy;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Performer;

public class InitDestroyApp {
	static public void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter2/init_destroy/init_destroy.xml");
		
		Performer performer1 = (Performer) ctx.getBean("kenny");
		performer1.perform();
	}
}
