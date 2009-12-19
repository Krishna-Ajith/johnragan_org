package org.johnragan.jws.basics.clientwsdl;

import client.TimeServer;
import client.TimeServerImplService;

public class TimeClientWSDL {
	public static void main(String[] args) {
		TimeServerImplService service = new TimeServerImplService();
		TimeServer eif = service.getTimeServerImplPort();
		
		System.out.println(eif.getTimeAsString());
		System.out.println(eif.getTimeAsElapsed());
	}
}
