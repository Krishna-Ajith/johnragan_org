package org.johnragan.jws.soap.server;

import javax.xml.ws.Endpoint;

public class RabbitCounterPublisher {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Endpoint.publish("http://127.0.0.1:8946/rc", new RabbitCounter());
	}
}
