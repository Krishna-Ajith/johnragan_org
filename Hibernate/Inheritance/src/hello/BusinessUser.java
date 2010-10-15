package hello;

import javax.persistence.*;

@Entity
@DiscriminatorValue("BU")
public class BusinessUser extends User {
	
	@Column(name = "ZONE")
	private String zone;

	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	BusinessUser() {}
}
