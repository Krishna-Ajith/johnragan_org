<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
	<h2>c:set</h2>
	<p>The following are set at different scopes:</p>
	<ul>
		<c:set var="sessionLevelName" scope="session" value="value set in session" />
		<li>value used c:set to set it at the session level as sessionScope.sessionLevelName: ${sessionScope.sessionLevelName}</li>
		<c:set var="requestLevelName" scope="request" value="value set in request" />
		<li>value used c:set to set it at the request level as requestScope.requestLevelName: ${requestScope.requestLevelName}</li>
		<c:set var="applicationLevelName" scope="application" value="value set in application" />
		<li>value used c:set to set it at the application level as applicationScope.applicationLevelName: ${applicationScope.applicationLevelName}</li>
		<c:set var="pageLevelName" scope="page" value="value set in page" />
		<li>value used c:set to set it at the page level as pageScope.pageLevelName: ${pageScope.pageLevelName}</li>
		<c:set var="nameViaBody" scope="page">
			This value set in body
		</c:set>
		<li>value used the body of c:set to set it: ${pageScope.nameViaBody}</li>
	</ul>
	<p>Lets try with some Java Beans and Maps</p>
	<ul>
		<li>Business object's foo value (requestScope.businessObject.foo) is ${requestScope.businessObject.foo}</li>
		<c:set var="fooScalar" scope="page" value="${businessObject.foo}" />
		<li>We set a scalar value with page scope to the javabean's foo; here is its value: ${pageScope.fooScalar}</li>
		<c:set target="${requestScope.businessObject}" property="foo" value="${fooScalar}" />
		<li>Here we are setting the businessObject's foo property to the value of the scalar we set previously: ${businessObject.foo}</li>
		<c:set var="mapKeyValue" scope="page" value="${requestScope.map.initialKey}" />
		<li>We set a scalar value to map.initialKey: ${pageScope.mapKeyValue}</li>
		<c:set target="${requestScope.map}" property="initialKey" value="updated value for key" />
		<li>Here we are setting the map's initialKey key to a different value: ${map.initialKey}</li>
		<c:set target="${requestScope.map}" property="newKey" value="value for new key" />
		<li>Here we are setting the map's newKey key to a new value: ${map.newKey}</li>
	</ul>
	
	<h2>c:forEach</h2>
	<h3>For a List</h3>
	<table>	
		<c:forEach var="movie" items="${movieList}" varStatus="movieLoopCount" >
		     <tr>
		          <td>${movie}</td>
		          <td>Count: ${movieLoopCount.count}</td>
		     </tr>
		</c:forEach>
	</table>
	<h3>For an array and skipping the first element</h3>
	<table>	
		<c:forEach var="song" items="${songArray}" varStatus="songLoopCount" begin="1" >
		     <tr>
		          <td>${song}</td>
		          <td>Count: ${songLoopCount.count}</td>
		     </tr>
		</c:forEach>
	</table>
	
	<h2>c:if</h2>
	<c:set var="userType" scope="page" value="member" />
	<c:if test="${userType eq 'member' }" >
    	<p>Positive if test passed for usertype eq 'member'</p>
	</c:if>
	<p>We should not see a message that the negative on passed.</p>
	<c:if test="${userType eq 'no match' }" >
    	<p>Negative if test passed for usertype eq 'no match' - this is not good</p>
	</c:if>
	<c:if test="${userType == 'member' }" >
    	<p>Positive if test passed for usertype == 'member'</p>
	</c:if>
	
	<h2>c:choose</h2>
	<c:set var="userPref" scope="page" value="no match" />
	<c:choose>
     <c:when test="${userPref == 'performance'}">
          <p>c:choose you chose performance</p>
     </c:when>
     <c:when test="${userPref == 'safety'}">
          <p>c:choose you chose safety</p>
     </c:when>
     <c:otherwise>
          <p>c:choose you chose something that fell into c:otherwise</p>
     </c:otherwise>
	</c:choose>
	
	<h2>c:remove</h2>
	<c:remove var="userPref" scope="page" />
	<p>We are removing userPref via c:remove, so nothing should be displayed after this on this line:  ${userPref}</p>
	
	<h2>c:url</h2>
	<c:set var="name" scope="page" value="John Ragan" />
	<c:set var="statement" scope="page" value="statement with spaces" />
	<c:url value="/inputComments.jsp" var="inputURL" >
          <c:param name="firstName" value="${name}" />
          <c:param name="statement" value="${statement}" />
    </c:url>
    <p>Using c:url, we generated the following URL:  ${inputURL}</p>
		
</body>
</html