<%!
	public void jspInit() {
		String userName = getServletConfig().getInitParameter("userName");
		ServletContext ctx = getServletContext();
		synchronized(ctx) {
			ctx.setAttribute("userName", userName); // You have to use applicationContext to get these into the system.
		}
	}
%>

<html>
<body>
	<h1>Invoked From Servlet</h1>
	<p>This was invoked from a servlet and user name is <%= application.getAttribute("userName") %></p>
</body>
</html>