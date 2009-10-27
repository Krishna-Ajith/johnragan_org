package chapter2.springidol;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringIdolApp {
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
			"chapter2/springidol/spring-idol.xml");
	
		System.out.println("FIRST THE REGULAR JUGGLER");
		
		Performer performer = (Performer) ctx.getBean("duke");
		performer.perform();
		
		System.out.println("THEN THE POETIC JUGGLER");
	
		Performer performer2 = (Performer) ctx.getBean("duke2");
		performer2.perform();
		
		System.out.println("NOW WE WILL HEAR FROM THE INSTRUMENTALIST:");
		
		Performer instrumentalist = (Performer) ctx.getBean("kenny");
		instrumentalist.perform();
		
		System.out.println("NOW WE WILL HEAR FROM THE HYGENIC INSTRUMENTALIST:");
		
		Performer instrumentalist2 = (Performer) ctx.getBean("kenny2");
		instrumentalist2.perform();
		
		System.out.println("NOW WE WILL HEAR FROM ANOTHER HYGENIC INSTRUMENTALIST USING CONSTRUCTOR");
		
		Performer instrumentalist3 = (Performer) ctx.getBean("kenny3");
		instrumentalist3.perform();
	}
}
