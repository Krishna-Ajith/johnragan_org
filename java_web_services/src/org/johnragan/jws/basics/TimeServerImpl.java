package org.johnragan.jws.basics;

import java.util.Date;

import javax.jws.WebService;

@WebService(endpointInterface = "org.johnragan.jws.basics.TimeServer")
public class TimeServerImpl implements TimeServer {

	@Override
	public long getTimeAsElapsed() {
		return new Date().getTime();
	}

	@Override
	public String getTimeAsString() {
		return new Date().toString();
	}

}
