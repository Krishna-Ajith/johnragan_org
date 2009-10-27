package org.johnragan.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author John
 *
 */
public class KnockKnock extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.println(
			"<html><body>" +
			"<p>Banana<br/>Banana Who?<br/>Banana Knock Knock...</p>" + 
			" </body></html>"
		);
	}
}
