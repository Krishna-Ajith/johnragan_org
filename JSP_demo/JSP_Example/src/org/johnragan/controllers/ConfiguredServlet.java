/**
 * 
 */
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
public class ConfiguredServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.println(
			"<html><body>" +
			
			"<p>Admin email address is " + 
			getServletConfig().getInitParameter("adminEmail") +
			" as configured in servlet's init-param and obtained from getServletConfig().getInitParameter().</p>" +
			
			"<p>The appWideSetting is " + 
			getServletContext().getInitParameter("appWideSetting") +
			" as configured in context-param and obtained from getServletContext().getInitParameter().</p>" +

			" </body></html>"
		);
	}
}