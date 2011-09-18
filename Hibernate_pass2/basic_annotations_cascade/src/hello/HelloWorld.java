package hello;

import java.util.*;
import org.hibernate.*;
import persistence.*;

public class HelloWorld {
	Session session;
	
	public HelloWorld() {
		session = HibernateUtil.getSessionFactory().openSession();
	}
	
	public void executeExample() {
		workUnit1();
		workUnit2();
		workUnit3();
		workUnit4();
		shutdown();
	}
	
	private void workUnit1() {
		// First unit of work
		Transaction tx = session.beginTransaction();
		Item item = new Item();
		item.setName("Hello Kitty");
		Bid bid1 = new Bid();
		Bid bid2 = new Bid();
		bid1.setDollars("40");
		bid2.setDollars("60");
		item.addBid(bid1);
		item.addBid(bid2);
		
		@SuppressWarnings("unused")
		Long msgId = (Long) session.save(item);
		//session.save(bid1);
		//session.save(bid2);
		tx.commit();
	}
	
	private void workUnit2() {
		// Second unit of work
		Transaction newTransaction = session.beginTransaction();
		List items = session.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() + " item(s) found:" );
		for (Object objItem : items) {
			Item loadedItem = (Item) objItem;
			System.out.println( loadedItem.getName() );
			for (Object objBid : loadedItem.getBids()) {
				Bid bid = (Bid)objBid;
				System.out.println("BID IN DOLLARS: " + bid.getDollars());
			}
		}
		newTransaction.commit();
	}

	private void workUnit3() {
		// Third unit of work
		Transaction newTransaction3 = session.beginTransaction();
		List bids =
			session.createQuery("from Bid b order by b.dollars asc").list();
		System.out.println( bids.size() +
			" bids(s) found:" );
		for ( Object objBid : bids ) {
			Bid loadedBid = (Bid) objBid;
			System.out.println( "BID AMOUNT IS: " + loadedBid.getDollars() + " AND ITEM IS: " + loadedBid.getItem().getName() );
		}
		newTransaction3.commit();
	}
	
	private void workUnit4() {
		// Fourth unit of work
		Transaction newTransaction = session.beginTransaction();
		List items = session.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() + " item(s) found:" );
		for (Object objItem : items) {
			Item loadedItem = (Item) objItem;
			session.delete(loadedItem);
		}
		newTransaction.commit();
	}
	
	private void shutdown() {
		session.close();
		// Shutting down the application
		HibernateUtil.shutdown();
	}
	
	public static void main(String[] args) {
		HelloWorld helloWorld = new HelloWorld();
		helloWorld.executeExample();
	}
}
