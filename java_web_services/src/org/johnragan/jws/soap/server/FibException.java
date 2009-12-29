package org.johnragan.jws.soap.server;

public class FibException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2723053155316279262L;
	private String details;
	public FibException(String reason, String details) {
		super(reason);
		this.details = details;
	}

	public String getFaultInfo() { return details; }
}
