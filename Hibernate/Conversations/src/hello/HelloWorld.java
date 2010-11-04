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
		User user = new User("Johnboy", "Gold");
		Long userId = (Long) session.save(user);
		tx.commit();
		session.close();
		
		// Since detached, it will not persist and show platinum in step 2.
		user.setMembershipLevel("Platinum");
		
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
			System.out.println( "User: " + loadedUser.getName() + ", level: " + loadedUser.getMembershipLevel() );
		}
		newTransaction.commit();
		newSession.close();
		
		// Third unit of work
		Session session3 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction tx3 = session3.beginTransaction();
		
		// WITHOUT UPDATE, IT WILL ADD THIS AS A SEPARATE USER
		session3.update(user);
		session3.save(user);
		tx3.commit();
		session3.close();
		
		// Fourth unit of work
		Session newSession4 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction4 = newSession4.beginTransaction();
		List users4 =
			newSession4.createQuery("from User u order by u.name asc").list();
		System.out.println( users4.size() +
			" Users(s) found:" );
		for ( Iterator iter = users4.iterator(); iter.hasNext(); ) {
			User loadedUser = (User) iter.next();
			System.out.println( "User: " + loadedUser.getName() + ", level: " + loadedUser.getMembershipLevel() );
		}
		newTransaction4.commit();
		newSession4.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
