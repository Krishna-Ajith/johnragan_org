package chapter2.collections;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CollectionApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
			"chapter2/collections/collections.xml");
		
		CollectionContainer container = (CollectionContainer) ctx.getBean("collection-container");
		container.showCollections();
	}

}
