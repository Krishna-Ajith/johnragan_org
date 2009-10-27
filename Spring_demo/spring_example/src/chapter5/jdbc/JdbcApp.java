package chapter5.jdbc;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class JdbcApp {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
			"chapter5/jdbc/jdbc.xml");

		JdbcRantDao jdbcRantDao = (JdbcRantDao) ctx.getBean("rantDao");
		jdbcRantDao.addDestinationl();
		
		long id = 3;
		jdbcRantDao.updateDestination(id);
		
		String token = jdbcRantDao.getDestinationToken(id);
		System.out.println(token);
		
		jdbcRantDao.deleteDestination(id);
	}

}
