import java.io.*;

// Closeable interface
// void close() throws IOException

public class ExecuteAround {
	public static void main(String[] args) {
		try(BufferedReader reader = new BufferedReader(new FileReader("foo.in"))) {
			reader.readLine();
		} // close happens automatically here.
		catch (IOException e){}
	}
}