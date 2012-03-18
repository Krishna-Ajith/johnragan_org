// Compile separately and then run the code in Java 6 and Java 7:
// C:\programs\Java\jdk1.6.0_17\bin>java -verbose:gc Sample


public class Sample {
  
	private int[] values = new int[1000000];
  
	private static int count;

  

	public Sample() {
    
		count++;
  
	}

  

	public static void main(String[] args) {
    
		for (int i = 0; i < 10000; i++) {
      
			new Sample();
    
		}

    
		System.out.println(Sample.count);
  
	}

}
