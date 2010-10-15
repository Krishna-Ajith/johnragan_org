package hello;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class User {
	@Id @GeneratedValue
	@Column(name = "USER_ID")
	private Long id;

	@Embedded
	@AttributeOverrides( {
	@AttributeOverride(name = "street",
	column = @Column(name="HOME_STREET") ),
	@AttributeOverride(name = "zipcode",
	column = @Column(name="HOME_ZIPCODE") ),
	@AttributeOverride(name = "city",
	column = @Column(name="HOME_CITY") )
	})
private Address homeAddress;

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
		this.homeAddress = address;
}

public Address getAddress() {
	return homeAddress;
}
}
