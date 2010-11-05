package org.johnragan;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class User {
	@Id @GeneratedValue
	@Column(name = "USER_ID")
	private Long id;

	@OneToOne
	@JoinColumn(name="SHIPPING_ADDRESS_ID")
	private Address shippingAddress;

@Column(name = "USER_NAME")
private String name;

User() {}

User(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

public void setAddress(Address address) {
	this.shippingAddress = address;
	this.shippingAddress.setUser(this);
}

public Address getAddress() {
	return shippingAddress;
}
}
