package hello;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.persistence.*;

import org.hibernate.annotations.CollectionId;

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

@org.hibernate.annotations.CollectionOfElements(
		targetElement = java.lang.String.class)
@JoinTable(
		name = "FRIEND_NAMES",
		joinColumns = @JoinColumn(name = "USER_ID"))
@Column(name = "NAME", nullable = false)
private Set<String> friendNames = new HashSet<String>();

public void addFriendName(String friendName) {
	friendNames.add(friendName);
}

public Set<String> getFriendNames() {
	return friendNames;
}

@org.hibernate.annotations.CollectionOfElements
@JoinTable(
		name = "JOB_HISTORY",
		joinColumns = @JoinColumn(name = "USER_ID"))
@org.hibernate.annotations.IndexColumn(
		name="POSITION", base = 1)
@Column(name = "JOB")
private List<String> jobs = new ArrayList<String>();

public void addJob(String job) {
	jobs.add(job);
}

public List<String> getJobs() {
	return jobs;
}

@org.hibernate.annotations.CollectionOfElements
@JoinTable(
		name = "SIBLINGS",
		joinColumns = @JoinColumn(name = "USER_ID"))
@org.hibernate.annotations.MapKey(
		columns = @Column(name="SIBLING"))
@Column(name = "BIRTHDAY")
private Map<String, String> siblingBirthdays = new HashMap<String, String>();

public void addSiblingBirthday(String sibling, String birthday) {
	siblingBirthdays.put(sibling, birthday);
}

public Map<String, String> getSiblingBirthdays() {
	return siblingBirthdays;
}

@org.hibernate.annotations.CollectionOfElements
@JoinTable(
		name = "SIBLINGS_ORDERED",
		joinColumns = @JoinColumn(name = "USER_ID"))
@org.hibernate.annotations.MapKey(
		columns = @Column(name="SIBLING"))
@Column(name = "BIRTHDAY")
private Map<String, String> orderedSiblingBirthdays = new TreeMap<String, String>();

public void addOrderedSiblingBirthday(String sibling, String birthday) {
	orderedSiblingBirthdays.put(sibling, birthday);
}

public Map<String, String> getOrderedSiblingBirthdays() {
	return orderedSiblingBirthdays;
}

@org.hibernate.annotations.CollectionOfElements
@JoinTable(
		name = "BANDS_ORDERED",
		joinColumns = @JoinColumn(name = "USER_ID"))
@Column(name = "BAND_NAME", nullable = false)
@org.hibernate.annotations.Sort(
		type = org.hibernate.annotations.SortType.NATURAL)
private SortedSet<String> bands = new TreeSet<String>();

public void addBand(String band) {
	bands.add(band);
}

public SortedSet<String> getBands() {
	return bands;
}

@org.hibernate.annotations.CollectionOfElements
@JoinTable(
		name = "ADDRESSES",
		joinColumns = @JoinColumn(name = "USER_ID"))
@CollectionId(
		columns = @Column(name = "ADDRESS_ID"),
		type = @org.hibernate.annotations.Type(type = "long"),
		generator = "sequence")
private Set<Address> addresses = new HashSet<Address>();

public void addAddress(Address address) {
	addresses.add(address);
}

public Set<Address> getAddresses() {
	return addresses;
}

@Embedded
@AttributeOverrides( {
	@AttributeOverride(name = "street",column = @Column(name="HOME_STREET") ),
	@AttributeOverride(name = "city",column = @Column(name="HOME_CITY") ),
	@AttributeOverride(name = "zipcode",column = @Column(name="HOME_ZIPCODE") )
})
private Address homeAddress;

public void setHomeAddress(Address address) {
	homeAddress = address;
}

public Address getHomeAddress() {
	return homeAddress;
}
}
