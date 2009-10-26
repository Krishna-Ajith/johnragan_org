function startThingsUp() {
	setupNodeTypeNameValue();
	setupDocumentElements();
	setupChildElements();
	setupAttributes();
	setupDOMAccessShortcut();
	setupSiblingsEtAl();
}

function setupNodeTypeNameValue() {
	var el = document.getElementById('doc-node-type');
	el.innerHTML = document.nodeType;
	
	el = document.getElementById('doc-node-name');
	el.innerHTML = document.nodeName;
	
	var paraNode = document.getElementById('the-para-node');
	
	el = document.getElementById('doc-node-value');
	el.innerHTML = document.nodeValue;
	
	el = document.getElementById('para-node-name');
	el.innerHTML = paraNode.nodeName;
	
	el = document.getElementById('para-node-value');
	el.innerHTML = paraNode.nodeValue;
	
	el = document.getElementById('text-node-name');
	el.innerHTML = paraNode.childNodes[0].nodeName;
	
	el = document.getElementById('text-node-value');
	el.innerHTML = paraNode.childNodes[0].nodeValue;
	
	el = document.getElementById('text-context');
	el.innerHTML = paraNode.textContent;
}

function setupDocumentElements() {
	var el = document.getElementById('doc-element');
	el.innerHTML = document.documentElement;
	
	var el = document.getElementById('doc-tag');
	el.innerHTML = document.documentElement.tagName;
}

function setupChildElements() {
	var el = document.getElementById('has-children');
	el.innerHTML = document.documentElement.hasChildNodes();
	
	var el = document.getElementById('child1');
	el.innerHTML = document.documentElement.childNodes[0].nodeName;
	
	var el = document.getElementById('child2');
	el.innerHTML = document.documentElement.childNodes[1].nodeName;
	
	var el = document.getElementById('child2-parent');
	el.innerHTML = document.documentElement.childNodes[1].parentNode.nodeName;
}

function setupAttributes() {
	var the_node = document.getElementById('the-para-node');

	var el = document.getElementById('attr-hasAttributes');
	el.innerHTML = the_node.hasAttributes();
	
	var el = document.getElementById('attr-length');
	el.innerHTML = the_node.attributes.length;
	
	var el = document.getElementById('attr-0-name');
	el.innerHTML = the_node.attributes[0].nodeName;
	
	var el = document.getElementById('attr-0-value');
	el.innerHTML = the_node.attributes[0].nodeValue;
	
	var el = document.getElementById('attr-1-name');
	el.innerHTML = the_node.attributes[1].nodeName;
	
	var el = document.getElementById('attr-1-value');
	el.innerHTML = the_node.attributes[1].nodeValue;
	
	var el = document.getElementById('attr-class');
	el.innerHTML = the_node.attributes['class'].nodeValue;
	
	var el = document.getElementById('attr-get-class');
	el.innerHTML = the_node.getAttribute('class');
}

function setupDOMAccessShortcut() {
	var el = document.getElementById('shortcut-length');
	el.innerHTML = document.getElementsByTagName('p').length;
	
	var el = document.getElementById('shortcut-id');
	el.innerHTML = document.getElementsByTagName('p')[3].id;
	
	var el = document.getElementById('shortcut-className');
	el.innerHTML = document.getElementsByTagName('p')[3].className;
	
	var el = document.getElementById('shortcut-find-class');
	el.innerHTML = document.getElementsByClassName("foo")[0];	
}

function setupSiblingsEtAl() {
	var para = document.getElementById('middle-child');
	var el = document.getElementById('sib-para');
	el.innerHTML = para.textContent;
		
	var el = document.getElementById('sib-next');
	el.innerHTML = para.nextSibling.textContent;
	
	var el = document.getElementById('sib-next-next');
	el.innerHTML = para.nextSibling.nextSibling.textContent;
		
	var el = document.getElementById('sib-prev');
	el.innerHTML = para.previousSibling.previousSibling.textContent;
		
	var el = document.getElementById('sib-next-prev');
	el.innerHTML = para.nextSibling.previousSibling.textContent;

	var the_div = document.getElementById("the-container");
	var el = document.getElementById('sib-div');
	el.innerHTML = the_div;
		
	var el = document.getElementById('sib-first');
	el.innerHTML = the_div.firstChild.textContent;
	
	var el = document.getElementById('sib-first-next');
	el.innerHTML = the_div.firstChild.nextSibling.textContent;
		
	var el = document.getElementById('sib-last');
	el.innerHTML = the_div.lastChild.textContent;
		
	var el = document.getElementById('sib-last-prev');
	el.innerHTML = the_div.lastChild.previousSibling.textContent;
}