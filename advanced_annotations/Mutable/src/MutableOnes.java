// ~/utils/checker-framework/checkers/binary/javac -version -classpath . -Xbootclasspath/p:/utils/checker-framework/checkers/jdk/jdk.jar NullOnes.java

import checkers.igj.quals.*;

@I
public class MutableOnes {
	@Immutable
	class Foo {
		public String aField;
		
		public Foo() {
			aField = "old";
		}
	}
	
	class Bar {
		public String aField;
		
		public Bar() {
			aField = "old";
		}
	}
	
	private Bar immutableField = new Bar();
	
	public MutableOnes() {
		Foo foo = new Foo();
		//foo.aField = "new";
		//immutableField = new Bar();
	}
	
	public void sideEffect() {
		sideEffect2(immutableField);
	}
	
	public void sideEffect2(@ReadOnly Bar theBar) {
		//theBar.aField = "new2";
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MutableOnes m = new MutableOnes();
		m.sideEffect();

	}
}
