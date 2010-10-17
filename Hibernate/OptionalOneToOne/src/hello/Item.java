package hello;

import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
public class Item {
	@Id @GeneratedValue
	@Column(name = "ITEM_ID")
	private Long id;

	@OneToOne
	@JoinColumn(name="SHIPMENT_ID")
	private Shipment shipment;

@Column(name = "ITEM_NAME")
private String name;

Item() {}

Item(String name) {
	this.name = name;
}

public String getName() {
	return name;
}

public void setShipment(Shipment shipment) {
	this.shipment = shipment;
	this.shipment.setItem(this);
}

public Shipment getShipment() {
	return shipment;
}
}
