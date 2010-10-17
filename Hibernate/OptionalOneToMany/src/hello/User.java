package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class User {
	@Id @GeneratedValue
	@Column(name = "USER_ID")
	private Long id;

	@OneToMany(mappedBy = "buyer")
	private Set<Item> boughtItems = new HashSet<Item>();

@Column(name = "USER_NAME")
private String name;

User() {}

User(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

public void addItem(Item item) {
	boughtItems.add(item);
	item.setUser(this);
}

public Set<Item> getItems() {
	return boughtItems;
}
}
