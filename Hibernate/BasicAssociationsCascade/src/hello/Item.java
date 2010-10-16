package hello;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
public class Item {
	@Id @GeneratedValue
	@Column(name = "ITEM_ID")
	private Long id;
	
	@Column(name = "ITEM_NAME")
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

	@OneToMany(cascade = { CascadeType.ALL }, mappedBy = "item")
	private Set<Bid> bids = new HashSet();
	public void setBids(Set bids) {
	this.bids = bids;
	}
	public Set getBids() {
	return bids;
	}
	public void addBid(Bid bid) {
	bid.setItem(this);
	bids.add(bid);
	}
	}
