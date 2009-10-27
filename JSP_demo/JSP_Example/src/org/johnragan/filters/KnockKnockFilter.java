package org.johnragan.filters;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

// http://localhost:8080/foo/KnockKnock/index.html?knockknock=whoisthere

public class KnockKnockFilter implements Filter {  // Must implement this interface
    private FilterConfig fc;

    public void init(FilterConfig config) throws ServletException {
         this.fc = config; // Usually you just save the config object, but method must be provided
    }

    public void doFilter(  ServletRequest request,
                                  ServletResponse response,
                                  FilterChain chain)
              throws ServletException, IOException {

         HttpServletRequest httpRequest = (HttpServletRequest) request;
         String name = httpRequest.getRemoteUser();
         if (name != null) {
              fc.getServletContext().log("User " + name + "is updating");
         }
 		 
 		String knockKnock = request.getParameter("knockknock");
 		if (knockKnock != null && knockKnock.equals("whoisthere")) {
 			chain.doFilter(request, response); // this is how the next filter in the chain gets called
 		} else {
 			PrintWriter out = response.getWriter();
 	 		 out.println(
 	 			"<html><body>" +
 	 			"<p>You are supposed to say:  'whoisthere'!</p>" +
 	 			"<p>knockknock is " + knockKnock + "</p>" +
 	 			" </body></html>"
 	 		);
 		}
    }

    public void destroy() {
         // do cleanup stuff, but usually empty
    }
}