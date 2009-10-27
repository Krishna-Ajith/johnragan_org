/**
 * 
 */
package org.johnragan.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.johnragan.business.BusinessObject;

/**
 * @author John
 *
 */
public class ExpressionLanguage extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("request_attr", "a request attribute");
		
		BusinessObject bo = new BusinessObject();
		bo.setFoo("bar");
		request.setAttribute("businessObject", bo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("ChristineKey", "ChristineValue");
		request.setAttribute("girlMap", map);
		
		List<String> list = new ArrayList<String>();
		list.add("Stockings");
		list.add("Boots");
		request.setAttribute("victoriaList", list);
		
		String[] stringArray = { "dogs", "cats" };
		request.setAttribute("animalArray", stringArray);
		
		//pageContext.setAttribute("pageContext_attr", "a pageContext attribute");
		
		HttpSession session = request.getSession();
		synchronized(session) {
			session.setAttribute("session_attr", "a session attribute");
		}
		
		ServletContext ctx = this.getServletContext();
		synchronized(ctx) {
        	ctx.setAttribute("context_attr", "a context attribute");
		}
		
		Cookie c = new Cookie("badsalsa","mike");
		response.addCookie(c);

		RequestDispatcher view = request.getRequestDispatcher("/WEB-INF/ExpressionLanguage.jsp");
		view.forward(request, response);
	}
}