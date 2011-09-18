package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORIES")
public class Category {
	@SuppressWarnings("unused")
	@Id @GeneratedValue
	@Column(name = "CATEGORY_ID")
	private Long id;
	
	@ManyToMany(mappedBy = "categories")
	private Set<Item> items = new HashSet<Item>();

	@Column(name = "CATEGORY_NAME")
	private String name;

	Category() {}

	Category(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
	
	public void addItem(Item item) {
		items.add(item);
	}
	
	public Set<Item> getItems() {
		return items;
	}
}
