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
		Item item1 = new Item("Vase");
		Item item2 = new Item("Lamp");
		Item item3 = new Item("Accordian");
		User userBuyer = new User("johnboy");
		User userCheapSkate = new User("johnny cheapskate");
		item1.setUser(userBuyer);
		item2.setUser(userBuyer);
		item3.setUser(userBuyer);
		Long itemId = (Long) session.save(item1);
		Long item2Id = (Long) session.save(item2);
		Long item3Id = (Long) session.save(item3);
		Long UserBuyerId = (Long) session.save(userBuyer);
		Long UserCheapSkateId = (Long) session.save(userCheapSkate);
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
			for ( Iterator iterItems = loadedUser.getItems().iterator(); iterItems.hasNext(); ) {
				Item item = (Item) iterItems.next();
				System.out.println("Item bought: " + item.getName());
			}
		}
		newTransaction.commit();
		newSession.close();
		
		// Third unit of work
		Session newSession3 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction3 = newSession3.beginTransaction();
		List items =
			newSession3.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() +
			" Items(s) found:" );
		for ( Iterator iter = items.iterator(); iter.hasNext(); ) {
			Item loadedItem = (Item) iter.next();
			System.out.println( "Item: " + loadedItem.getName() );
			System.out.println("Items buyer: " + loadedItem.getUser().getName());
		}
		newTransaction3.commit();
		newSession3.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
