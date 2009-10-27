<%!
	public void jspInit() {
		// Still not working.  See this article:  http://www.coderanch.com/t/172978/Web-Component-Certification-SCWCD/certification/Getting-Junk-Values-While-overridding
		// I don't know how to set a url-pattern for a JSP
		String userName = getServletConfig().getInitParameter("userName");
		ServletContext ctx = getServletContext();
		synchronized(ctx) {
			ctx.setAttribute("userName", null); // You have to use applicationContext to get these into the system.
		}
	}
%>

<html>
<body>
	<%@ include file="headers/static_header.html" %>
	<h1>Hello World</h1>
	<p>We would like to tell <%= application.getAttribute("userName") %> hi directly from a JSP</p>
</body>
</html