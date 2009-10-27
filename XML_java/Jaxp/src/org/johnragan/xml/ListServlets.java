package org.johnragan.xml;

import javax.xml.parsers.*;       // JAXP classes for obtaining a SAX Parser
import org.xml.sax.*;             // The main SAX package
import java.io.*;                 // For reading the input file
import java.util.*;               // Hashtable, lists, and so on

/**
 * Parse a web.xml file using the SAX2 API.
 * This class extends DefaultHandler so that instances can serve as SAX2
 * event handlers, and can be notified by the parser of parsing events.
 * We simply override the methods that receive events we're interested in
 **/
public class ListServlets extends org.xml.sax.helpers.DefaultHandler {
	HashMap<String, String> nameToClass;     		 // Map from servlet name to servlet class name
    HashMap<String, String> nameToID;        		 // Map from servlet name to id attribute
    HashMap<String, List<String>> nameToPatterns;  	 // Map from servlet name to url patterns

    StringBuffer accumulator;                          // Accumulate text
    String servletName, servletClass, servletPattern;  // Remember text
    String servletID;        						   // Value of id attribute of <servlet> tag
    
    // Called at the beginning of parsing.  We use it as an init() method
    public void startDocument() {
    	accumulator = new StringBuffer();
    	nameToClass = new HashMap<String, String>();
    	nameToID = new HashMap<String, String>();
    	nameToPatterns = new HashMap<String, List<String>>();
    }
    
    // When the parser encounters plain text (not XML elements), it calls
    // this method, which accumulates them in a string buffer.
    // Note that this method may be called multiple times, even with no
    // intervening elements.
    public void characters(char[] buffer, int start, int length) {
    	accumulator.append(buffer, start, length);
    }
    
    // At the beginning of each new element, erase any accumulated text.
    public void startElement(String namespaceURL, String localName,
			     String qname, Attributes attributes) {
    	accumulator.setLength(0);
    	
    	// If its a servlet tag, look for id attribute
    	if (qname.equals("servlet")) {
    		servletID = attributes.getValue("id");
    	}
    }
    
    // Take special action when we reach the end of selected elements.
    // Although we don't use a validating parser, this method does assume
    // that the web.xml file we're parsing is valid.
    public void endElement(String namespaceURL, String localName, String qname) {
		// Since we've indicated that we don't want name-space aware 
		// parsing, the element name is in qname.  If we were doing
		// namespaces, then qname would include the name, colon and prefix, 
		// and localName would be the name without the the prefix or colon.
		if (qname.equals("servlet-name")) {        // Store servlet name
		    servletName = accumulator.toString().trim();
		} else if (qname.equals("servlet-class")) {  // Store servlet class
		    servletClass = accumulator.toString().trim();
		} else if (qname.equals("url-pattern")) {    // Store servlet pattern
		    servletPattern = accumulator.toString().trim();
		} else if (qname.equals("servlet")) {        // Map name to class
		    nameToClass.put(servletName, servletClass);
		    nameToID.put(servletName, servletID);
		} else if (qname.equals("servlet-mapping")) {// Map name to pattern
		    List<String> patterns = (List<String>)nameToPatterns.get(servletName);
		    if (patterns == null) {
		    	patterns = new ArrayList<String>();
		    	nameToPatterns.put(servletName, patterns);
		    }
		    patterns.add(servletPattern);
		}
    }
    
    // Called at the end of parsing.  Used here to print our results.
    public void endDocument() {
		// Note the powerful uses of the Collections framework.  In two lines
		// we get the key objects of a Map as a Set, convert them to a List,
		// and sort that List alphabetically.
		List<String> servletNames = new ArrayList<String>(nameToClass.keySet());
		Collections.sort(servletNames);
		// Loop through servlet names
		for (Iterator<String> iterator = servletNames.iterator(); iterator.hasNext();) {
		    String name = iterator.next();
		    // For each name get class and URL patterns and print them.
		    String classname = nameToClass.get(name);
		    String id = nameToID.get(name);
		    List<String> patterns = nameToPatterns.get(name);
		    System.out.println("Servlet: " + name);
		    System.out.println("Class: " + classname);
		    if (id != null) {
		    	System.out.println("ID: " + id);
		    }
		    if (patterns != null) {
				System.out.println("Patterns:");
				for(Iterator<String> i = patterns.iterator(); i.hasNext(); ) {
				    System.out.println("\t" + i.next());
				}
		    }
		    System.out.println();
		}
    }
    
    // Issue a warning
    public void warning(SAXParseException exception) {
    	System.err.println("WARNING: line " + exception.getLineNumber() + ": "+
			   exception.getMessage());
    }

    // Report a parsing error
    public void error(SAXParseException exception) {
    	System.err.println("ERROR: line " + exception.getLineNumber() + ": " +
			   exception.getMessage());
    }

    // Report a non-recoverable error and exit
    public void fatalError(SAXParseException exception) throws SAXException {
    	System.err.println("FATAL: line " + exception.getLineNumber() + ": " +
			   exception.getMessage());
	throw(exception);
    }
	
	/** The main method sets things up for parsing */
    public static void main(String[] args) 
		throws IOException, SAXException, ParserConfigurationException {
    	
		// We use a SAXParserFactory to obtain a SAXParser, which
		// encapsulates a SAXReader.
		SAXParserFactory factory = SAXParserFactory.newInstance();
		factory.setValidating(false);     // We don't want validation
		factory.setNamespaceAware(false); // No namespaces please
		
	    // Create a SAXParser object from the factory
		SAXParser parser = factory.newSAXParser();
		
	    // Now parse the file specified on the command line using
		// an instance of this class to handle the parser callbacks
		File file = new File("example.xml");
		parser.parse(file, new ListServlets());
    }
}
