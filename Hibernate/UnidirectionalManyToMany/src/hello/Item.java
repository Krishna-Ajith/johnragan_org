package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
public class Item {
	@Id @GeneratedValue
	@Column(name = "ITEM_ID")
	private Long id;

	@ManyToMany
	@JoinTable(
	name = "CATEGORY_ITEM",
	joinColumns = {@JoinColumn(name = "CATEGORY_ID")},
	inverseJoinColumns = {@JoinColumn(name = "ITEM_ID")}
	)
	private Set<Category> categories = new HashSet<Category>();

@Column(name = "ITEM_NAME")
private String name;

Item() {}

Item(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

public void addCategory(Category category) {
	categories.add(category);
}

public Set<Category> getCategories() {
	return categories;
}

}
