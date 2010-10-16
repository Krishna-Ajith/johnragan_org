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
		User user = new User();
		
		user.setName("Johnboy");
		
		// Set
		user.addFriendName("Peter");
		user.addFriendName("Paul");
		user.addFriendName("Mary");
		
		// List
		user.addJob("Borland");
		user.addJob("IBM");
		user.addJob("Novell");
		
		// Map
		user.addSiblingBirthday("Raleigh", "1965");
		user.addSiblingBirthday("Diana", "1966");
		user.addSiblingBirthday("Mike", "1968");
		user.addSiblingBirthday("Laurie", "1970");
		
		// Ordered Set
		user.addBand("U2");
		user.addBand("Snow Patrol");
		user.addBand("Rage Against the Machine");
		
		// AddressEntities
		Address homeAddress = new Address();
		homeAddress.setStreet("43151 Huntsman Square");
		homeAddress.setCity("Ashburn");
		homeAddress.setZipcode("20147");
		user.addAddress(homeAddress);
		
		Address workAddress = new Address();
		workAddress.setStreet("2418 Tolomac");
		workAddress.setCity("Vienna");
		workAddress.setZipcode("22181");
		user.addAddress(workAddress);
		
		
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
			
			for ( Iterator names = loadedUser.getFriendNames().iterator(); names.hasNext(); ) {
				String friendName = (String) names.next();
				System.out.println( "FRIEND NAME: " + friendName );
			}
			
			List<String> jobs = loadedUser.getJobs();
			for (int i = 0; i < jobs.size(); ++i) {
				System.out.println( "JOB: " + jobs.get(i));
			}
			
			Map<String, String> siblingBirthdays = loadedUser.getSiblingBirthdays();
			for ( Iterator siblingKeys = siblingBirthdays.keySet().iterator(); siblingKeys.hasNext(); ) {
				String key = (String)siblingKeys.next();
				System.out.println("SIBLING: " + key +
						" BIRTHDAY: " + siblingBirthdays.get(key));
			}
			
			for ( Iterator bands = loadedUser.getBands().iterator(); bands.hasNext(); ) {
				String bandName = (String) bands.next();
				System.out.println( "ORDERED BAND NAME: " + bandName );
			}
			
			for ( Iterator addresses = loadedUser.getAddresses().iterator(); addresses.hasNext(); ) {
				Address address = (Address) addresses.next();
				System.out.println( "ADDRESS, STREET: " + address.getStreet() +
									" CITY: " + address.getCity() + " ZIPCODE: " + address.getZipcode());
			}
		}
		newTransaction.commit();
		newSession.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
