package org.johnragan.jws.soap.client;

import org.johnragan.jws.soap.client.wsimport.RabbitCounter;
import org.johnragan.jws.soap.client.wsimport.RabbitCounterService;

public class CountRabbitsClient {
	public static void main(String[] args) {
		RabbitCounterService service = new RabbitCounterService();
		RabbitCounter port = service.getRabbitCounterPort();
		try {
			// TRY GOING NEGATIVE TO GENERATE AND SHOW THE FAULT CODE
			int n = 45;
			System.out.println("fib(" + n + ") = " + port.countRabbits(n));
		}
		catch(Exception e) { System.err.println(e); }
	}
}
