package org.johnragan.jws.brownbaglive.provider;

import javax.jws.WebMethod;
import javax.jws.WebService;

/**
 * Service Endpoint Interface (SEI)
 * @author John
 *
 */
@WebService
public interface TempConvert {
	@WebMethod 
	float c2f(float c);
	
	@WebMethod 
	float f2c(float f);
}

