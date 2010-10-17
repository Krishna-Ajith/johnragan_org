package hello;

import javax.persistence.*;

@Entity
@Table(name = "ADDRESSES")
public class Address {
	@Id @GeneratedValue
	@Column(name = "ADDRESS_ID")
	private Long id;
	@Column(name = "ADDRESS_STREET", nullable = false)
	private String street;
	@Column(name = "ADDRESS_ZIPCODE", nullable = false)
	private String zipcode;
	@Column(name = "ADDRESS_CITY", nullable = false)
	private String city;
	
	@OneToOne(mappedBy = "shippingAddress")
	private User user;
	
	public Address() {}
	public Address(String street, String city, String zipcode) {
		this.street = street;
		this.city = city;
		this.zipcode = zipcode;
	}
	public String getStreet() { return street; }
	public void setStreet(String street) { this.street = street; }
	public String getZipcode() { return zipcode; }
	public void setZipcode(String zipcode) {
	this.zipcode = zipcode; }
	public String getCity() { return city; }
	public void setCity(String city) { this.city = city; }
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}