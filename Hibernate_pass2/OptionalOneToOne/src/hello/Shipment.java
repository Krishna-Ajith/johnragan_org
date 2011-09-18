package hello;

import javax.persistence.*;

@Entity
@Table(name = "SHIPMENTS")
public class Shipment {
	@Id @GeneratedValue
	@Column(name = "SHIPMENT_ID")
	private Long id;
	@Column(name = "ADDRESS_STREET", nullable = false)
	private String street;
	@Column(name = "ADDRESS_ZIPCODE", nullable = false)
	private String zipcode;
	@Column(name = "ADDRESS_CITY", nullable = false)
	private String city;
	
	@OneToOne
	@JoinTable(
	name="ITEM_SHIPMENT",
	joinColumns = @JoinColumn(name = "SHIPMENT_ID"),
	inverseJoinColumns = @JoinColumn(name = "ITEM_ID")
	)
	private Item item;
	
	public Shipment() {}
	public Shipment(String street, String city, String zipcode) {
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
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
}