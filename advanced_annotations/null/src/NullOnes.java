// ~/utils/checker-framework/checkers/binary/javac -version -classpath . -Xbootclasspath/p:/utils/checker-framework/checkers/jdk/jdk.jar NullOnes.java

import checkers.nullness.quals.*;

public class NullOnes {
	//@NonNull private String count = null;
	
	@LazyNonNull private String lazy = null;
	private String lazy2;
	
	public void update() {
		lazy = "lazy";
		//lazy = null;
	}
	
	public void setLazy(@NonNull String lazy) {
		this.lazy = lazy;
	}
	
	@NonNullOnEntry("lazy2")
	public void methodWithPrecondition(String param) {
		
	}
	
	@AssertNonNullAfter("lazy2")
	// @AssertNonNullIfTrue(<boolean expression>)
	// @AssertNonNullIfFalse(<boolean expression>)
	public void methodWithPostCondition() {
		//this.lazy2 = null;
	}
	
	public void setupPrecondition() {
		//lazy2 = null;
		methodWithPrecondition("foo");
		methodWithPostCondition();
	}
	
	public static void main(String[] args) {
		NullOnes nullOnes = new NullOnes();
		//String foo = null;
		//nullOnes.setLazy(foo);
		
		//nullOnes.setLazy(null);
	}
}
