package chapter4.classic_aspects;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import chapter2.springidol.Performer;

public class ClassicAspectApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter4/classic_aspects/classic.xml");

		Performer performer = (Performer) ctx.getBean("duke");
		performer.perform();
	}

}
