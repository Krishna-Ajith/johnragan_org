package chapter2.factory_for_singleton;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FactoryApp {
	static public void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
		"chapter2/factory_for_singleton/factory.xml");
		
		Stage stage = (Stage) ctx.getBean("stage");
		stage.pullCurtain();
	}

}
