<%@ page contentType="text/html;" %>
<%@ page import="java.util.*" %>
<ul>
    <%
        List list = (List)request.getAttribute("list");

        for (int i=0; i < list.size(); ++i) {
            out.println("<li>" + list.get(i) + "</li>");
        }
    %>
</ul>