package hello;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
@DiscriminatorValue("U")
public class User {
	@Id @GeneratedValue
	@Column(name = "USER_ID")
	private Long id;

@Column(name = "USER_NAME")
private String name;

User() {}

public void setName(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

}
