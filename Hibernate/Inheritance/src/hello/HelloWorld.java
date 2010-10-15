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
		}
		newTransaction.commit();
		newSession.close();
		
		// Third unit of work
		Session session3 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction tx3 = session3.beginTransaction();
		BusinessUser bUser = new BusinessUser();
		bUser.setName("Johnboy Business User");
		bUser.setZone("North America");
		Long bUserId = (Long) session3.save(bUser);
		tx3.commit();
		session3.close();
		
		// Fourth unit of work
		Session newSession4 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction4 = newSession4.beginTransaction();
		List bUsers =
			newSession4.createQuery("from BusinessUser u order by u.name asc").list();
		System.out.println( bUsers.size() +
			" Users(s) found:" );
		for ( Iterator iter = bUsers.iterator(); iter.hasNext(); ) {
			BusinessUser loadedBUser = (BusinessUser) iter.next();
			System.out.println( "User: " + loadedBUser.getName() );
			System.out.println( "Zone: " + loadedBUser.getZone() );
		}
		newTransaction4.commit();
		newSession4.close();
		
		// Fifth unit of work
		Session newSession5 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction5 = newSession5.beginTransaction();
		List users5 =
			newSession5.createQuery("from User u order by u.name asc").list();
		System.out.println( users5.size() +
			" Users(s) found:" );
		for ( Iterator iter = users5.iterator(); iter.hasNext(); ) {
			User loadedUser = (User) iter.next();
			System.out.println( "User: " + loadedUser.getName() );
		}
		newTransaction5.commit();
		newSession5.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
