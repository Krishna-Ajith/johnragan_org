<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<body>
		<%@ taglib prefix="mine" uri="randomThings" %>
		Advisor Page<br/>
		<c:set var="userName" scope="page" value="Christine"/>
		<mine:advice user="${pageScope.userName}" />
	</body>
</html>
