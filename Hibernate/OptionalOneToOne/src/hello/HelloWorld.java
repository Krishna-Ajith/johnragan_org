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
		Item item = new Item("Vase");
		Item item2 = new Item("Lamp");
		Shipment shipment = new Shipment("43151 Huntsman Square", "Asburn", "20148");
		item.setShipment(shipment);
		Long itemId = (Long) session.save(item);
		Long item2Id = (Long) session.save(item2);
		Long shipmentId = (Long) session.save(shipment);
		tx.commit();
		session.close();
		
		// Second unit of work
		Session newSession =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction = newSession.beginTransaction();
		List items =
			newSession.createQuery("from Item i order by i.name asc").list();
		System.out.println( items.size() +
			" Item(s) found:" );
		for ( Iterator iter = items.iterator(); iter.hasNext(); ) {
			Item loadedItem = (Item) iter.next();
			System.out.println( "Item: " + loadedItem.getName() );
			if (loadedItem.getShipment() != null) {
				System.out.println( "Shipment Street: " + loadedItem.getShipment().getStreet());
				System.out.println( "Shipment City: " + loadedItem.getShipment().getCity());
				System.out.println( "Shipment Zipcode: " + loadedItem.getShipment().getZipcode());
			}
		}
		newTransaction.commit();
		newSession.close();
		
		// Third unit of work
		Session newSession3 =
			HibernateUtil.getSessionFactory().openSession();
		Transaction newTransaction3 = newSession3.beginTransaction();
		List shipments3 =
			newSession3.createQuery("from Shipment s").list();
		System.out.println( shipments3.size() +
			" Shipment(s) found:" );
		for ( Iterator iter = shipments3.iterator(); iter.hasNext(); ) {
			Shipment loadedShipment = (Shipment) iter.next();
			System.out.println( "Item: " + loadedShipment.getItem().getName() );
			System.out.println( "Shipment Street: " + loadedShipment.getStreet());
			System.out.println( "Shipment City: " + loadedShipment.getCity());
			System.out.println( "Shipment Zipcode: " + loadedShipment.getZipcode());
		}
		newTransaction3.commit();
		newSession3.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
