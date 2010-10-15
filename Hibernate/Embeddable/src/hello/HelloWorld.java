package hello;

import java.util.*;
import org.hibernate.*;
import persistence.*;

public class HelloWorld {
	public static void main(String[] args) {
		// First unit of work
		Session session =
			HibernateUtil.getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		User user = new User("Johnboy");
		Address address = new Address("43151 Huntsman Square", "Asburn", "20148");
		user.setAddress(address);
		Long userId = (Long) session.save(user);
		tx.commit();
		session.close();
		
		// Second unit of work
		Session newSession =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction = newSession.beginTransaction();
		List users =
			newSession.createQuery("from User u order by u.name asc").list();
		System.out.println( users.size() +
			" Users(s) found:" );
		for ( Iterator iter = users.iterator(); iter.hasNext(); ) {
			User loadedUser = (User) iter.next();
			System.out.println( "User: " + loadedUser.getName() );
			System.out.println( "Street: " + loadedUser.getAddress().getStreet());
			System.out.println( "City: " + loadedUser.getAddress().getCity());
			System.out.println( "Zipcode: " + loadedUser.getAddress().getZipcode());
		}
		newTransaction.commit();
		newSession.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
