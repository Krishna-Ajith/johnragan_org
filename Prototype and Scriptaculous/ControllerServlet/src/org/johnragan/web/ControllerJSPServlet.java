package org.johnragan.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ControllerJSPServlet extends HttpServlet {
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {

		// response.setContentType("text/html");
		// PrintWriter out = response.getWriter();
		// out.println("Beer Selection Advice<br>");
		String c = request.getParameter("color");
		// out.println("<br>Got beer color " + c);

		String result = c;
		request.setAttribute("styles", result);

		RequestDispatcher view = request.getRequestDispatcher("result.jsp");

		view.forward(request, response);
	}
}
