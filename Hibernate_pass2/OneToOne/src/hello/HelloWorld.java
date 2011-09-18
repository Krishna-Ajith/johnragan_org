package hello;

import java.util.*;
import org.hibernate.*;
import persistence.*;

public class HelloWorld {
	public static void main(String[] args) {
		Session session =
			HibernateUtil.getSessionFactory().openSession();
		
		// First unit of work
		Transaction tx = session.beginTransaction();
		User user = new User("Johnboy");
		User user2 = new User("Mary Ellen");
		Address address = new Address("43151 Huntsman Square", "Asburn", "20148");
		user.setAddress(address);
		Long userId = (Long) session.save(user);
		Long addressId = (Long) session.save(address);
		tx.commit();
		
		// Second unit of work
		Transaction newTransaction = session.beginTransaction();
		List users =
			session.createQuery("from User u order by u.name asc").list();
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
		
		// Third unit of work
		Transaction newTransaction3 = session.beginTransaction();
		List addresses3 =
			session.createQuery("from Address a").list();
		System.out.println( addresses3.size() +
			" Address(es) found:" );
		for ( Iterator iter = addresses3.iterator(); iter.hasNext(); ) {
			Address loadedAddress = (Address) iter.next();
			System.out.println( "User: " + loadedAddress.getUser().getName() );
			System.out.println( "Street: " + loadedAddress.getStreet());
			System.out.println( "City: " + loadedAddress.getCity());
			System.out.println( "Zipcode: " + loadedAddress.getZipcode());
		}
		newTransaction3.commit();
		
		// Shutting down the application
		session.close();
		HibernateUtil.shutdown();
	}
}
