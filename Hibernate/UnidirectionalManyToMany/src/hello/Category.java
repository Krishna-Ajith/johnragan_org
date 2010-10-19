package hello;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORIES")
public class Category {
	@Id @GeneratedValue
	@Column(name = "CATEGORY_ID")
	private Long id;

@Column(name = "CATEGORY_NAME")
private String name;

Category() {}

Category(String name) {
	this.name = name;
}

public String getName() {
	return name;
}
}
