package chapter2.initializing_dispose;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Performer;

public class InitDisposeApp {
	static public void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter2/initializing_dispose/init_dispose.xml");
		
		Performer performer1 = (Performer) ctx.getBean("kenny");
		performer1.perform();
	}
}

