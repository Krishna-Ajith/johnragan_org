package org.johnragan.inplaceeditor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MoviesAutocompleterServlet extends HttpServlet {
	public void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		doGet(request,response);
	}
	public void doGet(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		
		String prefix = request.getParameter("value");
		List matches = findMatches( prefix );
		request.setAttribute("list", matches);
		RequestDispatcher rd = request.getRequestDispatcher("/unordered-list.jsp");
		rd.forward(request, response);
	}

	private List<String> findMatches(String prefix) {
		List<String> matches = new ArrayList<String>();
		for (int i=0; i < getMovies().size(); ++i) {
//		for (String choice : (List<String>)getMovies()) {
			String choice = (String)getMovies().get(i);
			if (choice.startsWith(prefix)) {
				matches.add(choice);
			}
		}
		return matches;
	}

	private List getMovies() {
		List movies = new ArrayList();
		movies.add("Faces of Death (1978)");
		movies.add("Faces of Death 2 (1981)");
		movies.add("Faces of Death 4 (1990)");
		movies.add("Faces of Death Collection (Vols. 1-4) (2002)");
		movies.add("Faces of Death III (1985)");
		movies.add("Faces of Death IV (1990)");
		movies.add("Fahrenheit 451 (1966)");
		movies.add("Fallen (1998)");
		movies.add("Family Plot (1976)");
		movies.add("Fangs (2001)");
		movies.add("Fantastic Planet (1973)");
		movies.add("Fantastic Voyage (1966)");
		movies.add("Faust: Lost of the Damned (2000)");
		movies.add("Fear in the Night (1972)");
		movies.add("Fear of the Dark (2004)");
		movies.add("FearDotCom (2002)");
		movies.add("Fianc351e of Dracula (2002)");
		movies.add("Fiend Without a Face (1958)");
		movies.add("Final Destination (2000)");
		return movies;
	}
}
