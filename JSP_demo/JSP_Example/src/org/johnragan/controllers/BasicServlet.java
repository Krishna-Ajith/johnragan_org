/**
 * 
 */
package org.johnragan.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author John
 *
 */
public class BasicServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		Integer count;
		long creationTime;
		long lastAccessedTime;
		int maxInactiveSeconds;
		String userNameFromCookie = "not found";
		
		String name = "Christine"; // request.getParameter("username");
		Cookie cookie = new Cookie("longtermusername", name);
		cookie.setMaxAge(45 * 60); // number of seconds, so 30 minutes
		response.addCookie(cookie);
		
		Cookie[] cookies = request.getCookies();
		for (int i = 0; i < cookies.length; i++) {
		     Cookie cookie2 = cookies[i];
		     if (cookie.getName().equals("longtermusername")) {
		          userNameFromCookie = cookie2.getValue();
		          break;
		     }
		}

		
		synchronized(session) {
			creationTime = session.getCreationTime();
			lastAccessedTime = session.getLastAccessedTime();
			maxInactiveSeconds = session.getMaxInactiveInterval();
			
			if (session.isNew()) {
				session.setAttribute("hitCount", (count = new Integer(1)));
			} else {
				count = (Integer)session.getAttribute("hitCount");
				count = count != null ? count : new Integer(1);
				count = new Integer(count.intValue() + 1);
				if (count.intValue() != 15) {
					session.setAttribute("hitCount", count);
				} else {
					session.invalidate();
				}
			}
		}
		PrintWriter out = response.getWriter();
		out.println(	"<html><body>" + 
						"<p>Have a nice day from a basic servlet!  count is :" + count + "</p>" +
						"<p>The session creation time is: " + new Date(creationTime) + ".</p>" +
						"<p>The session last accessed time is: " + new Date(lastAccessedTime) + ".</p>" +
						"<p>The session max inactive seconds: " + maxInactiveSeconds + ".</p>" +
						"<p>Long term user name from long term cookie is: " + userNameFromCookie + ".<p>" +
						"<p>Hit <a href=\"" + response.encodeURL("/foo/Basic/index.html") + "\">here</a> to return</p>" +
						"</body></html>");
	}
}