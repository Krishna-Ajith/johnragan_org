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
		Item item = new Item();
		item.setName("Hello Kitty");
		Bid bid1 = new Bid();
		Bid bid2 = new Bid();
		bid1.setDollars("40");
		bid2.setDollars("60");
		item.addBid(bid1);
		item.addBid(bid2);
		
		Long msgId = (Long) session.save(item);
		//session.save(bid1);
		//session.save(bid2);
		tx.commit();
		session.close();
		
		// Second unit of work
		Session newSession =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction = newSession.beginTransaction();
		List items =
			newSession.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() +
			" item(s) found:" );
		for ( Iterator iter = items.iterator(); iter.hasNext(); ) {
			Item loadedItem = (Item) iter.next();
			System.out.println( loadedItem.getName() );
			for ( Iterator bidsIter = loadedItem.getBids().iterator(); bidsIter.hasNext(); ) {
				Bid bid = (Bid)bidsIter.next();
				System.out.println("BID IN DOLLARS: " + bid.getDollars());
			}
		}
		newTransaction.commit();
		newSession.close();
		
		// Third unit of work
		Session newSession3 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction3 = newSession3.beginTransaction();
		List bids =
			newSession3.createQuery("from Bid b order by b.dollars asc").list();
		System.out.println( " bids(s) found:" + bids.size() );
		for ( Iterator iter = bids.iterator(); iter.hasNext(); ) {
			Bid loadedBid = (Bid) iter.next();
			System.out.println( "BID AMOUNT IS: " + loadedBid.getDollars() + " AND ITEM IS: " + loadedBid.getItem().getName() );
		}
		newTransaction3.commit();
		newSession3.close();
		
		// Fourth unit of work
		Session newSession4 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction4 = newSession4.beginTransaction();
		List items4 =
			newSession4.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() +
			" item(s) found:" );
		Item itemToDelete = (Item)items4.get(0);
		Bid bidChild = (Bid)itemToDelete.getBids().iterator().next();
		newSession4.delete(itemToDelete);
		System.out.println(bidChild.getDollars());
		// looks like you can resave a child that had a cascading delete
		//newSession4.save(bidChild);
		List bids4 =
			newSession4.createQuery("from Bid b order by b.dollars asc").list();
		System.out.println( " bids(s) found should be 0 after item delete:" + bids4.size());
		newTransaction4.commit();
		newSession4.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
