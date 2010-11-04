package hello;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class User {
	@Id @GeneratedValue
	@Column(name = "USER_ID")
	private Long id;

	@Column(name = "MEMBERSHIP_LEVEL")
	private String membershipLevel;
	
	@Column(name = "USER_NAME")
	private String name;

	public String getMembershipLevel() {
		return membershipLevel;
	}

	public void setMembershipLevel(String membershipLevel) {
		this.membershipLevel = membershipLevel;
	}

	User() {}

	User(String name, String membershipLevel) {
		this.name = name;
		this.membershipLevel = membershipLevel;
	}

	public String getName() {
		return name;
	}
}
