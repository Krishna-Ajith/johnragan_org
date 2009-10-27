package chapter1.knight;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.FileSystemResource;

import chapter1.knight.Knight;

public class KnightApp {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		BeanFactory factory =
			new XmlBeanFactory(new FileSystemResource("src/chapter1/knight/knight.xml"));

		Knight knight =
			(Knight) factory.getBean("knight");
		
		knight.embarkOnQuest();
	}

}
