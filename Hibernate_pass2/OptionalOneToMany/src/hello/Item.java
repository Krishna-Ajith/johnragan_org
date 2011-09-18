package hello;

import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
public class Item {
	@Id @GeneratedValue
	@Column(name = "ITEM_ID")
	private Long id;

	@ManyToOne
	@JoinTable(
			name = "ITEM_BUYER",
			joinColumns = {@JoinColumn(name = "ITEM_ID")},
			inverseJoinColumns = {@JoinColumn(name = "USER_ID")})
	private User buyer;

@Column(name = "ITEM_NAME")
private String name;

Item() {}

Item(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

public void setUser(User user) {
	buyer = user;
}

public User getUser() {
	return buyer;
}

}
