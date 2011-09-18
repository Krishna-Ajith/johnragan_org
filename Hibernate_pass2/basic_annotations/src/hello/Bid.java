package hello;

import javax.persistence.*;

@Entity
@Table(name = "BIDS")
public class Bid {
	@SuppressWarnings("unused")
	@Id @GeneratedValue
	@Column(name = "BID_ID")
	private Long id;
	
	@Column(name = "DOLLARS_BID")
	private String dollars;
	public String getDollars() {
		return dollars;
	}
	public void setDollars(String dollars) {
		this.dollars = dollars;
	}
	
	@ManyToOne( targetEntity = hello.Item.class )
	@JoinColumn(name = "ITEM_ID", nullable = false)
	private Item item;
	public void setItem(Item item) {
		this.item = item;
	}
	public Item getItem() {
		return item;
	}
}
