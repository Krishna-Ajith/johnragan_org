<%@ page import="org.johnragan.business.*" %>

<html>
<body>
	<!-- http://localhost:8080/foo/EL/index.html?color=red&sizes=12&sizes=14  -->
	
	<h1>Hello World</h1>
	<p>We would like to say hi! directly from a JSP.</p>
	
	<jsp:include page="Header_without_params.jsp" />
	<jsp:include page="Header_with_params.jsp">
		<jsp:param name="wifeName" value="Christine" />
	</jsp:include>
	
	
	<p>A request scope attribute: ${requestScope.request_attr}</p>
	<p>A session scope attribute: ${sessionScope.session_attr}</p>
	<p>A servlet application scope attribute: ${applicationScope.context_attr}</p>
	<p>A servlet parameter named color with value: ${param.color} </p>
	<p>A servlet multi-value parameter named sizes with value for 0: ${paramValues.sizes[0]} </p>
	<p>A servlet multi-value parameter named sizes with value for 1: ${paramValues.sizes[1]} </p>
	<p>A header named host with value: ${header.host} </p>
	<p>An application context init parameter header named appWideSetting with value: ${initParam.appWideSetting} </p>
	<p>A cookie named badsalsa with value: ${cookie.badsalsa.value} </p>
	
	<p>A request scope javabean attribute with dot notation: ${requestScope.businessObject.foo}</p>
	<p>A request scope javabean attribute with array indexing: ${requestScope.businessObject['foo']}</p>
	
	<p>A request scope map attribute with dot notation: ${requestScope.girlMap.ChristineKey}</p>
	<p>A request scope map attribute with dot notation: ${requestScope.girlMap["ChristineKey"]}</p>
	
	<p>A request scope list attribute for 0: ${requestScope.victoriaList[0]}</p>
	<p>A request scope list attribute for 1: ${requestScope.victoriaList[1]}</p>
	
	<p>A request scope array attribute for 0: ${requestScope.animalArray[0]}</p>
	<p>A request scope array attribute for 1: ${requestScope.animalArray[1]}</p>
</body>
</html