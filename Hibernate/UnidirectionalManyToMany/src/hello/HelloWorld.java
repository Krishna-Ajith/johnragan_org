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
		Item item1 = new Item("Book1");
		Item item2 = new Item("Book2");
		Item item3 = new Item("Book3");
		Category category1 = new Category("category 1");
		Category category2 = new Category("category 2");
		item1.addCategory(category1);
		item2.addCategory(category1);
		item3.addCategory(category1);
		item2.addCategory(category2);
		item3.addCategory(category2);
		Long itemId = (Long) session.save(item1);
		Long item2Id = (Long) session.save(item2);
		Long item3Id = (Long) session.save(item3);
		Long category1Id = (Long) session.save(category1);
		Long category2Id = (Long) session.save(category2);
		tx.commit();
		session.close();
		
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
			System.out.println("Item is: " + loadedItem.getName());
			for ( Iterator iterCategory = loadedItem.getCategories().iterator(); iterCategory.hasNext(); ) {
				Category loadedCategory = (Category) iterCategory.next();
				System.out.println("Category is: " + loadedCategory.getName());
			}
		}
		newTransaction3.commit();
		newSession3.close();
		
		// Shutting down the application
		HibernateUtil.shutdown();
	}
}
