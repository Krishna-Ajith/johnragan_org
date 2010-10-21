package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORIES")
@org.hibernate.annotations.Cache(usage =
org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE
)
public class Category {
	@Id @GeneratedValue
	@Column(name = "CATEGORY_ID")
	private Long id;
	
	@ManyToMany(mappedBy = "categories")
	@org.hibernate.annotations.Cache(usage =
		org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE
	)
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
