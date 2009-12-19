package org.johnragan.jws.basics;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style = Style.RPC)
public interface TimeServer {
	@WebMethod String getTimeAsString();
	@WebMethod long getTimeAsElapsed();
}
