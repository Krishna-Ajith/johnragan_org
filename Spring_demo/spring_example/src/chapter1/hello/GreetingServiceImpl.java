package chapter1.hello;

public class GreetingServiceImpl implements GreetingService {
	private String greeting;
	private String person;
	
	public GreetingServiceImpl() {}
	public GreetingServiceImpl(String person) {
		this.person = person;
	}

	@Override
	public void sayGreeting() {
		System.out.println(greeting + " " + person);
	}
	
	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}
	
	public void setPerson(String person) {
		this.person = person;
	}
}
