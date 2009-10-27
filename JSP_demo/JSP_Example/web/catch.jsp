<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

About to do a risky thing: <br/>
<c:catch var="myException">
     <% int x = 10/0; %>
     You will never get to this point.
</c:catch>

<c:if test="${myException != null}">
     There was an exception: ${myException.message} <br/>
</c:if>
If you see this, we survived.
