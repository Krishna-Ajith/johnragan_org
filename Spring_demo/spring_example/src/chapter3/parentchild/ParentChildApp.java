package chapter3.parentchild;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Performer;
import chapter2.springidol.Piano;

public class ParentChildApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter3/parentchild/parentchild.xml");
		
		Performer performer1 = (Performer) ctx.getBean("kenny");
		performer1.perform();
		Performer performer2 = (Performer) ctx.getBean("jimbob");
		performer2.perform();
		
		// Here we try two beans without a common super class that inherit from same abstract bean
		Performer performer3 = (Performer) ctx.getBean("taylor");
		performer3.perform();
		Piano piano = (Piano) ctx.getBean("singingPiano");
		piano.play();
	}

}
