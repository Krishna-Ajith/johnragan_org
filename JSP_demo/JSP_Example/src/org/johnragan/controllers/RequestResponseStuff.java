/**
 * 
 */
package org.johnragan.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author John
 *
 */
public class RequestResponseStuff extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String color = request.getParameter("color");
		String[] sizes = request.getParameterValues("sizes");
		String userAgent = request.getHeader("User-Agent");
		String theMethod = request.getMethod();
		InputStream rawContentIS = request.getInputStream();
		int sizeGuess = rawContentIS.available();
		String rawContent = convertStreamToString(rawContentIS);
		rawContentIS.close();

		PrintWriter out = response.getWriter();
		out.println(
			"<html><body>" +
			"<p>color is: " + color + "</p>" +
			"<p>userAgent is: " + userAgent + "</p>" +
			"<p>the HTTP method is: " + theMethod + "</p>" +
			"<p>An estimate of the raw content size is: " + sizeGuess + "</p>" +
			"<p>The raw content is as follows:</p>" +
			"<p>" + rawContent + "</p>");
		
		out.println("<p>sizes are: </p><ul>");
		for (int i = 0; i < sizes.length; ++i) {
			out.println("<li>" + sizes[i] + "</li>");
		}
		out.println("</ul>");	
			
		out.println("<p>RequestResponseStuff was invoked</p>" +
			" </body></html>"
		);
	}
	
	private String convertStreamToString(InputStream is) {
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder sb = new StringBuilder();
		
		String line = null;
		try {
			while ((line = reader.readLine()) != null) {
		       sb.append(line + "\n");
		    }
		} catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
               is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
 
        return sb.toString();
    }
}