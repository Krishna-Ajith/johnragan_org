package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
@org.hibernate.annotations.Cache(usage =
org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE
)
public class Item {
	@Id @GeneratedValue
	@Column(name = "ITEM_ID")
	private Long id;

	@ManyToMany
	@JoinTable(
	name = "ITEM_CATEGORY",
	joinColumns = {@JoinColumn(name = "ITEM_ID")},
	inverseJoinColumns = {@JoinColumn(name = "CATEGORY_ID")}
	)
	@org.hibernate.annotations.Cache(usage =
		org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE
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
	category.getItems().add(this);
}

public Set<Category> getCategories() {
	return categories;
}

}
