/**
 * 
 */
package org.johnragan.controllers;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.johnragan.business.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * @author John
 *
 */
public class ELExamples extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		BusinessObject bo = new BusinessObject();
		bo.setFoo("bar");	
		request.setAttribute("businessObject", bo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("initialKey", "initialValue");
		request.setAttribute("map", map);
		
		List<String> movies = new ArrayList<String>();
		movies.add("Toy Story");
		movies.add("Ferris Buehler's Day Off");
		movies.add("Breakfast Club");
		movies.add("John Tucker Must Die");
		request.setAttribute("movieList", movies);
		
		String[] songArray = new String[3];
		songArray[0] = "Don't Trust Me"; 
		songArray[1] = "Fire Burning";
		songArray[2] = "I Want to Hold Your Hand";
		request.setAttribute("songArray", songArray);
		
		RequestDispatcher view = request.getRequestDispatcher("/el_examples.jsp");
		view.forward(request, response);
	}
}