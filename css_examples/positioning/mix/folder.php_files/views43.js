// REGISTER  =========================================================================================================

var dragger = null; //folders
var dragon = null; //subtasks
var drop = null;
var rows = [];
var dropi = 0;
var dropw = 0;
var drops = 0;

var popCal = null;
var blurDelay = 0;
var searchtime = 0;
var scrollDelay = 0;
var unsavedChanges = 0;
var offline = 0;
var shift_down = 0;
var hoverDelay = null;

function topLoaded(quickAdd) { //load once the top is loaded
	
	if($('action_addtask')!=null) Event.observe('action_addtask','click', showAdd);
	if($('action_cancelAdd')!=null) Event.observe('action_cancelAdd','click', cancelAdd);
	if($('action_sorttask')!=null) Event.observe('action_sorttask','click', showSort);
	if($('action_doSort')!=null) Event.observe('action_doSort','submit', multiSort);
	if($('action_cancelSort')!=null) Event.observe('action_cancelSort','click', cancelSort);
	if($('action_filtertask')!=null) Event.observe('action_filtertask','click', showFilter);
	if($('action_cancelFilter')!=null) Event.observe('action_cancelFilter','click', cancelFilter);
	if($('action_searchtask')!=null) Event.observe('action_searchtask','click', showSearch);
	if($('action_cancelSearch')!=null) Event.observe('action_cancelSearch','click', cancelSearch);
	if($('action_toggleDividers')!=null) Event.observe('action_toggleDividers','click', toggleDividers);
	if($('action_showdetails')!=null) Event.observe('action_showdetails','click', getall_dets);
	if($('action_sharetask')!=null) Event.observe('action_sharetask','click', showShare);
	if($('action_cancelShare')!=null) Event.observe('action_cancelShare','click', cancelShare);
	if($('action_cancelMultiEdit')!=null) Event.observe('action_cancelMultiEdit','click', cancelMultiEdit);
	if($('action_edittasks')!=null) Event.observe('action_edittasks','click', showMultiEdit);
	if($('contxfilter')!=null) Event.observe('contxfilter','change', limitContext);
	
	if($('moretabs')!=null) Event.observe('moretabs','click', showExtraFolders);
	if($('formAddTask')!=null) Event.observe('formAddTask','submit', addTask);
	if($('formMultiEdit')!=null) Event.observe('formMultiEdit','submit', multiEditTasks);
	if($('addtask')!=null) Event.observe('addtask','keypress', addType);

	if($('repatog')!=null) Event.observe('repatog','click', toggleAddRepeat);
	if($('starnew')!=null) Event.observe('starnew','click', newStar);

	if($('tasks')!=null) {
		Event.observe('tasks','click', clicked); //captures all clicks on tasks area
		Event.observe('tasks','mousedown', mouseDown);
		//Event.observe(window,'scroll', didScroll);
		//Event.observe('tasks','mouseover', mouseOver);
	}
	
	Event.observe(Prototype.Browser.IE ? document.body : window,'keydown', shift);
	Event.observe(Prototype.Browser.IE ? document.body : window,'keyup', unshift);
	Event.observe(Prototype.Browser.IE ? document.body : window,'mouseover', mouseOver);

	if(keycuts==1) {
		Event.observe(Prototype.Browser.IE ? document.body : window,'keypress', keyboard);
	}
	if(quickAdd==1) showAdd(null);
	
	//gears_init();
}

Event.observe(window, 'load', function() { //load once the page is loaded
	if($('tasks')!=null) {
		if($('action_hidedetails')!=null) Event.observe('action_hidedetails','click', hideDetails); //cant hide till all are loaded
		
		if($('searchField')!=null) Event.observe('searchField','keypress', search); //cant search till all are loaded
		
		Event.observe(window,'resize', resized); //cant resize window till scrollbars are loaded
		
		new PeriodicalExecuter(updateTimers, 60); //cant track timers till all tasks are loaded
			
		resized();
  	}
	if($('folderlist')!=null) {
		Event.observe('folderlist','mousedown', foldStartDrag);
	}
	if($('notebook')!=null) {
		note_registerObservers();
	}
	if($('toco')!=null) Event.observe('toco','click', toggleTOC);
	if($('tocc')!=null) Event.observe('tocc','click', toggleTOC);

	if($('status')!=null) {
		var divstate = $('status').readAttribute('p');
		if(divstate==1) countTasksPerDivider();
	
		var substate = $('status').readAttribute('b');
		if(substate==2) toggleAllSubtasks(1);
	}
});


// HELPERS  =========================================================================================================

function truncate(str,len) {
	if(str.length>len+1) {
		return str.substr(0,len)+"...";
	} else {
		return str;
	}
}
function getScroll() {
	return {
	x:document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft,
	y:document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
	};
}

function mouseCoords(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	var scroll = getScroll();
	return {
		x:ev.clientX + scroll.x - document.body.clientLeft,
		y:ev.clientY + scroll.y - document.body.clientTop
	};
}

function scrollUp() {
	if(Prototype.Browser.WebKit) {
		if(document.body.scrollTop>20) document.body.scrollTop-=20;
		else document.body.scrollTop=0;
	} else {
		if(document.documentElement.scrollTop>20) document.documentElement.scrollTop-=20;
		else document.documentElement.scrollTop=0;
	}
	scrollDelay = setTimeout("scrollUp()",100);
}

function scrollDown() {
	if(Prototype.Browser.WebKit) {
		document.body.scrollTop+=20;
	} else {
		document.documentElement.scrollTop+=20;
	}
	scrollDelay = setTimeout("scrollDown()",100);
}

function reformatTime(time, out) { //1=length 2=timer 3=time
	var mins = 0;
	time = time.toLowerCase().strip();
	
	if(time.indexOf(":")==-1 && (time.indexOf("a")==-1 || time.indexOf("d")!=-1) && time.indexOf("p")==-1) {
		if(out==3) { //noncolon military time
			var parts = time.match(/(\d?\d)(\d\d)/i);
			if(parts!=null && parts.length>2) mins = parseInt(parts[2],10)+parseInt(parts[1],10)*60;
			else mins = parseInt(time,10);
			if(time=="0000") mins=1440;
		} else {
			var parts = time.match(/(\d*\.?\d*)(\D*)/i);
			time = Math.round(parts[1]*10)/10;
			if(parts[2].indexOf("d")>=0) mins = time*1440;
			else if(parts[2].indexOf("D")>=0) mins = time*1440;
			else if(parts[2].indexOf("h")>=0) mins = time*60;
			else if(parts[2].indexOf("H")>=0) mins = time*60;
			else mins = time;
		}
	} else if(time.indexOf("p")!=-1) { //pm
		if(time.indexOf(":")==-1) {
			var parts = time.match(/(\d*)/i);
			parts[2] = 0;
		} else {
			var parts = time.match(/(\d*):(\d*)/i);
		}
		if(parseInt(parts[1],10)==12) mins = parseInt(parts[1],10)*60+parseInt(parts[2],10);
		else mins = parseInt(parts[1],10)*60+parseInt(parts[2],10)+720;
	} else if(time.indexOf("a")!=-1) { //am
		if(time.indexOf(":")==-1) {
			var parts = time.match(/(\d*)/i);
			parts[2] = 0;
		} else {
			var parts = time.match(/(\d*):(\d*)/i);
		}
		if(parseInt(parts[1],10)==12 && parseInt(parts[2],10)==0) mins = 1440;
		else if(parseInt(parts[1],10)==12) mins = parseInt(parts[2],10);
		else mins = parseInt(parts[1],10)*60+parseInt(parts[2],10);
	} else { // colon military time
		var parts = time.match(/(\d*):(\d*)/i);
		if(parseInt(parts[1],10)==0 && out==2) mins = parseInt(parts[2],10);
		else if(parseInt(parts[1],10)==0) mins = parseInt(parts[2],10)+1440;
		else mins = parseInt(parts[1],10)*60+parseInt(parts[2],10);
		if(time=="00:00") mins=1440;
	}
	if(mins==0 || isNaN(mins)) return "";
	
	if(out==1) { //length
		if(mins>=60) {
			time = Math.round(mins/6)/10;
			if(time==1) time+= " hour"; else time+= " hours";
		} else {
			if(mins==1) time= "1 min"; else time = mins+" mins";
		}
	} else if(out==2) { //timer HH:MM 
		if(mins>=60) {
			time = Math.floor(mins/60);
			mins = mins%60;
			if(mins<10) mins = "0"+mins;
			time += ":"+mins;
		} else {
			if(mins<10) mins = "0"+mins;
			time = "0:"+mins;
		}
	} else if(out==3) { //time (user configurable format)
		var date = new Date();
		var hour = Math.floor(mins/60);
		date.setUTCHours(hour,mins%60); 
		time = date.dateFormat(time_format);
		if(mins==0) time='';
	}
	return time;
}

Date.prototype.dateFormat = function(format)
{
	if(!format) { // the default date format to use - can be customized to the current locale
		format = 'M d- Y';
	}
	LZ = function(x) {return(x < 0 || x > 9 ? '' : '0') + x};
	var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	var DAY_NAMES = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	format = format + "";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=this.getUTCFullYear().toString();
	var M=this.getUTCMonth()+1;
	var d=this.getUTCDate();
	var E=this.getUTCDay();
	var H=this.getUTCHours();
	var m=this.getUTCMinutes();
	var s=this.getUTCSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real this parts into formatted versions
	var value = new Object();
	//if (y.length < 4) {y=''+(y-0+1900);}
	value['Y'] = y.toString();
	value['y'] = y.substring(2);
	value['n'] = M;
	value['m'] = LZ(M);
	value['F'] = MONTH_NAMES[M-1];
	value['M'] = MONTH_NAMES[M+11];
	value['j'] = d;
	value['d'] = LZ(d);
	value['D'] = DAY_NAMES[E+7];
	value['l'] = DAY_NAMES[E];
	value['G'] = H;
	value['H'] = LZ(H);
	if (H==0) {value['g']=12;}
	else if (H>12){value['g']=H-12;}
	else {value['g']=H;}
	value['h']=LZ(value['g']);
	if (H > 11) {value['a']='pm'; value['A'] = 'PM';}
	else { value['a']='am'; value['A'] = 'AM';}
	value['i']=LZ(m);
	value['s']=LZ(s);
	//construct the result string
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
};

function setSelected(obj,val) { //sets selected from label
	if(val=='none') val = obj.options[0].text;
	
	for(var i=0;i<obj.options.length;i++) {
		if(obj.options[i].text==val) {
			obj.selectedIndex = obj.options[i].index;
			obj.options[i].selected=true;
		} else {
			obj.options[i].selected=false;
		}
	}
}

function setSelectedVal(obj,val) { //sets selected from value
	obj = $(obj);
	if(obj==null) return;
	for(var i=0;i<obj.options.length;i++) {
		if(obj.options[i].value==val) {
			obj.selectedIndex = obj.options[i].index;
			obj.options[i].selected=true;
		} else {
			obj.options[i].selected=false;
		}
	}
}

function getSelected(obj,val) {
	for(var i=0;i<obj.options.length;i++) {
		if(obj.options[i].value==val) {
			return obj.options[i].text;
		}
	}
	return "";
}

function ancestorIncludes(obj,inc) { //searches all ancestors for an id that includes the string
	var parents = obj.ancestors();
	
	for(var i=0; i<parents.length; i++) {
		if(parents[i].id.include && parents[i].id.include(inc)) return parents[i].id;
	}

	return 0;
}

// TOGGLES  =========================================================================================================

function showShortcuts() {
	var dontclear = 0;
	
	if($('tip')) {
		dontclear=$('tip').readAttribute('noadv');
		$('tip').remove();
	}
	var tip = "<div id='tip' noadv='1'><a href='#' onclick='return clearTip();' class='right'>Close tip</a><img src='/images/icons/lightbulb.gif' width='16' height='16' alt='tip' /> <b>Keyboard shortcuts</b><br /><table><tr><td valign='top'>";
	tip+="f = Find something on the current page<br/>";
	tip+="n = Add a new task<br/>";
	tip+="a = Open the Collaborators toolbar<br/>";
	tip+="i = Open the Filters toolbar<br/>";
	tip+="t = Open the Sorting toolbar<br/>";
	tip+="z = Hide/Reveal task details or notes<br/>";
	tip+="w = Open or close dividers<br/>";
	tip+="j = Show subtasks flattened</td><td class='padl' valign='top'>";
	tip+="k = Show subtasks hidden<br/>";
	tip+="l = Show subtasks indented<br/>";
	tip+="m = Switch to Main view<br/>";
	tip+="o = Switch to Folder view<br/>";
	tip+="c = Switch to Context view<br/>";
	tip+="d = Switch to Due-Date view<br/>";
	tip+="g = Switch to Goal view</td><td class='padl' valign='top'>";
	tip+="p = Switch to Priority view<br/>";
	tip+="h = Switch to Sharing view<br/>";
	tip+="e = Switch to Search view<br/>";
	tip+="b = Switch to Calendar view<br/>";
	tip+="r = Reload the page<br/>";
	tip+="1-9 = Switch to tabs 1-9<br/>";
	tip+="? = Show this tip";
	tip+="</td></tr></div>"
	
	if(dontclear==null || dontclear!=1) new Insertion.After('toolbar',tip);

}

function showAdd(e) {
	if(e!=null) Event.stop(e);
	cancelAllEditables();
	
	$('action_addtask').hide();
	$('addtask').show();
	$('action_cancelAdd').show();
	$('title').focus();
	$('formAddTask').setAttribute('submitting',0);
	
	if($('asgg')) Event.observe('asgg','change', changedAssignor);
}
function showSort(e) {
	if(!$('sorttask').visible()) {
		$('action_sorttask').removeClassName('tic');
		$('action_sorttask').addClassName('ticed');
		$('sorttask').show();
	} else {
		cancelSort(e);
	}
	Event.stop(e);
}
function showFilter(e) {
	if(!$('filtertask').visible()) {
		$('action_filtertask').removeClassName('tic');
		$('action_filtertask').addClassName('ticed');
		$('filtertask').show();
	} else {
		cancelFilter(e);
	}
	Event.stop(e);
}
function showSearch(e) {
	if(!$('searchtask').visible()) {
		$('action_searchtask').removeClassName('tic');
		$('action_searchtask').addClassName('ticed');
		$('searchtask').show();
		$('searchField').clear();
		$('searchField').focus();
	} else {
		cancelSearch(e);
	}
	Event.stop(e);
}
function cancelAdd(e) {
	if(!$('addtask').visible()) return;
		
	$('action_addtask').show();
	$('title').focus();
	$('title').blur();
	$('addtask').hide();
	$('action_cancelAdd').hide();
	if($('star') && $('star').value==1 && $('addtask').readAttribute('d1')==0) $('star').value=switchStar('new');
	$('formAddTask').reset();
	
	if($('tas0')) $('tas0').setAttribute('date',$('tas0').readAttribute('orig'));
	if($('eud0')) $('eud0').setAttribute('date',$('eud0').readAttribute('orig'));
	if($('newstart')) $('newstart').value=$('eud0').readAttribute('time');
	if($('newend')) $('newend').value=$('tas0').readAttribute('time');
	if($('newrem')) $('newrem').value=$('eud0').readAttribute('origrem');

	var page = $('tasks').readAttribute('page');
	var id = 0;
	if($('status')) id = $('status').readAttribute('i');
	
	if(page==1 && id==4 && $('addtask').readAttribute('d1')==0) newStar(e);
	else if(page==2) setSelectedVal('fold',id);
	else if(page==3) setSelectedVal('contx',id);
	else if(page==5) setSelectedVal('goal',id);
	else if(page==6 && id=='y') setSelectedVal('priority',-1);
	else if(page==6 && id!='x') setSelectedVal('priority',id);
	else if(page==9) $('tag').value=$('tab'+id).readAttribute('valtxt');
	else if(page==10) setSelectedVal('stat',id);
	
	var uid = $('tasks').readAttribute('user');
	var did = $('uidunique').readAttribute('user');
	
	if(uid!=did && did!=0) {
		$('uidunique').setAttribute('user',uid);
		changedAssignor();
	}
	
	if($('asgg')) Event.stopObserving('asgg','change', changedAssignor);

	if($('repeatA') && $('repeatA').visible()) {
		toggleAddRepeat(e);
	}
	
	if(e!=null) Event.stop(e);
}
function cancelSort(e) {
	$('action_sorttask').removeClassName('ticed');
	$('action_sorttask').addClassName('tic');
	$('sorttask').hide();
	if(e) Event.stop(e);
}
function cancelFilter(e) {
	$('action_filtertask').removeClassName('ticed');
	$('action_filtertask').addClassName('tic');
	$('filtertask').hide();
	Event.stop(e);
}
function cancelSearch(e) {
	$('action_searchtask').removeClassName('ticed');
	$('action_searchtask').addClassName('tic');
	$('searchtask').hide();
	$('searchField').clear();
	
	doSearch(0);
	
	Event.stop(e);	
}
function showShare(e) {
	if(!$('sharetask').visible()) {
		$('action_sharetask').removeClassName('tic');
		$('action_sharetask').addClassName('ticed');
		$('sharetask').show();
	} else {
		cancelShare(e);
	}
	Event.stop(e);
}

function cancelShare(e) {
	$('action_sharetask').removeClassName('ticed');
	$('action_sharetask').addClassName('tic');
	$('sharetask').hide();
	if(e) Event.stop(e);
}

function cancelMultiEdit(e) {
	$('action_edittasks').removeClassName('ticed');
	$('action_edittasks').addClassName('tic');
	$('multiedit').hide();
	if(e) Event.stop(e);
}

function showMultiEdit(e) {
	if(!$('multiedit').visible()) {
		$('action_edittasks').removeClassName('tic');
		$('action_edittasks').addClassName('ticed');
		$('formMultiEdit').reset();
		$('multiedit').show();
	} else {
		cancelMultiEdit(e);
	}
	Event.stop(e);
}

function hideDetails(e) {
	var obj = Event.element(e);
	
	if($('tasks').readAttribute('cols')=="1") {
		var notes = $$('div.note');
		notes.each(function(item) { item.hide(); });
	} else {
		var dets = $$('div.dets_bot');
		dets.each(function(item) { item.hide(); });
	
		var dets = $$('img.ihd');
		dets.each(function(item) { toggleIcon(item.id,0); });
	}
	
	$('action_hidedetails').hide();
	$('action_showdetails').show();
	Event.stop(e);
	
	Event.stopObserving('action_showdetails','click', getall_dets);
	Event.observe('action_showdetails','click', showDetails);
	new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'d&v=0'} );
}

function showDetails(e) {
	var obj = Event.element(e);
	
	if($('tasks').readAttribute('cols')=="1") {
		var notes = $$('div.note');
		notes.each(function(item) { item.show(); });
	} else {
		if($('status').readAttribute('d')==0) {
			getall_dets(e);
			return;
		}
		
		var dets = $$('div.dets_bot');
		dets.each(function(item) { item.show(); });
		
		var dets = $$('img.isd');
		dets.each(function(item) { toggleIcon(item.id,1); });
	}
	$('action_hidedetails').show();
	$('action_showdetails').hide();
	if(e!=null) Event.stop(e);
	
	new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'d&v=1'} );
}

function hideAllEditables() {
	handleChangedRep();
	if($('duediv') && $('duediv').visible()) {
		saveDueDateTime();
		dueClose();
	}
	if($('startdiv') && $('startdiv').visible()) {
		saveStartDateTime();
		startClose();
	}
	fileClose();
	removeCheckDetails();
	removeSubtaskDetails();
}

function cancelAllEditables() {
	cancelRepeat();
	if($('duediv') && $('duediv').visible()) {
		dueClose();
	}
	if($('duediv') && $('startdiv').visible()) {
		startClose();
	}
	fileClose();
}

// EVENTS =========================================================================================================
function mouseOver(e) {
	var obj = Event.element(e);
	var up = obj.up();
		
	if(up==null || up.id==undefined|| up.tagName==undefined) {
		up=null;
	}
	
	if(obj.id=="chhover" || obj.id=="sbhover") { 
		return; 
	} else if(up!=null && (up.hasClassName('ch') || up.hasClassName('chd'))) { 
		Event.stop(e);
		showCheckDetails(obj);
		return;
	} else if(obj.hasClassName('subp') || obj.hasClassName('subm') || obj.hasClassName('sub')) { 
		Event.stop(e);
		showSubtaskDetails(obj);
		return;
	}
	if($('chhover')) { 
		var row = $('tasks').readAttribute('hovering');
		if((obj.id!="row"+row && !obj.descendantOf("row"+row)) || obj.descendantOf("subtasks"+row)) removeCheckDetails();
	}
	if($('sbhover')) {
		var row = $('tasks').readAttribute('hovering');
		if((obj.id!="row"+row && !obj.descendantOf("row"+row)) || obj.descendantOf("subtasks"+row)) removeSubtaskDetails();
	}
	if(hoverDelay==null && $('duediv') && $('duediv').visible()) {
		hoverDelay = new PeriodicalExecuter(function(pe) {
			pe.stop();
			hideAllEditables();
		}, 1);	
	} else if(hoverDelay!=null) {
		hoverDelay.stop();
		hoverDelay = null;
	}
}

function mouseMove(e) {
	var mousePos = mouseCoords(e);
	
	if(dragon) {
		dragSubtask(mousePos);
		Event.stop(e);
	}
}
function mouseUp(e) {
	var mousePos = mouseCoords(e);
	
	if(dragon) {
		Event.stop(e);
		dropSubtask(mousePos);
	}
	dragon = null;
	
	Event.stopObserving(document,'mousemove', mouseMove);
	Event.stopObserving(document,'mouseup', mouseUp);
	Event.observe('tasks','mousedown', mouseDown);
}
function mouseDown(e) {
	var perm = $('tasks').readAttribute('perm');
	if(perm!=3) return;
	
	var obj = Event.element(e);
	var mousePos = mouseCoords(e);
	
	if(obj.id.include("subm")) {
		dragon = obj.parentNode;
		Event.stop(e);
		startSubtask(mousePos);
	}
	
	Event.observe(document,'mousemove', mouseMove);
	Event.observe(document,'mouseup', mouseUp);
	Event.stopObserving('tasks','mousedown', mouseDown);
}

function mouseMoveCol(e) {
	var mousePos = mouseCoords(e);
	
	if(dragon) {
		if(dropw==0) moveCol(mousePos);
		else resizeCols(mousePos,0);
		Event.stop(e);
	}
}
function mouseUpCol(e) {
	var mousePos = mouseCoords(e);
	
	Event.stopObserving(document,'mousemove', mouseMoveCol);
	Event.stopObserving(document,'mouseup', mouseUpCol);
	Event.observe('colhead','mousedown', mouseDownCol);
	
	if(dragon) {
		Event.stop(e);
		if(dropw==0) colStopDrag(mousePos);
		else resizeCols(mousePos,1);
	}
	dragon = null;
}

function mouseDownCol(e) {
	var obj = Event.element(e);
	var mousePos = mouseCoords(e);
	
	if(obj.id.include("colmv")) {
		startResize(obj,mousePos);
		Event.stop(e);
	} else if(obj.id!='coled') {
		colStartDrag(obj,mousePos);
		Event.stop(e);
	}
	
	Event.observe(document,'mousemove', mouseMoveCol);
	Event.observe(document,'mouseup', mouseUpCol);
	Event.stopObserving('colhead','mousedown', mouseDownCol);
}

function didScroll(e) {
	Event.stop(e);
	
	
	if($('morelnk')) {
		if(window.innerHeight>0) var win_h = window.innerHeight;
		else if(document.body.clientHeight>0) var win_h = document.body.clientHeight;
		else var win_h = document.documentElement.clientHeight;
	
		var y = $('morelnk').offsetTop;
		
		var scroll = getScroll();
		
		//alert(win_h+"="+y+"="+scroll.y);
		
		if(scroll.y+win_h>y/2) fetchMore();
	}
	
}

//called when a window is resized.
function resized(e) {
	manageTabs(); //hide folders that go off the edge
}

function shift(e) {
	if(e.charCode) var key = e.charCode;
	else if(e.which) var key = e.which;
	else var key = e.keyCode;
	
	if(key==16) shift_down=1;
}
function unshift(e) {
	if(e.charCode) var key = e.charCode;
	else if(e.which) var key = e.which;
	else var key = e.keyCode;
	
	if(key==16) shift_down=0;
}

//called when a key is pressed.
function keyboard(e) {
	var obj = Event.element(e);
	
	if(e.metaKey) return; //ignore if any modifiers are down (dont want to conflict with anything)
	if(e.ctrlKey) return;
	if(e.altKey) return;
		
	if(obj.tagName=="HTML" || obj.tagName=="BODY" || obj.tagName=="DIV") { //no target		
		
		if(e.charCode) var key = e.charCode;
		else if(e.which) var key = e.which;
		else var key = e.keyCode;
	
		switch (key) { 
			case 102: case 70: //f
				showSearch(e);
				break;
			case 110: case 78: //n
				showAdd(e);
				break;	
			case 109: case 77: //m
				window.location="/views/index.php"; Event.stop(e);
				break;
			case 111: case 79: //o
				window.location="/views/folder.php"; Event.stop(e);
				break;	
			case 99: case 67: //c
				window.location="/views/context.php"; Event.stop(e);
				break;	
			case 100: case 68: //d
				window.location="/views/duedate.php"; Event.stop(e);
				break;
			case 103: case 71: //g
				window.location="/views/goal.php"; Event.stop(e);
				break;
			case 112: case 80: //p
				window.location="/views/priority.php"; Event.stop(e);
				break;	
			case 104: case 72: //h
				window.location="/views/sharing.php"; Event.stop(e);
				break;
			case 101: case 69: //e
				window.location="/views/search.php"; Event.stop(e);
				break;
			case 98: case 66: //b
				window.location="/calendar.php"; Event.stop(e);
				break;
			case 114: case 82: //r
				window.location.reload(); Event.stop(e);
				break;
			case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57://1-9
				var tabs = $('tabs').getElementsBySelector('div');
				if(tabs[key-49]) swap_tabs(tabs[key-49].readAttribute('val'));
				Event.stop(e);
				break;
			case 97: case 65: //a
				showShare(e);
				break;
			case 105: case 73: //i
				showFilter(e);
				break;
			case 116: case 84: //t
				showSort(e);
				break;
			
			case 122: case 90: //z
				if($('action_hidedetails').visible()) hideDetails(e);
				else getall_dets(e);
				break;
			case 119: case 87: //w
				toggleDividers(e);
				break;
			case 106: case 74: //j
				swapSubtaskFilter(0);Event.stop(e);
				break;
			case 107: case 75: //k
				swapSubtaskFilter(1);Event.stop(e);
				break;
			case 108: case 76: //l
				swapSubtaskFilter(2);Event.stop(e);
				break;
			
			case 27: //esc
				cancelAllEditables();
				//cancelAdd(null);
				break;
			case 191: case 63: //?
				showShortcuts(); Event.stop(e);
				break;
			default://unused: qyusxb
				$('status').update("main"+key);
				break;
		}
	}
}

function captureTab(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');

	if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		obj.blur();
		parselEvent(next);
	}
}

function getNextEditableField(obj) {
	var next = null;
	if(obj==null) return null;
	
	var id = obj.id.sub(/\D+/,'');
	
	if(id=="0" && $('bulktable')) {
		if(shift_down) next = obj.up('tr').previous('tr');
		else next = obj.up('tr').next('tr');
		if(next) var test = next.down('select');
		if(test) next=test;
		else if(next) next = next.down('input');
	} else if(id=="0") { //add
		if(shift_down) {
			if(obj.up('div').previous('div').id=='uidunique') {
				next = $('uidunique').childElements().last();
			} else {
				next = obj.up('div').previous('div.field');
			}
		} else {
			next = obj.up('div').next('div.field');
		}
		if(next) var test = next.down('select');
		if(test) next=test;
		else if(next) next = next.down('input');
		
	} else if($('tasks').readAttribute('cols')=="1") { //grid
		if(shift_down) {
			next = obj.up('div').previous('div');
			while(next && (next.hasClassName('col97') || next.hasClassName('col98') || next.hasClassName('col99') || next.hasClassName('col64'))) next = next.previous('div'); //skip over noneditable
		} else {
			next = obj.up('div').next('div');
			while(next && (next.hasClassName('col97') || next.hasClassName('col98') || next.hasClassName('col99') || next.hasClassName('col64'))) next = next.next('div'); //skip over noneditable
		}
		if(next) next = next.down('span');
		if(next && (!next.id || !next.visible())) return getNextEditableField(next);//subtask folder
		
		if(!next) { //go to next row
			if(shift_down) next = obj.up('div').up('div').previous('div.row');
			else next = obj.up('div').up('div').next('div.row');
			if(next && !next.visible()) return null; //hidden row
			if(next) next = next.down('div.dett'); 
			if(next) next = next.down('span');
		}
	} else {
		if(obj.hasClassName('task')) {
			if($('dets'+id) && $('dets'+id).visible() && shift_down==0) { //go into details
				next = $('dets'+id).down('div');
				if(next) next = next.down('span');
				if(next && (!next.id || !next.visible())) return getNextEditableField(next);//subtask folder
			} else { //next title
				if(shift_down) next = obj.up('div').previous('div.row');
				else next = obj.up('div').next('div.row');
				if(next && !next.visible()) return null; //hidden row
				if(next) next = next.down('span');
			}
			if(!next) { //go to next row
				if(shift_down) next = obj.up('div').previous('div.row');
				else next = obj.up('div').next('div.row');
				if(next && !next.visible()) return null; //hidden row
				if(next) next = next.down('span');
			}
		} else {
			if(shift_down) {
				next = obj.up('div').previous('div');
				if(!next) {
					next=obj.up('div.row');
					if(next && !next.visible()) return null; //hidden row
				}
			} else {
				next = obj.up('div').next('div');
			}
			if(next) next = next.down('span');
			if(!next) { //go to next row
				if(shift_down) next = obj.up('div').up('div').up('div').previous('div.row');
				else next = obj.up('div').up('div').up('div').next('div.row');
				if(next && !next.visible()) return null; //hidden row
				if(next) next = next.down('span');
			}
		}
		
	}
	return next;
}

//registers every click on the task area and determines what to do.
function clicked(e) {
	var obj = Event.element(e);

	parselEvent(obj);
}

function parselEvent(obj) {
	if(obj==undefined || obj==null) return;
	
	var id = obj.id.sub(/\D+/,'');
	var perm = 3;
	if($('tasks')) perm = $('tasks').readAttribute('perm');
	if(offline==1) perm=1;
	
	if(id=="0" || id=="") {
		obj.focus();
	} else if(obj.id.include("check")) {
		hideAllEditables();
		if(perm==3) toggleCheck(id);
	} else if(obj.id.include("tsk")) {
		hideAllEditables();
		if(perm==3) editTask(obj, id);
	} else if(obj.id.include("star")) {
		hideAllEditables();
		if(perm==3) toggleStar(id);
	} else if(obj.id.include("pri")) {
		hideAllEditables();
		if(perm==3) editPri(obj, id);
	} else if(obj.id.include("due") && !obj.id.include("sep")) {
		hideAllEditables();
		if(perm==3) editDue(obj, id);
	} else if(obj.id.include("std")) {
		hideAllEditables();
		if(perm==3) editStart(obj, id);
	} else if(obj.id.include("stm")) {
		hideAllEditables();
		if(perm==3) editStm(obj, id);
	} else if(obj.id.include("rep")) {
		hideAllEditables();
		if(perm==3) editRep(obj, id);
	} else if(obj.id.include("tag")) {
		hideAllEditables();
		if(perm==3) editTag(obj, id);
	} else if(obj.id.include("len")) {
		hideAllEditables();
		if(perm==3) editLen(obj, id);
	} else if(obj.id.include("fol")) {
		hideAllEditables();
		if(perm==3) editFol(obj, id);
	} else if(obj.id.include("con")) {
		hideAllEditables();
		if(perm==3) editCon(obj, id);
	} else if(obj.id.include("gol")) {
		hideAllEditables();
		if(perm==3) editGol(obj, id);
	} else if(obj.id.include("sat") && !obj.id.include("ksat")) {
		hideAllEditables();
		if(perm==3) editStat(obj, id);
	} else if(obj.id.include("tig")) {
		hideAllEditables();
		if(perm==3) toggleTimer(obj, id);
	} else if(obj.id.include("tim")) {
		hideAllEditables();
		if(perm==3) editTim(obj, id);
	} else if(obj.id.include("asn")) {
		hideAllEditables();
		if(perm==3) editAsn(obj, id);
	} else if(obj.id.include("del")) {
		hideAllEditables();
		if(perm==3) deleteTask(obj, id);
	} else if(obj.id.include("show")) {
		hideAllEditables();
		showDets(obj, id);
	} else if(obj.id.include("hide")) {
		hideAllEditables();
		hideDets(obj, id);
	} else if(obj.id.include("noteic")) {
		hideAllEditables();
		if($('tasks').readAttribute('cols')=="1") toggleNote($('note'+id),id);
		else if(perm==3) editNote($('note'+id), id);
	} else if(obj.id.include("addnote")) {
		hideAllEditables();
		if(perm==3) addNote(obj, id);
	} else if(obj.id.include("note") && !obj.id.include("sepnote")) {
		hideAllEditables();
		if(perm==3) editNote(obj, id);
	} else if(obj.id.include("atc")) {
		hideAllEditables();
		showFiles(obj, id, perm);
	} else if(obj.id.include("par")) {
		hideAllEditables();
		getParent(obj, id);
	} else if(obj.id.include("sub")) {
		hideAllEditables();
		getSubtasks(id, 0,0);
	} else if(obj.id.include("hdup")) {
		hideAllEditables();
		duplicateTask(id);
	} else if(rid = ancestorIncludes(obj,'note')) { //handles clicking on HTML elements inside a note
		if(obj.tagName!="A") { //treat link clicks as normal
			id = rid.sub(/\D+/,'');
			if(perm==3) editNote($('note'+id), id);
		}
	} else {
		//alert(obj.tagName+" "+obj.id+"-"+obj.innerHTML);
	}
}

//callback when edit was saved
function saved(ret) {
	var res = ret.responseText;
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		$('think'+res).remove();
	}
}

// DETAILS  =========================================================================================================

function toggleIcon(id,revealed) {
	var obj = $(id);
	var id = obj.id.sub(/\D+/,'');
	
	if(revealed==1) {
		obj.src="/images/icons/hide.gif";
		obj.className="ihd";
		obj.id="hide"+id;
	} else {
		obj.src="/images/icons/show.gif";
		obj.className="isd";
		obj.id="show"+id;
	}
}

function showDets(obj, id) {
	var u = $('tasks').readAttribute('user');
	var s1=s2=s3=0;
	if($('status')) {
		s1 = $('status').readAttribute('s');
		s2 = $('status').readAttribute('s2');
		s3 = $('status').readAttribute('s3');
	}
	var subtasks = 0;
	if(obj.up('.subtasks')) subtasks=1;
	
	toggleIcon('show'+id,1);
	
	if($('dets'+id).visible()) {
		new Ajax.Updater('dets'+id, '/ajax/view_details.php', {method: 'post', postBody: 'id='+id+'&sub='+subtasks+'&u='+u+'&s1='+s1+'&s2='+s2+'&s3='+s3} );
	} else {
		$('dets'+id).show();
	}
}

function hideDets(obj, id) {
	var sort = 0;
	
	toggleIcon('hide'+id,0);
	
	$('dets'+id).hide();
}

// ADD TASK =========================================================================================================

function taskAdded(ret) {
	var res = ret.responseText;
	var ass=0;
	
	if($('asgg')) var ass = $F('asgg');
	var uid = $('tasks').readAttribute('user');
	$('formAddTask').setAttribute('submitting',0);
	
	if(res=='' || res[0]=="0") { 
		alert("There was an error and the task was not added.");
	} else if(ass!=0 && uid!=ass) {
		alert("The task has been added to your collaborator's list.");
		cancelAdd(null);
	} else {
		//display or sort new task
		new Insertion.Top('tasks',res);
		if($('t0ev')) $('t0ev').remove();
		cancelAdd(null);
	}
}

function addType(e) {
	var obj = Event.element(e);
	
	if(obj.hasClassName('addnote')) return;
	
	if(e.keyCode == Event.KEY_RETURN) {
		addTask(e);
	}
}

//submits the form via ajax
function addTask(e) {
	Event.stop(e);
	if($F('title')=="") {
		alert("You must give your task a name.");
		$('title').focus();
	} else {
		if($('status')) {
			$('adds1').value = $('status').readAttribute('s');
			$('adds2').value = $('status').readAttribute('s2');
			$('adds3').value = $('status').readAttribute('s3');
		}
		var submitting = $('formAddTask').readAttribute('submitting');
		if(submitting==0) {
			$('formAddTask').setAttribute('submitting',1);
			$('formAddTask').request({ onComplete: taskAdded });
		}
	}
}

function newStar(e) {
	$('star').value = switchStar('new');
}

function changedAssignor() {
	var ass = $F('asgg');
	
	new Ajax.Updater('uidunique', '/ajax/get_folgolcon.php', {method: 'post', postBody: 'them='+ass} );
	$('uidunique').setAttribute('user',ass);
}

function addStartFocus(id) {
	editStart($(id),id);
	return;
}

function addDueFocus(id) {
	editDue($(id),id);
	return;
}

// DELETE TASK =========================================================================================================

function deletedTask(ret) {
	var res = ret.responseText;
	
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		if($('row'+res)) {
			var parent = $('row'+res).up(".subtasks");
			$('row'+res).remove();
			if(parent) {
				gotSubs(parent.id.sub(/\D+/,''));
			}
		} else {
			$('row'+res).remove();
		}
	}
}

function deleteTask(obj, id) {
	var mess = "Are you sure you want to permanently delete this task?";
	if($('sub'+id)) mess = "Are you sure you want to permanently delete this task AND all of its subtasks?";
	if(confirm(mess)) {
		var u = $('tasks').readAttribute('user');
		new Ajax.Request( '/ajax/delete_task.php', {method: 'post', postBody: 'id='+id+'&u='+u, onSuccess: deletedTask } );
		obj.src="/images/icons/think2.gif";
	}
}


// EDIT TASK =========================================================================================================

//looks for return key when you are editing a task
function taskType(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		obj.blur();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		obj.blur();
		parselEvent(next);
	}
}

//saves an edit
function saveTask(id) {
	var u = $('tasks').readAttribute('user');
	var newval = $("ksat"+id).value.replace(/\|/g,"");
	var oldval = $("tsk"+id).innerHTML.unescapeHTML();
	
	if($("tsk"+id).title!=null) var overflow = $("tsk"+id).title; //ie8 bug
	else var overflow = $("tsk"+id).readAttribute("title");
	
	if(overflow!=null && overflow.length>0) oldval = overflow;	
	
	if(newval!=oldval && newval!='') {
		var txtval = newval.escapeHTML();
		if($('tasks').readAttribute('cols')=="1") {
			$("tsk"+id).update(txtval);
			if(txtval.length>45) $("tsk"+id).setAttribute("title",txtval);
			else $("tsk"+id).setAttribute("title",'');
		} else {
			$("tsk"+id).update(txtval);
		}
		new Insertion.After("tsk"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_task.php', {method: 'post', postBody: 'id='+id+'&title='+encodeURIComponent(newval)+'&u='+u, onSuccess: saved } );
	}
	
	Event.stopObserving("ksat"+id,'keypress', taskType);
	$("ksat"+id).remove();
	$("tsk"+id).show();
}

function editTask(obj, id) {
	var val = obj.innerHTML.replace(/"/g,"&quot;");
	
	if(obj.title!=null) var overflow = obj.title; //ie8 bug
	else var overflow = obj.readAttribute("title");
	
	if(overflow!=null && overflow.length>0) val = overflow.replace(/"/g,"&quot;");
	
	obj.hide();
	new Insertion.After(obj,"<input type='text' id='ksat"+id+"' maxlength='255' class='task' value=\""+val+"\" onblur='saveTask("+id+");' />");
	$("ksat"+id).focus();
	Event.observe("ksat"+id,'keypress', taskType);
	
	if(!Prototype.Browser.IE) setTimeout("if($('ksat"+id+"')) $('ksat"+id+"').focus();", 100); //FF bug

}

// EDIT NOTE =========================================================================================================
function linkReplace(str) {
	var	re = new RegExp("<a href=\"(http[s]?:[^\"]*)\" auto=\"1\">[^<]*<\/a>", "gi");
	str = str.replace(re, "$1");
	
	return str;
}
function nl2br(str) {
	str = str.replace(/\r|\n|\r\n/g, "<br />");
	return str;
}
function br2nl(str) {
	if(navigator.appName=="Microsoft Internet Explorer") { //IE is stupid
		str = str.replace(/<br>/gi,"\n");
		str = str.replace(/<br \/>/gi,"\n");
		str = str.replace(/<br\/>/gi,"\n");
	} else {
		str = str.replace(/<br>/gi,"");
		str = str.replace(/<br \/>/gi,"");
		str = str.replace(/<br\/>/gi,"");
	}
	return str;
}
function savedNote(ret) {
	var res = ret.responseText;
	
	var id = res.substr(0,res.indexOf(" "));
	var note = res.substr(res.indexOf(" ")+1);
		
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		$('think'+id).remove();
		if($("noteic"+id)) $("noteic"+id).show();
		
		if(note.length==0) {
			if($('tasks').readAttribute('cols')=="1") { //cols
				$("note"+id).remove();
				new Insertion.Before($("insert"+id),"<img src='/images/icons/na.gif' class='right' id='addnote"+id+"' width='16' height='16' alt='Add Note' />");
			} else {
				$($("note"+id).parentNode).remove();
				new Insertion.Before($("insert"+id),"<div class='det'><img src='/images/icons/na.gif' class='left' id='addnote"+id+"' width='16' height='16' alt='Add Note' /></div>");
			}
		} else {
			$("note"+id).update(linkReplace(note));
		}
	}
}

//saves an edit
function saveNote(id) {
	var u = $('tasks').readAttribute('user');
	var newval = $("eton"+id).value.replace(/"/g,"&quot;");
	var oldval = linkReplace(br2nl($("note"+id).innerHTML.strip())).replace(/"/g,"&quot;");
	
	if(newval=="" && oldval=="") {
		if($('tasks').readAttribute('cols')=="1") { //cols
			$("noteic"+id).remove();
			$("note"+id).remove();
			new Insertion.Before($("insert"+id),"<img src='/images/icons/na.gif' class='right' id='addnote"+id+"' width='16' height='16' alt='Add Note' />");
		} else {
			$($("note"+id).parentNode).remove();
			new Insertion.Before($("insert"+id),"<div class='det'><img src='/images/icons/na.gif' class='left' id='addnote"+id+"' width='16' height='16' alt='Add Note' /></div>");
		}
	} else if(newval=="") {
		$("note"+id).update();
		if($('tasks').readAttribute('cols')=="1") $("noteic"+id).remove();
		
		new Insertion.Before($("insert"+id),"<img src='/images/icons/think2.gif' width='16' height='16' class='left' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_note.php', {method: 'post', postBody: 'id='+id+'&u='+u+'&n=', onSuccess: savedNote } );

	} else if(newval!=oldval) {
		$("note"+id).update(linkReplace(nl2br(newval)));
		
		new Insertion.Before("note"+id,"<img src='/images/icons/think2.gif' width='16' height='16' class='left' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_note.php', {method: 'post', postBody: 'id='+id+'&u='+u+'&n='+encodeURIComponent(newval), onSuccess: savedNote } );
	
	} else {
		$("noteic"+id).show();
	}
	
	if($("note"+id)) $("note"+id).show();
	$("eton"+id).remove();
}

function addNote(obj, id) {
	if($('tasks').readAttribute('cols')=="1") { //cols
		obj.remove();
		new Insertion.Before($("insert"+id),"<img src='/images/icons/nv.gif' class='right' id='noteic"+id+"' width='16' height='16' alt='Note:' style='display:none;' />");
		new Insertion.After($("insert"+id),"<div class='note' id='note"+id+"' style='display:none;'></div><textarea class='ednote' id='eton"+id+"' onblur='saveNote("+id+");'></textarea>");
	} else {
		$(obj.parentNode).remove();
		new Insertion.After($("insert"+id),"<div class='note'><img src='/images/icons/nv.gif' class='left' id='noteic"+id+"' width='16' height='16' alt='Note:' style='display:none;' /><div id='note"+id+"' style='display:none;'></div></div><textarea class='ednote' id='eton"+id+"' onblur='saveNote("+id+");'></textarea>");
	}
	$("eton"+id).focus();
}

function editNote(obj, id) {
	if(id==0) return;
	if($('think'+id)) return;
	var val = linkReplace(br2nl(obj.innerHTML.strip())).replace(/"/g,"&quot;");
	var height = obj.offsetHeight/16;
	var style="";
	if(height>8) {
		if(height>60) height=60;
		style="style='height:"+height+"em;'";
	}
	if($("noteic"+id)) $("noteic"+id).hide(); //hide icon
	obj.hide(); //hide text note
	new Insertion.After(obj,"<textarea class='ednote' "+style+" id='eton"+id+"' onblur='saveNote("+id+");'>"+val+"</textarea>");
	$("eton"+id).focus();
}

function toggleNote(obj, id) {
	obj.toggle();
}

// EDIT PRIORITY =========================================================================================================

function priHTML2Num(html) {
	if(html.include("-1")) return -1;
	else if(html.include("0")) return 0;
	else if(html.include("1")) return 1;
	else if(html.include("2")) return 2;
	else if(html.include("3")) return 3;
}

function priNum2HTML(num) {
	if(num==-1) return "-1 Negative";
	else if(num==0) return "0 Low";
	else if(num==1) return "1 Medium";
	else if(num==2) return "2 High";
	else if(num==3) return "3 Top";
}

//saves an edit
function savePri(id,prefix) {
	var newval = $("irp"+id).value;
	var oldval = priHTML2Num($("pri"+id).innerHTML);
	var u = $('tasks').readAttribute('user');
	
	if(newval!=oldval) {
		if(prefix) {
			$("pri"+id).update("Priority: "+priNum2HTML(newval));
		} else {
			if($('tasks').readAttribute('cols')=="1") $("pri"+id).update(priNum2HTML(newval));
			else $("pri"+id).update(priNum2HTML(newval)+" Priority");
		}
		$("pri"+id).className="pri"+newval;
		new Insertion.After("pri"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_pri.php', {method: 'post', postBody: 'id='+id+'&p='+newval+'&u='+u, onSuccess: saved } );
	}
	uneditPri(id);
}

function uneditPri(id) {
	if($("irp"+id)!=null) {
		Event.stopObserving("irp"+id,'keypress', captureTab);
		Element.remove("irp"+id);
	}
	$("pri"+id).show();
}

function editPri(obj, id) {
	var val = priHTML2Num(obj.innerHTML);
	
	var pn = ""; var p0 = ""; var p1 = ""; var p2 = ""; var p3 = "";
	if(val==-1) pn = " selected='selected'";
	else if(val==0) p0 = " selected='selected'";
	else if(val==1) p1 = " selected='selected'";
	else if(val==2) p2 = " selected='selected'";
	else if(val==3) p3 = " selected='selected'";
	
	var prefix=0;
	if(obj.innerHTML.include("Priority:")) prefix=1;
	
	obj.hide();
	new Insertion.After(obj,"<select class='inplace' id='irp"+id+"' onchange='savePri("+id+","+prefix+");' onblur='uneditPri("+id+");' ><option value='-1'"+pn+">-1 Negative</option><option value='0'"+p0+">0 Low</option><option value='1'"+p1+">1 Medium</option><option value='2'"+p2+">2 High</option><option value='3'"+p3+">3 Top</option></select>");
	
	if(!Prototype.Browser.IE) $("irp"+id).focus(); //in IE, the tab keyup event from the previous field actually triggers a blur on old style event handelers, so we need to wait for the keyup before we focus
	Event.observe("irp"+id,'keypress', captureTab);
	setTimeout("if($('irp"+id+"')) $('irp"+id+"').focus();", 100);
}

// EDIT STATUS =========================================================================================================

function statHTML2Num(html) {
	if(html.include("Next")) return 1;
	else if(html.include("Active")) return 2;
	else if(html.include("Plan")) return 3;
	else if(html.include("Dele")) return 4;
	else if(html.include("Wait")) return 5;
	else if(html.include("Hold")) return 6;
	else if(html.include("Post")) return 7;
	else if(html.include("Some")) return 8;
	else if(html.include("Canc")) return 9;
	else if(html.include("Ref")) return 10;
}

function statNum2HTML(num) {
	if(num==0) return "None";
	else if(num==1) return "Next Action";
	else if(num==2) return "Active";
	else if(num==3) return "Planning";
	else if(num==4) return "Delegated";
	else if(num==5) return "Waiting";
	else if(num==6) return "Hold";
	else if(num==7) return "Postponed";
	else if(num==8) return "Someday";
	else if(num==9) return "Canceled";
	else if(num==10) return "Reference";
}

//saves an edit
function saveStat(id,prefix) {
	var newval = $("tas"+id).value;
	var oldval = statHTML2Num($("sat"+id).innerHTML);
	var u = $('tasks').readAttribute('user');
	
	if(newval!=oldval) {
		if(prefix) {
			$("sat"+id).update("Status: "+statNum2HTML(newval));
		} else {
			if($('tasks').readAttribute('cols')=="1") $("sat"+id).update(statNum2HTML(newval));
			else $("sat"+id).update(statNum2HTML(newval));
		}
		if(newval!=0) $("sat"+id).removeClassName("dim");
		else if(prefix==0) $("sat"+id).addClassName("dim");
	
		new Insertion.After("sat"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_stat.php', {method: 'post', postBody: 'id='+id+'&s='+newval+'&u='+u, onSuccess: saved } );
	}
	uneditStat(id);
}

function uneditStat(id) {
	if($("tas"+id)!=null) { 
		Event.stopObserving("tas"+id,'keypress', captureTab);
		Element.remove("tas"+id);
	}
	$("sat"+id).show();
}

function editStat(obj, id) {
	var val = statHTML2Num(obj.innerHTML);

	var pn = ""; var p0 = ""; var p1 = ""; var p2 = ""; var p3 = ""; var p4 = ""; var p5 = ""; var p6 = ""; var p7 = ""; var p8 = ""; var p9 = ""; var p10 = "";
	if(val==0) p0 = " selected='selected'";
	else if(val==1) p1 = " selected='selected'";
	else if(val==2) p2 = " selected='selected'";
	else if(val==3) p3 = " selected='selected'";
	else if(val==4) p4 = " selected='selected'";
	else if(val==5) p5 = " selected='selected'";
	else if(val==6) p6 = " selected='selected'";
	else if(val==7) p7 = " selected='selected'";
	else if(val==8) p8 = " selected='selected'";
	else if(val==9) p9 = " selected='selected'";
	else if(val==10) p10 = " selected='selected'";
	
	var prefix=0;
	if(obj.innerHTML.include("Status:")) prefix=1;
	
	obj.hide();
	new Insertion.After(obj,"<select class='inplace' id='tas"+id+"' onchange='saveStat("+id+","+prefix+");' onblur='uneditStat("+id+");' ><option value='0'"+p0+">None</option><option value='1'"+p1+">Next Action</option><option value='2'"+p2+">Active</option><option value='3'"+p3+">Planning</option><option value='0' disabled='true'>----</option><option value='4'"+p4+">Delegated</option><option value='5'"+p5+">Waiting</option><option value='6'"+p6+">Hold</option><option value='7'"+p7+">Postponed</option><option value='8'"+p8+">Someday</option><option value='9'"+p9+">Canceled</option><option value='10'"+p10+">Reference</option></select>");
	
	if(!Prototype.Browser.IE) $("tas"+id).focus();
	Event.observe("tas"+id,'keypress', captureTab);
	setTimeout("if($('tas"+id+"')) $('tas"+id+"').focus();", 100);
}

// EDIT REPEAT =========================================================================================================

function repNum2HTML(num) {
	if(num>=100) num-=100;
	if(num==0) return "None";
	if(num==1) return "Weekly";
	if(num==2) return "Monthly";
	if(num==3) return "Yearly";
	if(num==4) return "Daily";
	if(num==5) return "Biweekly";
	if(num==6) return "Bimonthly";
	if(num==7) return "Semiannually";
	if(num==8) return "Quarterly";
	if(num==9) return "With Parent";
}

function savedRep(ret) {
	var res = ret.responseText;
	
	var pieces = res.split("#");
	var id = pieces[0];
	var rep = pieces[1];
	var repA = pieces[2];
	
	$('think'+id).remove();
	
	$("rep"+id).setAttribute('val',rep);
	
	var prefix=0;
	if($("rep"+id).innerHTML.include("Repeat:")) prefix=1;

	if(rep==50 || rep==150) {
		if(!prefix) {
			$("rep"+id).update(repA);
		} else {
			$("rep"+id).update("Repeat: "+repA);
		}
	} else if(rep==0) {
		if(!prefix) {
			$("rep"+id).update('None');
			$("rep"+id).addClassName("dim");
		} else {
			$("rep"+id).update('Repeat: None');
		}
	}

	if(rep>=100) $("rep"+id).setAttribute('title','Repeat from completion date');
	else if(rep!=0) $("rep"+id).setAttribute('title','Repeat from due date');
	else $("rep"+id).setAttribute('title','');
}

function repType(e) {
	var obj = Event.element(e);
	var id = $('repdiv').readAttribute('rid');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		handleChangedRep();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField($("rep"+id));
		handleChangedRep();
		parselEvent(next);
	} else if(e.keyCode==Event.KEY_ESC) {
		Event.stop(e);
		cancelRepeat();
	}
}

function cancelRepeat() {
	if($('repdiv') && $('repdiv').visible()) {
		var id = $('repdiv').readAttribute('rid');
		$('repdiv').hide();
		$('repsimpval').blur();
		$('repcomplxval').blur();
		$("rep"+id).show();
		Event.stopObserving('repdiv', 'mouseout', mouseOutRep);
		Event.stopObserving('repdiv', 'keypress', repType);
	}
}

function handleChangedRep() {
	if($('repdiv')==null) return
	if(!$('repdiv').visible()) return;
	
	$('repdiv').hide();
	$('repsimpval').blur();
	$('repcomplxval').blur();
			
	if($('repsimp').visible()) {
		var val = parseInt($F('repsimpval'));
		var valA = '';
	} else {
		var val = 50;
		var valA = $F('repcomplxval');
		if(valA=='') val=0;
	}
	if($('reptype2').checked && val!=0) val+=100;
	var id = $('repdiv').readAttribute('rid');
	var prefix = parseInt($('repdiv').readAttribute('prefix'));
	saveRep(val,valA,id,prefix);
	
	Event.stopObserving('repdiv', 'mouseout', mouseOutRep);
	Event.stopObserving('repdiv', 'keypress', repType);
}

function mouseOutRep(e) {
	var obj = Event.element(e);
	var relTarg = e.relatedTarget || e.toElement;
	Event.stop(e);

	if(relTarg && relTarg.tagName=='HTML' && (obj.id=='repsimp' || obj.id=='repsimpval')) return; //FF3 bug
	
	if(relTarg && relTarg.id!='repdiv' && $(relTarg).descendantOf('repdiv')==false) {
		handleChangedRep();
	}
}

//saves an edit
function saveRep(newval,valA,id,prefix) {
	var obj = $("rep"+id);
	var u = $('tasks').readAttribute('user');
	var oldval = parseInt(obj.readAttribute('val'));
	var oldvalA = obj.innerHTML;
	if(obj.hasClassName("dim")) oldval=0;
		
	if(newval!=oldval || ((newval==50 || newval==150) && valA!=oldvalA)) {
		var disp = valA;
		if(newval!=50 && newval!=150) disp = repNum2HTML(newval);
		if(disp=='') disp="None";
		
		if(prefix) $("rep"+id).update("Repeat: "+disp);
		else $("rep"+id).update(disp);
		
		new Insertion.After("rep"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_rep.php', {method: 'post', postBody: 'id='+id+'&r='+newval+'&a='+valA+'&u='+u, onSuccess: savedRep } );
	}
	if(newval!=0) obj.removeClassName("dim");
	else if(prefix==0) obj.addClassName("dim");
	obj.show();
}


function editRep(obj, id) {
	var val = parseInt(obj.readAttribute('val'));
	var prefix=0;
	if(obj.innerHTML.include("Repeat:")) prefix=1;
	
	var edit = $('repdiv');
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('rid',id);
	
	if(val<100) {
		$('reptype1').checked = true;
		$('reptype2').checked = false;
	} else {
		val-=100;
		$('reptype1').checked = false;
		$('reptype2').checked = true;
	}
	
	if(val==50) {
		switchRepOptions(1);
		$('repcomplxval').value=obj.innerHTML.replace(/Repeat: /,"");;
		setSelectedVal($('repsimpval'),0);
	} else {
		switchRepOptions(2);
		setSelectedVal($('repsimpval'),val);
		$('repcomplxval').value='';
	}
	
	var row = obj.up('.row');
	if(row.className.indexOf("parent")!=-1) {
		if($('repopt9')==null) {
			new Insertion.Bottom('repsimpval',"<option id='repopt9' value='9'>With Parent</option>");
		}
	} else {
		if($('repopt9')) $('repopt9').remove(); //disable option 9
	}
	
	positionOnScreen(190,obj,edit);
	
	Event.observe('repdiv', 'mouseout', mouseOutRep);
	Event.observe('repdiv', 'keypress', repType);
	
	if(val==50) {
		$('repcomplxval').focus();
	} else {
		$("repsimpval").focus();
		setTimeout("if($('repsimpval')) $('repsimpval').focus();", 100);
	}
}

function toggleAddRepeat(e) {
	if($('repeatA').visible()) {
		$('repeatA').value='';
		$('repeatA').hide();
		$('repeat').show();
		$('repeat').focus();
	} else {
		$('repeat').hide();
		$('repeatA').show();
		$('repeatA').focus();
	}
}

function switchRepOptions(dir) {	
	if(dir==1) {
		$('repsimp').hide();
		$('repcomplx').show();
		if($('repdiv').visible()) $('repcomplxval').focus(); //IE cant focus invisible input
		$('replnk').update('Simple options...');
	} else {
		$('repcomplx').hide();
		$('repsimp').show();
		if($('repdiv').visible()) $('repsimpval').focus();
		$('replnk').update('Advanced options...');
	}
}
// EDIT FILES =========================================================================================================

function fileStopMouseOut() {
	Event.stopObserving('filediv', 'mouseout', mouseOutFile);
}

function fileClose() {
	if($('filediv')) $('filediv').remove();
}

function mouseOutFile(e) {
	var obj = Event.element(e);
	var relTarg = e.relatedTarget || e.toElement;
	Event.stop(e);

	//$('status').update(relTarg.tagName+relTarg.id+"*"+obj.tagName+obj.id);
	
	//FF error is with looking at the id of a file input
	if(relTarg && relTarg.id!='filediv' && $(relTarg).descendantOf('filediv')==false && obj.tagName!="SELECT" && obj.tagName!="OPTION" && obj.tagName!="IFRAME") {
		fileClose();
	} 
}

function fileUploaded(id) {
	showFiles($("atc"+id),id,3);
}

function attachedFile(ret) {
	var res = ret.responseText;
	
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		showFiles($("atc"+res),res,3);
	}
}

function fileUnattach(id,file) {
	var cont = confirm("This will remove the file from the task but not delete it. To delete the file, you need to visit the Files section.");
	if(!cont) return;
	
	var u = $('tasks').readAttribute('user');
	new Ajax.Request( '/ajax/attach_file.php', {method: 'post', postBody: 'op=2&id='+id+'&file='+file+'&u='+u, onComplete: attachedFile} );
}

function fileAttach(id) {
	var val = $F('selfile');
	if(val=="") return false;
	
	var u = $('tasks').readAttribute('user');
	new Ajax.Request( '/ajax/attach_file.php', {method: 'post', postBody: 'op=1&id='+id+'&file='+val+'&u='+u, onComplete: attachedFile } );	

	return true;
}

function updateFileIcon(ret) {
	var id = $('filediv').readAttribute('task');
	if($('nofiles')==null) $('atc'+id).src="/images/icons/attached.gif";
	else $('atc'+id).src="/images/icons/attach.gif";
	
	//check height for offbottom of screen
	var edit = $('filediv');
	var scroll = getScroll();
	var pos = Position.page(edit);
	
	if(window.innerWidth>0) var win_w = window.innerWidth;
	else var win_w = document.body.clientWidth;
	
	if(window.innerHeight>0) var win_h = window.innerHeight;
	else if(document.body.clientHeight>0) var win_h = document.body.clientHeight;
	else var win_h = document.documentElement.clientHeight;
	
	var mainL = $('main').offsetLeft-scroll.x;
	
	if(Prototype.Browser.Opera) pos[1]-=scroll.y; //Opera needs help
	if(pos[1]+edit.offsetHeight>win_h) {
		var extra=0;		
		if(edit.offsetWidth+mainL>win_w) extra=16; //account for scrollbar
		if(Prototype.Browser.IE) extra-=16;
		edit.style.top = (win_h-edit.offsetHeight-extra+scroll.y)+"px";
	}
	
	//Safari cant do it
	Event.observe('filediv', 'mouseout', mouseOutFile);
}

function showFiles(obj,id,perm) {
	if($('filediv')!=null) fileClose();
	new Insertion.After('tasks',"<div id='filediv' task='"+id+"' style='display:none;'>Loading...</div>");
	var edit = $('filediv');
		
	var leftOffset = -280;
	if($('tasks').readAttribute('cols')=="0") leftOffset = -20;
	Position.clone(obj,'filediv',{ setWidth: false, setHeight: false, offsetTop: -5, offsetLeft: leftOffset });
	edit.show();
	
	var scroll = getScroll();
		
	var pos = Position.page(edit);
	
	var width=290;
	
	if(window.innerWidth>0) var win_w = window.innerWidth;
	else var win_w = document.body.clientWidth;
	
	if(window.innerHeight>0) var win_h = window.innerHeight;
	else if(document.body.clientHeight>0) var win_h = document.body.clientHeight;
	else var win_h = document.documentElement.clientHeight;
	
	var mainL = $('main').offsetLeft-scroll.x;
	
	if(pos[0]+width>win_w) { //nudge over because it would be off the right side
		var extra=12;
		if($('tasks').offsetHeight+$('tasks').offsetTop>win_h || $('toc').offsetHeight+$('toc').offsetTop>win_h) extra+=16; //account for scrollbar
		edit.style.left = (win_w-width-mainL-extra)+"px";
	}
	
	var u = $('tasks').readAttribute('user');
	new Ajax.Updater('filediv', '/ajax/get_files.php', {method: 'post', postBody: 'id='+id+'&u='+u, onComplete: updateFileIcon} );
}

// EDIT TIMER =========================================================================================================

//looks for return key when you are editing a task
function timType(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		$("mit"+id).blur();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		$("mit"+id).blur();
		parselEvent(next);
	}
}

//saves an edit
function saveTim(id,prefix) {
	var u = $('tasks').readAttribute('user');
	var newval = $("mit"+id).value;
	var oldval = $("tim"+id).innerHTML;
	var counting = $("tig"+id).src.indexOf("pause");
	
	newval = reformatTime(newval,2);
	
	if(newval!=oldval) {
		if(prefix) $("tim"+id).update("Length: "+newval);
		else $("tim"+id).update(newval);
		
		new Insertion.After("tim"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_tim.php', {method: 'post', postBody: 'id='+id+'&t='+newval+'&u='+u, onSuccess: saved } );
	}
	
	if(counting!==-1 && newval==0) $("tim"+id).update('0:00');
	
	Event.stopObserving("mit"+id,'keypress', timType);
	$("mit"+id).remove();
	$("tim"+id).show();
}

function editTim(obj, id) {
	var val = obj.innerHTML;
	if(obj.hasClassName("dim")) val="";
	
	var prefix=0;
	if(obj.innerHTML.include("Timer:")) prefix=1;
	
	obj.hide();
	new Insertion.After(obj,"<input type='text' id='mit"+id+"' class='time' value=\""+val+"\" onblur='saveTim("+id+","+prefix+");' />");
	$("mit"+id).focus();
	Event.observe("mit"+id,'keypress', timType);
	
	if(!Prototype.Browser.IE) setTimeout("if($('mit"+id+"')) $('mit"+id+"').focus();", 100); //FF bug
}

// EDIT FOLDER =========================================================================================================

function updateFolderVal(id,prefix,txtval,newval) {
	if(!$("fol"+id)) return;
	
	if(prefix==1) {
		$("fol"+id).update("Folder: "+truncate(txtval,14));
		if(txtval.length>15) $("fol"+id).setAttribute("title",txtval);
		else $("fol"+id).setAttribute("title",'');
	} else if($('tasks').readAttribute('cols')=="1") { //column view
		$("fol"+id).update(txtval);
		if(newval==0) $("fol"+id).update("No Folder");
		
		if(txtval.length>22) $("fol"+id).setAttribute("title",txtval);
		else $("fol"+id).setAttribute("title",'');
	} else {
		$("fol"+id).update(txtval);
		if(newval==0) $("fol"+id).update("none");
	}
	$("fol"+id).setAttribute("old",newval);
	
	uneditFol(id);
	if(newval!=0) $("fol"+id).removeClassName("dim");
	else if(prefix==0) $("fol"+id).addClassName("dim");
}

function saveFol(e) {
	var obj = Event.element(e);
	var id = obj.readAttribute('fid');
	var prefix = parseInt(obj.readAttribute('prefix'));
	var u = $('tasks').readAttribute('user');
	
	var newval = $("lof"+id).value;
	var oldval = $("fol"+id).readAttribute("old");
	 
	if(newval!=oldval) {
		var txtval = getSelected(obj,newval);
		txtval = txtval.replace(/&/g,"&amp;");
		
		updateFolderVal(id,prefix,txtval,newval);
		
		new Insertion.After("fol"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_fol.php', {method: 'post', postBody: 'id='+id+'&f='+newval+'&u='+u, onSuccess: saved } );
	} else {
		uneditFol(id);
		if(newval!=0) $("fol"+id).removeClassName("dim");
		else if(prefix==0) $("fol"+id).addClassName("dim");
	}
}

function uneditFol(id) {
	
	var edit = $("lof"+id);
	if(edit!=null) {
		Event.stopObserving("lof"+id,'change', saveFol);
		Event.stopObserving("lof"+id,'blur', saveFol);
		Event.stopObserving("lof"+id,'keypress', captureTab);
	
		edit.id = "fol0";
		$('hiddenarea').appendChild(edit);
	}
	$("fol"+id).show();
}

function editFol(obj, id) {
	var prefix=0;
	if(obj.innerHTML.include("Folder:")) prefix=1;
	
	var edit = $('fol0');
	edit.id = "lof"+id;
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('fid',id);
	
	setSelectedVal(edit,obj.readAttribute('old'));
	
	obj.hide();
	obj.parentNode.insertBefore(edit,obj);
	
	Event.observe("lof"+id,'change', saveFol);
	Event.observe("lof"+id,'blur', saveFol);
		
	$("lof"+id).focus();
	Event.observe("lof"+id,'keypress', captureTab);
	if(!Prototype.Browser.IE) setTimeout("if($('lof"+id+"')) $('lof"+id+"').focus();", 100);
}

// EDIT CONTEXT =========================================================================================================

//saves an edit
function saveCon(e) {
	var obj = Event.element(e);
	var id = obj.readAttribute('cid');
	var prefix = parseInt(obj.readAttribute('prefix'));
	var u = $('tasks').readAttribute('user');
		
	var newval = $("noc"+id).value;
	var oldval = $("con"+id).readAttribute("old");
	
	if(newval!=oldval) {
		var txtval = getSelected(obj,newval);
		txtval = txtval.replace(/&/g,"&amp;");
		if(prefix==1) { //inside
			$("con"+id).update("Context: "+truncate(txtval,14));
			if(txtval.length>15) $("con"+id).setAttribute("title",txtval);
			else $("con"+id).setAttribute("title",'');
		} else if($('tasks').readAttribute('cols')=="1") { //column view
			$("con"+id).update(txtval);
			if(newval==0) $("con"+id).update("No Context");
			
			if(txtval.length>14) $("con"+id).setAttribute("title",txtval);
			else $("con"+id).setAttribute("title",'');
		} else { //outside
			$("con"+id).update(txtval);
			if(newval==0) $("con"+id).update("none");
		}
		$("con"+id).setAttribute("old",newval)
		
		new Insertion.After("con"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_con.php', {method: 'post', postBody: 'id='+id+'&c='+newval+'&u='+u, onSuccess: saved } );
	}
	
	uneditCon(id);
	if(newval!=0) $("con"+id).removeClassName("dim");
	else if(prefix==0) $("con"+id).addClassName("dim");
}

function uneditCon(id) {
	
	var edit = $("noc"+id);
	if(edit!=null) {
		Event.stopObserving("noc"+id,'change', saveCon);
		Event.stopObserving("noc"+id,'blur', saveCon);
		Event.stopObserving("noc"+id,'keypress', captureTab);
	
		edit.id = "con0";
		$('hiddenarea').appendChild(edit);
	}
	$("con"+id).show();
	
}

function editCon(obj, id) {
	var prefix=0;
	if(obj.innerHTML.include("Context:")) prefix=1;
	
	var edit = $('con0');
	edit.id = "noc"+id;
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('cid',id);
	
	setSelectedVal(edit,obj.readAttribute('old'));
	
	obj.hide();
	obj.parentNode.insertBefore(edit,obj);
	
	Event.observe("noc"+id,'change', saveCon);
	Event.observe("noc"+id,'blur', saveCon);
		
	$("noc"+id).focus();
	Event.observe("noc"+id,'keypress', captureTab);
	if(!Prototype.Browser.IE) setTimeout("if($('noc"+id+"')) $('noc"+id+"').focus();", 100);
}

// EDIT GOAL =========================================================================================================

//saves an edit
function saveGol(e) {
	var obj = Event.element(e);
	var id = obj.readAttribute('gid');
	var prefix = parseInt(obj.readAttribute('prefix'));
	var u = $('tasks').readAttribute('user');
		
	var newval = $("log"+id).value;
	var oldval = $("gol"+id).readAttribute("old");

	if(newval!=oldval) {
		var txtval = getSelected(obj,newval);
		txtval = txtval.replace(/&/g,"&amp;");
		if(prefix==1) {
			$("gol"+id).update("Goal: "+truncate(txtval,14));
			if(txtval.length>15) $("gol"+id).setAttribute("title",txtval);
			else $("gol"+id).setAttribute("title",'');
		} else if($('tasks').readAttribute('cols')=="1") { //column view
			$("gol"+id).update(txtval);
			if(newval==0) $("gol"+id).update("No Goal");
			
			if(txtval.length>14) $("gol"+id).setAttribute("title",txtval);
			else $("gol"+id).setAttribute("title",'');
		} else {
			$("gol"+id).update(truncate(txtval,32));
			if(txtval.length>33) $("gol"+id).setAttribute("title",txtval);
			else $("gol"+id).setAttribute("title",'');
			if(newval==0) $("gol"+id).update("none");
		}
		
		$("gol"+id).setAttribute("old",newval)
		
		new Insertion.After("gol"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_gol.php', {method: 'post', postBody: 'id='+id+'&g='+newval+'&u='+u, onSuccess: saved } );
	}
	
	uneditGol(id);
	if(newval!=0) $("gol"+id).removeClassName("dim");
	else if(prefix==0) $("gol"+id).addClassName("dim");
}

function uneditGol(id) {
	
	var edit = $("log"+id);
	if(edit!=null) {
		Event.stopObserving("log"+id,'change', saveGol);
		Event.stopObserving("log"+id,'blur', saveGol);
		Event.stopObserving("log"+id,'keypress', captureTab);
	
		edit.id = "gol0";
		$('hiddenarea').appendChild(edit);
	}
	$("gol"+id).show();
	
}

function editGol(obj, id) {
	var prefix=0;
	if(obj.innerHTML.include("Goal:")) prefix=1;
	
	var edit = $('gol0');
	edit.id = "log"+id;
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('gid',id);
	
	setSelectedVal(edit,obj.readAttribute('old'));
	
	obj.hide();
	obj.parentNode.insertBefore(edit,obj);
	
	Event.observe("log"+id,'change', saveGol);
	Event.observe("log"+id,'blur', saveGol);
		
	$("log"+id).focus();
	Event.observe("log"+id,'keypress', captureTab);
	if(!Prototype.Browser.IE) setTimeout("if($('log"+id+"')) $('log"+id+"').focus();", 100);
}

// EDIT TAG =========================================================================================================

//looks for return key when you are editing a task
function tagType(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		$("gat"+id).blur();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		obj.blur();
		parselEvent(next);
	}
	
}

//saves an edit
function saveTag(id,prefix) {
	var u = $('tasks').readAttribute('user');
	var newval = $("gat"+id).value.replace(/\|/g,"");
	var oldval = $("tag"+id).innerHTML.replace(/Tag: /,"").unescapeHTML();
	if($("tag"+id).hasClassName("dim")) oldval="";
	
	if($("tag"+id).title!=null) var overflow = $("tag"+id).title; //ie8 bug
	else var overflow = $("tag"+id).readAttribute("title");
	
	if(overflow!=null && overflow.length>0) oldval = overflow;
	
	if(newval!=oldval) {
		var txtval = newval.escapeHTML();
		if(prefix==1) {
			$("tag"+id).update("Tag: "+truncate(txtval,24));
			if(txtval.length>25) $("tag"+id).setAttribute("title",txtval);
			else $("tag"+id).setAttribute("title",'');
		} else {
			$("tag"+id).update(txtval);
			if(txtval.length>33) $("tag"+id).setAttribute("title",txtval);
			else $("tag"+id).setAttribute("title",'');
			if(newval.empty()) $("tag"+id).update("none");
		}
		new Insertion.After("tag"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_tag.php', {method: 'post', postBody: 'id='+id+'&t='+encodeURIComponent(newval)+'&u='+u, onSuccess: saved } );
	}
	
	Event.stopObserving("gat"+id,'keypress', tagType);
	$("gat"+id).remove();
	$("tag"+id).show();
	if(!newval.empty()) $("tag"+id).removeClassName("dim");
	else if(prefix==0) $("tag"+id).addClassName("dim");
}

function editTag(obj, id) {
	var val = obj.innerHTML.replace(/"/g,"&quot;").replace(/Tag: /,"");
	if(obj.hasClassName("dim")) val="";
	
	var prefix=0;
	if(obj.innerHTML.include("Tag:")) prefix=1;
	
	if(obj.title!=null) var overflow = obj.title; //ie8 bug
	else var overflow = obj.readAttribute("title");
	
	if(overflow!=null && overflow.length>0) val = overflow.replace(/"/g,"&quot;");
	
	obj.hide();
	new Insertion.After(obj,"<input type='text' id='gat"+id+"' maxlength='64' class='inplace' value=\""+val+"\" onblur='saveTag("+id+","+prefix+");' />");
	$("gat"+id).focus();
	Event.observe("gat"+id,'keypress', tagType);
}

// EDIT STARTDATE =========================================================================================================

function mouseOutStart(e) {
	var obj = Event.element(e);
	var relTarg = e.relatedTarget || e.toElement;
	Event.stop(e);
	
	if(relTarg && relTarg.tagName=='HTML' && (obj.id=='protocal_month' || obj.id=='protocal_year')) return; //FF3 bug
	
	if(relTarg && relTarg.id!='startdiv' && $(relTarg).descendantOf('startdiv')==false && obj.tagName!="SELECT" && obj.tagName!="OPTION") {
		saveStartDateTime();
		startClose();
	}
}

//looks for return key when you are editing a task
function startType(e) {
	var id = $('startdiv').readAttribute('did');
	
	if(e.keyCode == Event.KEY_RETURN) {		
		Event.stop(e);
		saveStartDateTime();
		startClose();
		if(id=="tas0") $('addbtn').focus();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		if($('tts') && $('tts').visible() && shift_down==0) {
			$('tts').focus();
			$('tts').select();
		} else if(id=="medsd") {
			if(shift_down==1) var next = $(id).previous('input');
			else var next = $(id).next('input');
			saveStartDateTime();
			startClose();
			parselEvent(next);
		} else {
			var next=null;
			if(id=="tas0") {
				next = getNextEditableField($("tas0"));
			} else if($("std"+id)) {
				next = getNextEditableField($("std"+id));
			}
			saveStartDateTime();
			startClose();
			parselEvent(next);
		}
	} else if(e.keyCode==Event.KEY_ESC) {
		startClose();
	}
}

function etmType(e) {
	var id = $('startdiv').readAttribute('did');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		saveStartDateTime();
		startClose();
		if(id=="tas0") $('addbtn').focus();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		if(shift_down==1) {
			$('dts').focus();
			$("dts").select();
		} else { 
			if(id=="tas0") {
				var next = getNextEditableField($("tas0"));
			} else {
				var next = getNextEditableField($("std"+id));
			}
			saveStartDateTime();
			startClose();
			parselEvent(next);
		}
	} else if(e.keyCode==Event.KEY_ESC) {
		startClose();
	}
}

function savedStart(ret) {
	var res = ret.responseText;
	
	var pieces = res.split("#");
	var id = pieces[0];
	var unix = pieces[1];
	var time = pieces[2];
	var dispDate = pieces[3];
		
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		
		if(dispDate.length>0) {
			if($("std"+id).innerHTML.include("Start:")) $("std"+id).update("Start: "+dispDate);			
			else $("std"+id).update(dispDate);
			$("std"+id).setAttribute('date',unix);
			$("std"+id).setAttribute('time',time);
			$("std"+id).removeClassName("dim");
		} else {
			if($("std"+id).innerHTML.include("Start:")) {
				$("std"+id).update("Start: no date");
			} else {
				$("std"+id).update("no date");
				$("std"+id).className="dim";
			}
			$("std"+id).setAttribute('date',0);
			$("std"+id).setAttribute('time','');
		}
		$("std"+id).setAttribute("title","");
		if($('think'+id)!=null) $('think'+id).remove();
		
	}
}

function startDblclick(e) {
	var obj = Event.element(e);
	if(!obj.descendantOf('protocal_top')) {
		saveStartDateTime();
		startClose();
	}
}

function popDate2(val) {
	if(val==0) {
		var disp='';
		if($("tts")) $("tts").value = '';
	} else {
		var selectedDate = new Date(parseInt(val));
		var disp = selectedDate.dateFormat(date_format);
	}
	$("dts").value = disp;
	if($("tts") && $("tts").visible()) {
		$("dts").focus();
	} else {
		saveStartDateTime();
		startClose();
	}
}

function startClose() {
	if($('tas0')) $('tas0').show();
	if($('medsd')) $('medsd').show();
	var id = $('startdiv').readAttribute('did');
	$('dts').blur();
	if($('tts')) $('tts').blur();
	if($('protocal_month')) $('protocal_month').blur();
	if($('protocal_year')) $('protocal_year').blur();
	$('startdiv').hide();
	Event.stopObserving('startdiv', 'mouseout', mouseOutDue);
	Event.stopObserving('dts', 'keypress', dueType);
	Event.stopObserving('protocal2','dblclick',startDblclick);
	Event.stopObserving('qdates2','dblclick',startDblclick);
	if($('tts')) Event.stopObserving('tts', 'keypress', stmType);
	if($("std"+id)) $("std"+id).show();
	if(id=="tas0") {
		if($('dts').value=="") {
			$('tas0').setAttribute('date',0);
		} else {
			var newdate=new Date($('dts').value);
			newdate = newdate.getTime();
			if(!isNaN(newdate)) $('tas0').setAttribute('date',newdate/1000);
		}
	} else if(id=="medsd" || ($(id) && $(id).hasClassName('dabs'))) { //search & multiedit
		$(id).show();
		if($('dts').value=="") {
			$(id).setAttribute('date',0);
		} else {
			var newdate=new Date($('dts').value);
			newdate = newdate.getTime();
			if(!isNaN(newdate)) $(id).setAttribute('date',newdate/1000);
		}
	} 
	
	$('startdiv').setAttribute('did',0);
	$('dts').value="";
	if($('tts')) $('tts').value="";
}

function saveStartDateTime() {
	var id = $('startdiv').readAttribute('did');
	if(id=="0") return;
	if($('tasks')) var u = $('tasks').readAttribute('user');
	var prefix=0;
	if($("std"+id) && $("std"+id).innerHTML.include("Start:")) prefix=1;
	
	var newval = $("dts").value;
	
	var newtim = '';
	if($('tts')) newtim = $('tts').value;
	newtim = reformatTime(newtim,3);
	
	var newfull = "no date";
	if(!newval.blank() && !newtim.blank()) newfull = newval+" at "+newtim;
	else if(!newval.blank()) newfull = newval;
	else if(!newtim.blank())  newfull = 'no date at '+newtim;
	
	if(id=="tas0") {
		$('tas0').value = newfull;
		if(newtim.blank()) newtim=" ";		
		$('newend').value = newtim;
		return;
	} else if(id=="medsd" || ($(id) && $(id).hasClassName('dabs'))) {
		$(id).value = newfull;
		return;
	}
	
	var oldval = $('std'+id).innerHTML.replace(/"/g,"&quot;").replace(/Start: /,"");
	
	if(newfull!=oldval) {
		if(prefix) $("std"+id).update("Start: "+newfull);
		else $("std"+id).update(newfull);
		
		new Insertion.After("std"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_start.php', {method: 'post', postBody: 'id='+id+'&d='+newval+'&t='+newtim+'&u='+u, onSuccess: savedStart } );
	}
	
	if(newfull!="no date") $("std"+id).removeClassName("dim");
	else if(prefix==0) $("std"+id).addClassName("dim");
}

function editStart(obj, id) {
	if($('startdiv').visible()) {
		saveStartDateTime();
		startClose();
	}
	if($('duediv').visible()) {
		saveDueDateTime();
		dueClose();
	}
	var val = "";
	if(id=="tas0" || id=="medsd" || obj.hasClassName('dabs')) val = obj.value;
	else  val = obj.innerHTML.replace(/"/g,"&quot;").replace(/Start: /,"");
	if(obj.hasClassName("dim")) val="";
	
	var prefix=0;
	if(id!="tas0" && id!="medsd" && obj.innerHTML.include("Start:")) prefix=1;
	
	var unixdate = obj.readAttribute('date');
	var time = obj.readAttribute('time');
	if(id=="tas0") {
		var prevTime = $('newend').value;
		if(prevTime!='') time = prevTime;
	}
	
	if(id=="medsd" || obj.hasClassName('dabs')) {
		if($('tts')) $('tts').hide();
	} else {
		if($('tts')) $('tts').show();
	}
	
	if(time=="no time" || time=="0" || time==" ") time = "";
	else if(time && !time.blank()) val = val.sub(' at '+time,'');
	
	if(val=="no date") val = "";

	var edit = $('startdiv');
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('did',id);
	$('dts').value=val;
	if($('tts')) $('tts').value=time;
	
	if(popCal!=null) {
		popCal.stop();
		popCal=null;
	}
	var preset = (unixdate-14400)*1000; //14400 is subtracted to convert server time to GMT (for JS)
	popCal = new ProtoCal('protocal2',preset, weekstart, popDate2, null, null);

	positionOnScreen(300,obj,edit)

	Event.observe('startdiv', 'mouseout', mouseOutStart);
	Event.observe('dts', 'keypress', startType);
	if($('tts')) Event.observe('tts', 'keypress', etmType);
	Event.observe('protocal2','dblclick',startDblclick);
	Event.observe('qdates2','dblclick',startDblclick);
	$("dts").focus();
	$("dts").select();
}

// EDIT DUEDATE =========================================================================================================

function dueDblclick(e) {
	var obj = Event.element(e);
	if(!obj.descendantOf('protocal_top')) {
		saveDueDateTime();
		dueClose();
	}
}

function popDate(val) {
	if(val==0) {
		var disp='';
		if($("mit")) $("mit").value = '';
	} else {
		var selectedDate = new Date(parseInt(val));
		var disp = selectedDate.dateFormat(date_format);
	}
	$("eud").value = disp;
	
	if($("mit") && $("mit").visible()) {
		$("eud").focus();
	} else {
		saveDueDateTime();
		dueClose();
	}
}

function dueClose() {
	if($('eud0')) $('eud0').show();
	var id = $('duediv').readAttribute('did');
	$('eud').blur();
	if($('mit')) $('mit').blur();
	if($('protocal_month')) $('protocal_month').blur();
	if($('protocal_year')) $('protocal_year').blur();
	$('dmod').blur();
	$('duediv').hide();
	Event.stopObserving('duediv', 'mouseout', mouseOutDue);
	Event.stopObserving('eud', 'keypress', dueType);
	Event.stopObserving('protocal','dblclick',dueDblclick);
	Event.stopObserving('qdates1','dblclick',dueDblclick);
	if($('mit')) Event.stopObserving('mit', 'keypress', stmType);
	if($("due"+id)) $("due"+id).show();
	if(id=="eud0") {
		if($('eud').value=="") {
			$('eud0').setAttribute('date',0);
		} else {
			var newdate=new Date($('eud').value);
			var newtime = newdate.getTime();
			var year = newdate.getFullYear();
			if(year==2000 && !$('eud').value.include(year)) newtime="NaN"; //chrome hack
			if(isNaN(newtime)) {  //invalid Date, try adding year
				var curdate = new Date();
				newdate=new Date($('eud').value+", "+curdate.getFullYear());
				newtime = newdate.getTime();
			} 
			if(!isNaN(newtime)) $('eud0').setAttribute('date',newtime/1000);
		}
	} else if(id=="meddd" || ($(id) && $(id).hasClassName('dabs'))) { //search & multiedit
		$(id).show();
		if($('eud').value=="") {
			$(id).setAttribute('date',0);
		} else {
			var newdate=new Date($('eud').value);
			newdate = newdate.getTime();
			if(!isNaN(newdate)) $(id).setAttribute('date',newdate/1000);
		}
	}

	$('duediv').setAttribute('did',0);
	$('eud').value="";
	if($('mit')) $('mit').value="";
	setSelectedVal($('dmod'),0);
	if($('remck')) $('remck').checked=false;
	if($('remtim')) setSelectedVal($('remtim'),0);
}

function resetOutDelay(e) {
	Event.stop(e);
	if(hoverDelay) {
		hoverDelay.stop();
		hoverDelay = null;
	}
}

function mouseOutDue(e) {
	var obj = Event.element(e);
	var relTarg = e.relatedTarget || e.toElement;
	Event.stop(e);
	
	if(relTarg && relTarg.tagName=='HTML' && (obj.id=='dmod' || obj.id=='protocal_month' || obj.id=='protocal_year')) return; //FF3 bug
	
	if(relTarg && relTarg.id!='duediv' && $(relTarg).descendantOf('duediv')==false && obj.tagName!="SELECT" && obj.tagName!="OPTION") {
		//$('status').update(relTarg.tagName+relTarg.id+"*"+obj.tagName+obj.id);
		saveDueDateTime();
		dueClose();
	}
}

//looks for return key when you are editing a task
function dueType(e) {
	var id = $('duediv').readAttribute('did');
	
	if(e.keyCode == Event.KEY_RETURN) {		
		Event.stop(e);
		saveDueDateTime();
		dueClose();
		if(id=="eud0") $('addbtn').focus();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		if($('mit') && $('mit').visible() && shift_down==0) {
			$('mit').focus();
			$('mit').select();
		} else if(id=="meddd") {
			if(shift_down==1) var next = $(id).previous('input');
			else var next = $(id).next('input');
			saveDueDateTime();
			dueClose();
			parselEvent(next);
		} else {
			var next=null;
			if(id=="eud0") {
				next = getNextEditableField($("eud0"));
			} else if($("due"+id)) {
				next = getNextEditableField($("due"+id));
			}
			saveDueDateTime();
			dueClose();
			parselEvent(next);
		}
	} else if(e.keyCode==Event.KEY_ESC) {
		dueClose();
	}
}

function stmType(e) {
	var id = $('duediv').readAttribute('did');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		saveDueDateTime();
		dueClose();
		if(id=="eud0") $('addbtn').focus();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		if(shift_down==1) {
			$('eud').focus();
			$('eud').select();
		} else {
			if(id=="eud0") {
				var next = getNextEditableField($("eud0"));
			} else {
				var next = getNextEditableField($("due"+id));
			}
			saveDueDateTime();
			dueClose();
			parselEvent(next);
		}
	} else if(e.keyCode==Event.KEY_ESC) {
		dueClose();
	}
}

function setReminder(val) {
	$('remck').checked=true;
	if(val>0) setSelectedVal($('remtim'),val);
}

function savedDue(ret) {
	var res = ret.responseText;
	
	var pieces = res.split("#");
	var id = pieces[0];
	var unix = pieces[1];
	var time = pieces[2];
	var dispDate = pieces[3];
	var reminder = pieces[4];
	
	var td = new Date();
	var days = (unix-(td.getTime()/1000))/(60*60*24);
		
	if(days<0) days = 3;
	else if(days<3) days = 2;
	else if(days<14) days = 1;
	else days = 0;
	
	if(unix==0) days=0;
	
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		
		if(dispDate.length>0) {
			if($("due"+id).innerHTML.include("Due:")) $("due"+id).update("Due: "+dispDate);			
			else $("due"+id).update(dispDate);
			$("due"+id).setAttribute('date',unix);
			$("due"+id).setAttribute('time',time);
			$("due"+id).setAttribute('rem',reminder);
			$("due"+id).className="date"+days;
			
			var img = $("due"+id).next('.spdt');
			if(img && reminder==0) $("due"+id).next('.spdt').remove(); //remove alarm icon
			else if(!img && reminder!=0) new Insertion.After(("due"+id),"<img src='/images/s.gif' width='13' height='13' class='spdt' alt='*' />");

		} else {
			$("due"+id).className="date0";
			if($("due"+id).innerHTML.include("Due:")) {
				$("due"+id).update("Due: no date");
			} else {
				$("due"+id).update("no date");
				$("due"+id).className="dim";
			}
			$("due"+id).setAttribute('date',0);
			$("due"+id).setAttribute('time','');
			$("due"+id).setAttribute('rem',0);
			
			var img = $("due"+id).next('.spdt');
			if(img) $("due"+id).next('.spdt').remove();
		}
		$("due"+id).setAttribute("title","");
		if($('think'+id)!=null) $('think'+id).remove();
		
	}
}

function saveDueDateTime() {
	var id = $('duediv').readAttribute('did');
	if(id=="0") return;
	if($('tasks')) var u = $('tasks').readAttribute('user');
	var prefix=0;
	if($("due"+id) && $("due"+id).innerHTML.include("Due:")) prefix=1;
	
	var newval = $("eud").value;
	var newmod = $("dmod").value;
	if(!newval.empty()) newval = newmod+newval;
	
	var newtim = '';
	if($('mit')) newtim = $('mit').value;
	newtim = reformatTime(newtim,3);
		
	var newfull = "no date";
	if(!newval.blank() && !newtim.blank()) newfull = newval+" at "+newtim;
	else if(!newval.blank()) newfull = newval;
	else if(!newtim.blank())  newfull = 'no date at '+newtim;
	
	var rem = 0;
	if($('remck') && $('remtim') && $('remck').checked) {
		rem = $('remtim').value;
	} else if($('remck') && $('remck').checked) {
		rem = 60;
	}
	
	if(id=="eud0") {
		$('eud0').value = newfull;
		if(newtim.blank()) newtim=" ";
		$('newstart').value = newtim;
		$('newrem').value = rem;
		return;
	} else if(id=="meddd" || ($(id) && $(id).hasClassName('dabs'))) {
		$(id).value = newfull;
		return;
	} 
	
	var oldval = $('due'+id).innerHTML.replace(/"/g,"&quot;").replace(/Due: /,"");
	
	if(newfull!=oldval || rem!=$('due'+id).readAttribute('rem')) {
		if(prefix) $("due"+id).update("Due: "+newfull);
		else $("due"+id).update(newfull);
		
		new Insertion.After("due"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_due.php', {method: 'post', postBody: 'id='+id+'&d='+newval+'&t='+newtim+'&u='+u+'&r='+rem, onSuccess: savedDue } );
	}

	if(newfull!="no date") $("due"+id).removeClassName("dim");
	else if(prefix==0) $("due"+id).addClassName("dim");
}

function editDue(obj, id) {
	if($('duediv').visible()) {
		saveDueDateTime();
		dueClose();
	}
	if($('startdiv').visible()) {
		saveStartDateTime();
		startClose();
	}
	var val = "";
	if(id=="eud0" || id=="meddd" || obj.hasClassName('dabs')) val = obj.value;
	else val = obj.innerHTML.replace(/"/g,"&quot;").replace(/Due: /,"");
	if(obj.hasClassName("dim")) val="";
	
	var mod = '';
	if(val.substr(0,1)=="=") { mod = "="; val = val.substr(1);}
	else if(val.substr(0,1)==">") { mod = ">"; val = val.substr(1); }
	else if(val.substr(0,4)=="&gt;") { mod = ">"; val = val.substr(4); }
	else if(val.substr(0,1)=="?") { mod = "?"; val = val.substr(1); }

	var prefix=0;
	if(id!="eud0" && id!="meddd" && obj.innerHTML.include("Due:")) prefix=1;
	
	var unixdate = obj.readAttribute('date');
	var time = obj.readAttribute('time');
	var reminder = obj.readAttribute('rem');
	
	if(id=="eud0") {
		var prevTime = $('newstart').value;
		if(prevTime!='') time = prevTime;
		reminder = $('newrem').value;
	}
	
	if(id=="meddd") {
		if($('mit')) $('mit').hide();
		if($('remspan')) $('remspan').hide();
	} else if(obj.hasClassName('dabs')) {
		$('hdtit').hide();
		$('dmod').hide();
		if($('mit')) $('mit').hide();
		if($('remspan')) $('remspan').hide();
	} else {
		if($('mit')) $('mit').show();
		$('dmod').show();
		$('hdtit').show();
		if($('remspan')) $('remspan').show();
	}
	
	if(time=="no time" || time=="0" || time==" ") time = "";
	else if(time && !time.blank()) val = val.sub(' at '+time,'');
	
	if(val=="no date") val = "";

	var edit = $('duediv');
	edit.setAttribute('prefix',prefix); //store some useful vals
	edit.setAttribute('did',id);
	$('eud').value=val;
	if($('mit')) $('mit').value=time;
	setSelectedVal($('dmod'),mod);
	if($('remck') && reminder>0) {
		$('remck').checked=true;
		if($('remtim')) setSelectedVal($('remtim'),reminder);
	}
	if(popCal!=null) {
		popCal.stop();
		popCal=null;
	}
	var preset = (unixdate-14400)*1000; //14400 is subtracted to convert server time to GMT (for JS)
	popCal = new ProtoCal('protocal',preset, weekstart, popDate, null, null);
	
	positionOnScreen(300,obj,edit);

	Event.observe('duediv', 'mouseover', resetOutDelay);
	Event.observe('duediv', 'mouseout', mouseOutDue);
	Event.observe('eud', 'keypress', dueType);
	if($('mit')) Event.observe('mit', 'keypress', stmType);
	Event.observe('protocal','dblclick',dueDblclick);
	Event.observe('qdates1','dblclick',dueDblclick);
	$("eud").focus();
	$("eud").select();
}

function positionOnScreen(width,behindObj,popObj) {
	
	Position.clone(behindObj,popObj,{ setWidth: false, setHeight: false, offsetTop: -5, offsetLeft: -20 });
	
	var pos = Position.page(behindObj);

	popObj.show();
	behindObj.hide();
	
	var poppos = Position.page(popObj);

	var ie8hack = poppos[0]-pos[0];
	if(ie8hack>0) {
		popObj.style.left = (pos[0]-ie8hack-20)+"px";
	}	

	var scroll = getScroll();

	if(Prototype.Browser.Opera) { //Opera needs help
		pos[1]-=scroll.y; 
		pos[0]-=scroll.x; 
	}
	
	if(window.innerWidth>0) var win_w = window.innerWidth;
	else var win_w = document.body.clientWidth;
	
	if(window.innerHeight>0) var win_h = window.innerHeight;
	else if(document.body.clientHeight>0) var win_h = document.body.clientHeight;
	else var win_h = document.documentElement.clientHeight;
	
	var mainL = $('main').offsetLeft-scroll.x;
	
	if(pos[0]+width>win_w) { //nudge over because it would be off the right side
		var extra=12;
		if(($('tasks') && $('tasks').offsetHeight+$('tasks').offsetTop>win_h) || $('toc').offsetHeight+$('toc').offsetTop>win_h) extra+=16; //account for scrollbar
		if(Prototype.Browser.IE) extra-=16;
		popObj.style.left = (win_w-width-mainL-extra)+"px";
	}
	if(pos[1]+popObj.offsetHeight>win_h) { //flip up top because it would be below the scroll
		var extra=0;		
		if($('tasks') && $('tasks').offsetWidth+mainL>win_w) extra=16; //account for scrollbar
		if(Prototype.Browser.IE) extra-=16;
		popObj.style.top = (win_h-popObj.offsetHeight-extra+scroll.y)+"px";
	}
}

// EDIT LENGTH =========================================================================================================

//looks for return key when you are editing a task
function lenType(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');
	
	if(e.keyCode == Event.KEY_RETURN) {
		Event.stop(e);
		$("nel"+id).blur();
	} else if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		$("nel"+id).blur();
		parselEvent(next);
	}
}

//saves an edit
function saveLen(id,prefix) {
	var u = $('tasks').readAttribute('user');
	var newval = $("nel"+id).value;
	var oldval = $("len"+id).innerHTML.replace(/Length: /,"").replace(/none/,"");
	
	newval = reformatTime(newval,1);
	
	if(newval!=oldval) {
		if(prefix) $("len"+id).update("Length: "+newval);
		else $("len"+id).update(newval);
		if(newval.empty() && prefix==0) $("len"+id).update("none");
		
		new Insertion.After("len"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
		new Ajax.Request( '/ajax/edit_len.php', {method: 'post', postBody: 'id='+id+'&l='+newval+'&u='+u, onSuccess: saved } );
	}
	
	Event.stopObserving("nel"+id,'keypress', lenType);
	$("nel"+id).remove();
	$("len"+id).show();
	if(!newval.empty()) $("len"+id).removeClassName("dim");
	else if(prefix==0) $("len"+id).addClassName("dim");
}

function editLen(obj, id) {
	var val = obj.innerHTML.replace(/"/g,"&quot;").replace(/Length: /,"");
	if(obj.hasClassName("dim")) val="";
	
	var prefix=0;
	if(obj.innerHTML.include("Length:")) prefix=1;
	
	obj.hide();
	new Insertion.After(obj,"<input type='text' id='nel"+id+"' class='inplace' value=\""+val+"\" onblur='saveLen("+id+","+prefix+");' />");
	$("nel"+id).focus();
	Event.observe("nel"+id,'keypress', lenType);
	if(!Prototype.Browser.IE) setTimeout("if($('nel"+id+"')) $('nel"+id+"').focus();", 100);
}

// EDIT ASSIGNED TO =========================================================================================================

function taskReassigned(ret) {
	var res = ret.responseText;

	if(res=='' || res[0]=="0") { 
		//error
	} else {
		$('think'+res).remove();
		$('row'+res).remove();
		
		alert("The task has been reassigned.");
	}
}

function reassignTab(e) {
	var obj = Event.element(e);
	var id = obj.id.sub(/\D+/,'');
	
	if(e.keyCode==Event.KEY_TAB) {
		Event.stop(e);
		var next = getNextEditableField(obj);
		uneditAsn(e);
		parselEvent(next);
	}
}

function reassign(e) {
	var id = $F('tid');
	var asn = $F('formReassignSel');
	var u = $('tasks').readAttribute('user');
	
	if(asn!=u) $('formReassign').request({ onComplete: taskReassigned });
	
	uneditAsn(e);
	
	if(asn!=u) new Insertion.After("asn"+id,"<img src='/images/icons/think2.gif' width='16' height='16' id='think"+id+"' />");
}

function uneditAsn(e) {
	var id = $F('tid');
	var edit = $("formReassign");
	
	if(e!=null) Event.stop(e);
	Event.stopObserving("formReassign",'submit', reassign);
	Event.stopObserving("formReassignCancel",'click', uneditAsn);
	Event.stopObserving("formReassignSel",'keypress', reassignTab);
	
	if(edit!=null) {
		edit.reset();
		$('tid').value = 0;
		$('hiddenarea').appendChild(edit);
	}
	$("asn"+id).show();
}

function editAsn(obj, id) {
	var edit = $('formReassign');
	var tid = $('tid');
	
	if(tid.value!=0) uneditAsn(null);
	
	tid.value = id;
		
	obj.hide();
	obj.parentNode.insertBefore(edit,obj);
	edit.focus();
	setTimeout("if($('formReassignSel')) $('formReassignSel').focus();", 100);
	
	Event.observe('formReassign','submit', reassign);
	Event.observe('formReassignCancel','click', uneditAsn);
	Event.observe("formReassignSel",'keypress', reassignTab);
}

// SUB TASKS =========================================================================================================

function swapSubtaskFilter(val) {
	if(val==0) { //flatten
		$('action_filter_b0').addClassName('bold');
		$('action_filter_b1').removeClassName('bold');
		$('action_filter_b2').removeClassName('bold');
		$('status').setAttribute('b',0);
		swap_filter('b');
	} else if(val==1) { //hidden
		$('action_filter_b0').removeClassName('bold');
		$('action_filter_b1').addClassName('bold');
		$('action_filter_b2').removeClassName('bold');
		var from = $('status').readAttribute('b');
		$('status').setAttribute('b',1);
		
		if(from==2) toggleAllSubtasks(0);
		else swap_filter('b');
		
	} else { //indented
		$('action_filter_b0').removeClassName('bold');
		$('action_filter_b1').removeClassName('bold');
		$('action_filter_b2').addClassName('bold');
		$('status').setAttribute('b',2);
		toggleAllSubtasks(1);
	}
	return false;
}

function toggleAllSubtasks(show) {
	if(show) {
		getAllSubtasks();
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'b&v=2'} );
	} else {
		hideAllSubtasks();
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'b&v=1'} );
	}
}

function fixParentRepeating(obj) {
	var id = obj.id.sub(/\D+/,'');
	var rep = $('rep'+id);
	if(rep) {
		var val = parseInt(rep.readAttribute('val'));
		if(val==9) {
			if(rep.innerHTML.include("Repeat:")) {
				$("rep"+id).update("Repeat: None");
			} else {
				$("rep"+id).update("none");
			}
		}
	}
}

//dragon = row being dragged
//dragger = draggable rect
//drop = current hover row
//dropi = current hover index
function startSubtask(mousePos) {
	dragon = $(dragon);
	
	var id = dragon.id.sub(/\D+/,'');
	var h = dragon.getHeight()-8;
	var scroll = getScroll();
	var mainL = $('main').offsetLeft-scroll.x;
	
	new Insertion.After('tasks',"<div id='dragger'>"+truncate($('tsk'+id).innerHTML,30)+"</div>");
	$('dragger').setStyle({ opacity: 0.75, left: (mousePos.x-scroll.x-mainL-8)+"px", top: (mousePos.y-h/2-4)+"px"});

	dragon.addClassName('hiderow');
	
	if(dragon.parentNode.hasClassName('subtasks')) {
		drop=dragon.parentNode.parentNode;
		dragon.setAttribute('subtask',1);
	} else {
		drop=dragon;
		dragon.setAttribute('subtask',0);
	}
	
	//collect visible rows
	rows.clear();
	var allrows = $('tasks').immediateDescendants();
	for (var i = 0, len = allrows.length; i < len; ++i) {
		if(allrows[i].visible() && allrows[i].tagName=="DIV") rows.push(allrows[i]);
	}
	
	for (var i = 0, len = rows.length; i < len; ++i) {
		if(rows[i]==drop) dropi=i;
	}

	drop.setStyle({ backgroundColor: "#ffc" });
}

function dropSubtask(mousePos) {
	$('dragger').remove();
	var id = dragon.id.replace(/row/,"");
	var u = $('tasks').readAttribute('user');
	var scroll = getScroll();

	if(dragon.readAttribute('subtask')==1 && dragon.parentNode.parentNode==drop) { //dropped subtask onto own parent
		var pos = Position.page(drop);
		if(Prototype.Browser.Opera) pos[1]-=scroll.y; //Opera needs help
		pos[1]+=scroll.y;
		if(pos[1]<mousePos.y && mousePos.y<pos[1]+drop.offsetHeight && pos[0]<mousePos.x && mousePos.x<pos[0]+drop.offsetWidth) {
			dragon.setStyle({ backgroundColor: "" });
			drop.setStyle({ backgroundColor: "" });
		} else {
			dragon.classNames().each(function(s) { if(s.include('parent')) dragon.removeClassName(s); });
			$('tasks').insertBefore(dragon,$('tasks').down(".row"));
			dragon.setAttribute('subtask',0);
			if($('fol'+id)) $('fol'+id).show();
			fixParentRepeating(dragon);
			new Ajax.Request( '/ajax/move_task.php', {method: 'post', postBody: 'id='+id+'&into=0&u='+u, onSuccess: addedSub } );
		}
	} else if(drop==null || drop==dragon) { //dropped onto self
		dragon.setStyle({ backgroundColor: "" });
	} else { //dropped task/subtask onto another task (or sep)
		drop.setStyle({ backgroundColor: "" });
		dragon.setStyle({ backgroundColor: "" });
		
		var pos = Position.page(drop);
		if(Prototype.Browser.Opera) pos[1]-=scroll.y; //Opera needs help
		pos[1]+=scroll.y;
		if(pos[1]<mousePos.y && mousePos.y<pos[1]+drop.offsetHeight && pos[0]<mousePos.x && mousePos.x<pos[0]+drop.offsetWidth && !drop.hasClassName("sep") && !drop.className.include("parent")) {
			dragon.remove();
			var into = drop.id.replace(/row/,"");
			
			if($('sub'+into)) {
				$('sub'+into).src="/images/icons/think2.gif";
			} else if($('subm'+into)) {
				new Insertion.After($('subm'+into),"<img src='/images/icons/think2.gif' id='sub"+into+"' style='display:none;' class='subp' width='16' height='16' hover='1' />");
				$('subm'+into).remove();
				$('sub'+into).show();
			}
			new Ajax.Request( '/ajax/move_task.php', {method: 'post', postBody: 'id='+id+'&into='+into+'&u='+u, onSuccess: addedSub } );
		} else { //wasnt within drop
			if(dragon.readAttribute('subtask')==1) { //remove subtask
				dragon.classNames().each(function(s) { if(s.include('parent')) dragon.removeClassName(s); });
				$('tasks').insertBefore(dragon,$('tasks').down(".row"));
				dragon.setAttribute('subtask',0);
				if($('fol'+id)) $('fol'+id).show();
				fixParentRepeating(dragon);
				new Ajax.Request( '/ajax/move_task.php', {method: 'post', postBody: 'id='+id+'&into=0&u='+u, onSuccess: addedSub } );
			} 
		}
	}
	dragon.removeClassName('hiderow');
}

function dragSubtask(mousePos) {	
	var moved = null;
	var drag = $('dragger');
	var scroll = getScroll();
	var mainL = $('main').offsetLeft-scroll.x;
	var flop = 0;
	
	if(window.innerHeight>0) var win_h = window.innerHeight;
	else if(document.body.clientHeight>0) var win_h = document.body.clientHeight;
	else var win_h = document.documentElement.clientHeight;
	
	while(drag && flop<10) {
		if(mousePos.y-scroll.y<20) { //if mouse is near top or bottom, start scrolling
			if(scrollDelay==0) scrollDelay = setTimeout("scrollUp()",100);
		} else if(mousePos.y-scroll.y>win_h-20) {
			if(scrollDelay==0) scrollDelay = setTimeout("scrollDown()",100);
		} else {
			if(scrollDelay!=0) clearTimeout(scrollDelay);
			scrollDelay=0;
		}

		var pos = Position.page(drop);
		if(Prototype.Browser.Opera) pos[1]-=scroll.y; //Opera needs help
		pos[1]+=scroll.y;
		
		if(pos[1]>mousePos.y) { //move above current drop
			drop.setStyle({ backgroundColor: "" });
			
			if(dropi>0) {
				dropi--;
				drop = rows[dropi];
				flop++;
			} else {
				flop=11;
			}
		} else if(mousePos.y>pos[1]+drop.offsetHeight) { //move below current drop
			drop.setStyle({ backgroundColor: "" });
			
			if(dropi<rows.length-1) {
				dropi++;
				drop = rows[dropi];
				flop++;
			} else {
				flop=11;
			}
		} else if(drop.hasClassName("sep") || drop.className.include("parent")) {
			//ignore separators, hidden and loose children 
			flop=11;
		} else if(pos[0]<mousePos.x && mousePos.x<pos[0]+drop.offsetWidth) { //mouse over current drop
			drop.setStyle({ backgroundColor: "#ffc" });
			flop=11;
		} else {
			drop.setStyle({ backgroundColor: "" });
			flop=11;
		}

		drag.style.top = (mousePos.y-drag.offsetHeight/2)+"px";
		drag.style.left = (mousePos.x-scroll.x-mainL-8)+"px";
	}
}


function addedSub(ret) {
	var res = ret.responseText;
	var into = res.substr(0,res.indexOf(" "));
	var outof = res.substr(res.indexOf(" ")+1);
	
	if(res=='') { 
		//dragged into self
	} else {
		var i = 0;
		if(into!="0") {
			getSubtasks(into, 1,0);
		}
		if(outof!="0") {
			gotSubs(outof);
		}
	}
}

function gotSubs(id) {
	var pieces = $("subtasks"+id).getElementsBySelector(".row").size();
	var more = $("subtasks"+id).getElementsBySelector(".mrsbs").size();

	if(pieces==0 && more==0) {
		new Insertion.After($('sub'+id),"<div id='subm"+id+"' class='subm' style='display:none;'></div>");
		$('subtasks'+id).remove();
		if($('think'+id)) $('think'+id).remove();
		$('sub'+id).remove();
		$('subm'+id).show();
	} else {
		var icon = $('sub'+id);
		icon.src = "/images/icons/sub.gif";
		if($('think'+id)) $('think'+id).remove();
		icon.show();
	}
}

function removeLooseChildren(parentid, ignore) {
	var subs=$('tasks').getElementsByClassName('parent'+parentid);
	var length = subs.length;
	for (var i = length-1; i >= 0; --i) {
		if(subs[i]!=ignore) {
			subs[i].remove();
		}
	}
}

function getSubtasks(id, reload, nofilters, force) {
	var cont = $("subtasks"+id);
	var icon = $('sub'+id);
	var u = $('tasks').readAttribute('user');
	
	if(icon==null) {
		icon = $('subm'+id);
		icon.id = 'sub'+id;
	}
	if(icon==null) return; //parent not found
	
	hideAllEditables();
	
	if(cont!=null && cont.visible() && !reload && force!=1) {
		cont.hide();
		icon.title = icon.readAttribute('old');
	} else if(cont!=null && !cont.visible() && !reload && force!=0) {
		cont.show();
		icon.setAttribute('old', icon.title);
	} else if(cont!=null && cont.visible() && force==1) {
		//already open
	} else if(force!=0) {
		icon.setAttribute('old', $('sub'+id).title);
		icon.src = "/images/icons/think2.gif";
	
		if(!cont) {
			new Insertion.Bottom('row'+id,"<div id='subtasks"+id+"' class='subtasks'></div>");
		} else {
			cont.show();
		}
		
		removeLooseChildren(id,null);
		
		var status = $('status');
		if(status) {
			var c = status.readAttribute('c');
			var f = status.readAttribute('f');
			var n = status.readAttribute('n');
			var s = status.readAttribute('s');
			var s2 = status.readAttribute('s2');
			var s3 = status.readAttribute('s3');
			var d = status.readAttribute('d');
			var t = status.readAttribute('t');
			var z = status.readAttribute('z');
		} else {
			var c=0;
			var f=0;
			var n=0;
			var s=0;
			var z=0;
			var s2=-1;
			var s3=-1;
			var d=0;
			var t=-1;
		}
		if(nofilters==1) {
			var c=1;
			var f=1;
			var n=1;
			var z=1;
			var t=-1;
			if(cont) cont.setAttribute('nofilters',1);
		} else if(nofilters==2) {
			var c=2;
			var f=1;
			var n=1;
			var z=1;
			var t=-1;
			if(cont) cont.setAttribute('nofilters',1);
		} else {
			if(cont) cont.setAttribute('nofilters',0);
		}
		
		var page = $('tasks').readAttribute('page');
		if(page==8 && nofilters==0) {
			var query = $('tasks').readAttribute('query');
			s = s+"&search=1&"+query;
		}
		
		new Ajax.Updater('subtasks'+id, '/ajax/subtasks.php', {method: 'post', postBody: 'i='+id+'&c='+c+'&f='+f+'&n='+n+'&s='+s+'&s2='+s2+'&s3='+s3+'&d='+d+'&t='+t+'&z='+z+'&u='+u, onComplete: function() { gotSubs(id);} } );	
	}
}

function gotParent(id,parentid,html) {
	new Insertion.After('row'+id,html);
	$('row'+id).remove();
	getSubtasks(parentid, 1,0,-1);
}

function getParent(obj,id) {
	var parentid = obj.readAttribute("parent");
	var u = $('tasks').readAttribute('user');

	if($('row'+parentid)) { //if parent already exists
		$('tasks').replaceChild($('row'+parentid),obj.up('.row'));
		getSubtasks(parentid,1,0,-1);
	} else { //replace subtask with parent
		new Ajax.Request('/ajax/get_one.php', {method: 'post', postBody: 'id='+parentid+'&u='+u, onComplete: function(ret) { gotParent(id,parentid,ret.responseText);} } );	
	}
	
}

function addSubtask(id) {
	
	var name ="New Subtask";
	var name = prompt("Please type your subtask here.",name);
	if(name==null) return;
	if(name=="") name="New Subtask";
		
	var u = $('tasks').readAttribute('user');
	if($('subtasks'+id)) {
		$('subtasks'+id).addClassName('refreshme');
	} else {
		new Insertion.Bottom('row'+id,"<div id='subtasks"+id+"' class='subtasks refreshme'></div>");
		if($('subm'+id)) {
			new Insertion.After($('subm'+id),"<img src='/images/icons/think2.gif' id='sub"+id+"' style='display:none;' class='subp' width='16' height='16' hover='1' />");
			$('subm'+id).remove();
			$('sub'+id).show();
		}
	}
		
	new Ajax.Request('/ajax/add_task.php', {method: 'post', postBody: 'title='+encodeURIComponent(name)+'&assign='+u+'&parent='+id, onComplete: function(id) { 
		var look = $$('.refreshme');
		look.each(function(item) { 
			item.removeClassName('refreshme');
			var id = item.id.sub(/\D+/,'');
			var filt = $('subtasks'+id).readAttribute('nofilters');
			getSubtasks(id,1,filt,-1);
		});
	
	} } );	
}

function getAllSubtasks() {	//expands parents
	var allparents = $$('.subp');
	for (var i = 0, len = allparents.length; i < len; ++i) {
		if(allparents[i].id.substr(0,3)=="sub") getSubtasks(allparents[i].id.substr(3),0,0,1);
	}
}

function hideAllSubtasks() {
	var allparents = $$('.subp');
	var id = 0;
	var cont = null;
	var icon = null;
	for (var i = 0, len = allparents.length; i < len; ++i) {
		if(allparents[i].id.substr(0,3)=="sub") getSubtasks(allparents[i].id.substr(3),0,0,0);
		
		/*cont = $("subtasks"+id);
		icon = $('sub'+id);
		
		if(cont!=null) cont.hide();
		if(icon!=null) icon.title = icon.readAttribute('old');
		if(icon!=null && !icon.title) icon.title = "Show Subtasks";
		cont = null;
		icon = null;*/
	}
}

function showSubtaskDetails(obj) {
	var id = obj.id.sub(/\D+/,'');
	
	if($('tasks').readAttribute('hovering')==id && $('sbhover')) return;
	
	removeSubtaskDetails();
	removeCheckDetails();
	
	$('tasks').setAttribute('hovering',id);

	hoverDelay = new PeriodicalExecuter(function(pe) {
		pe.stop();
		var row = $('tasks').readAttribute('hovering');
		var hassubs = obj.hasClassName('subp');
		var isdragable = obj.hasClassName('subm');
		var islosesub = obj.hasClassName('sub');
		var isnested = false;
		if(isdragable && $('subm'+row).readAttribute('parent')>0) isnested = true;
		
		var perm = 3;
		if($('tasks')) perm = $('tasks').readAttribute('perm');
		if(offline==1) perm=1;
		
		var hover = "<a href='/info/subtasks.php'><img src='/images/icons/help.gif' class='right' width='16' height='16' alt='help' /></a>";
		if(islosesub) hover+="This is a subtask. Click icon to load parent.";
		else if(isnested) hover+="This is a subtask. Drag icon out to make it a task.";
		else if(isdragable) hover+="Drag icon to turn this into a subtask.";
		else if(hassubs && $("subtasks"+row) && $("subtasks"+row).visible()) hover+="Click icon to hide "+obj.readAttribute('hover')+" subtasks.";
		else if(hassubs) hover+="Click icon to show "+obj.readAttribute('hover')+" subtasks.";
		
		
		if(perm>1 && !isnested && !islosesub) {
			hover += "<br /><br /><a href='#' onclick='addSubtask("+row+");return false;'><img src='/images/icons/add.gif' width='16' height='16' alt='+' /> Add Subtask</a>";
		}
		
		new Insertion.Top($('row'+row),"<div id='sbhover'>"+hover+"</div>");
		
		if(Prototype.Browser.IE && !document.documentMode) Position.clone($('row'+row),$('sbhover'),{ setWidth: false, setHeight: false, offsetTop: 3, offsetLeft: 0 });
	}, 1);	
	
	
}

function removeSubtaskDetails() {
	if($('sbhover')) {
		$('sbhover').remove();
	}
	if(hoverDelay) {
		hoverDelay.stop();
		hoverDelay = null;
	}
	$('tasks').setAttribute('hovering',0);
}

// TIP =========================================================================================================

function clearTip() {
	var dontclear = $('tip').readAttribute('noadv');
	$('tip').remove();
	if(dontclear==null || dontclear!=1) new Ajax.Request('/ajax/clear_tip.php');
}

//TABS =========================================================================================================

//clear popup if we really have moved out
function clearExtraFolders(e) {
	var obj = Event.element(e);
	var relTarg = e.relatedTarget || e.toElement;
	
	if(!relTarg) {
		$('taboverflow').hide();
		return;
	}
	if(relTarg.nodeType==3) relTarg = relTarg.parentNode; //Opera reports mousein to Text node (inside A)
	if(relTarg.parentNode.nodeName=="scrollbar") relTarg = $('taboverflow'); //firefox handles scrollbars differently
	
	relTarg = $(relTarg);
	
	if(relTarg.id!='taboverflow' && relTarg.descendantOf('taboverflow')==false) {
		$('taboverflow').hide();
	}
}

//show popup
function showExtraFolders(e) {
	Position.clone('moretabs','taboverflow',{ setLeft: false, setWidth: false, setHeight: false, offsetTop: -1 });
	$('taboverflow').show();	
	Event.observe('taboverflow','mouseout', clearExtraFolders);
}

function stripCount(str) {
	var ind = str.indexOf("<i>");
	if(ind==-1) ind = str.indexOf("<I>"); //this is for opera
	if(ind==-1) return str;
	return str.substr(0,ind-1);
}

//determins if tabs are off the edge
function manageTabs() {
	if($('tabs')==null) return;
	var tabs = $('tabs').immediateDescendants();
	var orig = $('tabx').offsetTop;
	var comma = "";
	var overflow = $('taboverflow'); //hiden div	
	var more = $('moretabs'); //link to show hidden layer
	
	overflow.hide();
	overflow.update();	
	more.title=""; 
	
	for(var i = tabs.size()-1; i>0; i--) {
		if(tabs[i].tagName=="DIV") { //foreach tab
			if(tabs[i].offsetTop>orig) { //if it is below
				if(!more.visible()) {
					more.style.visibility="hidden";
					more.show();
				}
				more.title = stripCount(tabs[i].down('a').innerHTML)+comma+more.title;
				comma=", ";
				var link = tabs[i].down('a').cloneNode(true);
				var br = document.createElement("br");
				
				var top = overflow.firstDescendant();
				overflow.insertBefore(link,top);
				overflow.insertBefore(br,top);
			}
		}
	}
	var page = $('tasks').readAttribute('page');
	if(page==2) new Insertion.Bottom(overflow,"<br /><a href='#' onclick='return onTheFly(1);'>Add Folder</a>");
	else if(page==3) new Insertion.Bottom(overflow,"<br /><a href='#' onclick='return onTheFly(2);'>Add Context</a>");
	else if(page==5) new Insertion.Bottom(overflow,"<br /><a href='#' onclick='return onTheFly(3);'>Add Goal</a>");
	
	if(more.title.length==0) {
		more.hide(); 
	} else {
		more.style.visibility="visible";
	}
}

//COLS ==========================================================
function enableColEdit() {
	var state = $('colhead').readAttribute('editing');
	if(state==1) {
		document.location.reload();
	} else {
	
		$('colhead').setAttribute('editing',1);
		
		var cols = $('colhead').childElements();
		cols.each(function(item) { 
			if(!item.hasClassName('colc') && !item.hasClassName('col8192') && item.nodeName=="DIV") {
				item.addClassName('coledit');
				if(item.down('a')) {
					item.down('a').hide();
					new Insertion.Bottom(item,"<span class='head'>"+item.down('a').innerHTML+"</span>");
				}
			}
		});
	
		var drags = $$('.colmv');
		drags.each(function(item) { 
			item.removeClassName('noshow');
		});
		
		if($('colhead')!=null) {
			Event.observe('colhead','mousedown', mouseDownCol);
		}
		
		if($('tip')) $('tip').remove();
		new Insertion.Before($('colhead'),"<div id='tip'>Drag and drop to reorder or resize the columns.  When you are done, click the <img src='/images/icons/coled.gif' width='16' height='16' /> icon again, or reload the page.</div>");
	}
}

function colStartDrag(obj, mousePos) {
	if(obj.hasClassName('head')) dragon=obj.up('div');
	else dragon = obj;
		
	var colhead = $('colhead');
	var scroll = getScroll();
	
	var left = Position.page(dragon);
	left = left[0];
	
	if(Prototype.Browser.Opera) left-=scroll.x; //hack
	
	dropw=0;
	dropi = mousePos.x - left; //offset from left to click
	
	new Insertion.Bottom(colhead,"<div id='emptycol' class='col1' style='display:none; width: "+dragon.getWidth()+"px'> </div>");
	var slot = colhead.removeChild($('emptycol'));//remove slot
	slot.setStyle({ display: ''}); //make visible
	colhead.replaceChild(slot,dragon); //add slot, remove drag
	
	var mainL = $('main').offsetLeft-scroll.x;
	if(Prototype.Browser.Opera) mainL-=scroll.x; //hack
	
	dragon.setStyle({ position: 'absolute', opacity: 0.5, left: (mousePos.x-mainL-dropi)+"px" }); //style drag
	colhead.insertBefore(dragon,slot); //re-add drag
}

function colStopDrag(e) {
	var colhead = $('colhead');
	var temp = colhead.removeChild(dragon);
	temp.setStyle({ position: '', opacity: '', left: '' });
	colhead.replaceChild(temp,$('emptycol'));
	var wid = temp.getWidth();
	var col = temp.down('.colmv');
	if(col) col = col.id.sub(/\D+/,'');
	var ord=0;
	if(temp.previous('.coledit')) {
		var ord = parseInt(temp.previous('.coledit').readAttribute('ord'));
	}
	//move over
	var start=parseInt(temp.readAttribute('ord'));
	if(ord<start) { //left
		var cols = $$('.coledit');
		cols.each(function(item) { 
			var me = parseInt(item.readAttribute('ord'));
			if(ord<me && me<start) item.setAttribute('ord',me+1);
		});
		ord++;
	} else {
		var cols = $$('.coledit');
		cols.each(function(item) { 
			var me = parseInt(item.readAttribute('ord'));
			if(start<me && me<=ord) {
				item.setAttribute('ord',me-1);
			}
		});
	}
	
	temp.setAttribute('ord',ord);
	new Ajax.Request('/ajax/set_col.php', {method: 'post', postBody: 'c='+col+'&w='+wid+'&o='+ord} );
}

function moveCol(mousePos) {
	var scroll = getScroll();
		
	var keepgoing = 1;
	
	while(keepgoing) {
		keepgoing=0;
		
		var up = dragon.previous('.coledit');
		var down = dragon.next('.coledit');
		
		if(up) { //check left col for mouseover
			var upc = Position.page(up);
			if(mousePos.x<upc[0]+scroll.x+(up.offsetWidth/2)) {
				dragon.parentNode.insertBefore(dragon,up);
				dragon.parentNode.insertBefore($('emptycol'),up);
				keepgoing=1;
			} 
		} 
		
		if(down) { //check right col for mouseover
			var downc = Position.page(down);
			if(mousePos.x>downc[0]+scroll.x+(down.offsetWidth/2)) {
				dragon.parentNode.insertBefore(down,dragon);
				keepgoing=1;
			}
		}
		var mainL = $('main').offsetLeft-scroll.x;
		if(Prototype.Browser.Opera) mainL-=scroll.x; //hack
		dragon.style.left = (mousePos.x-mainL-dropi)+"px";
	}
}

function startResize(obj,mousePos) {
	dragon = obj.parentNode;
	dropi = mousePos.x; //start
	dropw = dragon.getWidth();

	drops = 52; //icons
	var look = $$('img.fil');
	if(look.size()>0) drops += 20; //file icon
	
	var cols = $('colhead').childElements();
	for(var i=0; i<cols.length; i++) {
		if(cols[i]!=dragon && cols[i].nodeName=="DIV") drops += cols[i].getWidth();
	}
}

function resizeCols(mousePos,set) {
	var newW = dropw+(mousePos.x-dropi);
	if(newW<70) newW=70;
	if(newW>500) newW=500;
	
	var col = dragon.down('.colmv');
	if(col) col = col.id.sub(/\D+/,'');
	
	var w_newF = drops+newW;
	
	$('colhead').setStyle({ width: w_newF+'px'});	
	dragon.setStyle({ width: newW+'px'});
		
	if(set==1) {
		new Ajax.Request('/ajax/set_col.php', {method: 'post', postBody: 'c='+col+'&w='+newW} );
	}
}

//DIVIDERS ==========================================================

function countTasksPerDivider() {
	
	var id=0;
	var count=0;
	var divs = $$('div.sep');
	divs.each(function(item) { 
		count=0;
		id = item.id.substr(3);
		var elem = $('sep'+id).next();
		while(elem && elem.hasClassName('row')) {
			count++;
			elem = elem.next();
		}
		if(count==1) new Insertion.Bottom('sep'+id," <i id='sepnote"+id+"'>("+count+" collapsed items)</i>");
		else new Insertion.Bottom('sep'+id," <i id='sepnote"+id+"'>("+count+" collapsed items)</i>");
	});
}

function dividerClicked(id,forceOpen) {
	var isClosed = $('sep'+id).hasClassName('closed');
	
	if(forceOpen==undefined && isClosed) forceOpen=1;
	
	if(forceOpen) { //open it
		if(isClosed) { //only do it if closed
			$('sep'+id).removeClassName('closed');
			if($('sepnote'+id)) $('sepnote'+id).remove();
			
			var val='';
			if($('searchField')) val = $F('searchField').toLowerCase(); //a quicksearch
			
			var elem = $('sep'+id).next();
			while(elem && elem.hasClassName('row')) {
			
				if(val=='') {
					elem.show();
					elem.setAttribute('d',0);
				} else {
					elem.setAttribute('d',0);
				}
				
				elem = elem.next();
			}
			if(val!='') doSearch(0);
		}
	} else { //close it
		if(!isClosed) { //only do it if open
			$('sep'+id).addClassName('closed');
			var count = 0;
			
			var elem = $('sep'+id).next();
			while(elem && elem.hasClassName('row')) {
				count++;
				elem.hide();
				elem.setAttribute('d',1);
				elem = elem.next();
			}
			if(count==1) new Insertion.Bottom('sep'+id," <i id='sepnote"+id+"'>("+count+" collapsed items)</i>");
			else new Insertion.Bottom('sep'+id," <i id='sepnote"+id+"'>("+count+" collapsed items)</i>");
		}
	}
	return false;
}

function toggleDividers(e) {
	Event.stop(e);
	
	var force=-1;
	var state = $('action_toggleDividers').readAttribute('c');
	if(state=="0") {
		$('action_toggleDividers').setAttribute('c',1);
		$('action_toggleDividers').update("Open Dividers");
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'p&v=1'} );
		force=0;
	} else {
		$('action_toggleDividers').setAttribute('c',0);
		$('action_toggleDividers').update("Close Dividers");
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k='+$('tasks').readAttribute('page')+'p&v=0'} );
		force=1;
	}
	
	var divs = $$('div.sep');
	divs.each(function(item) { 
		dividerClicked(item.id.substr(3),force);
	});
}


//STAR =========================================================================================================

function toggleStar(id) {
	var u = $('tasks').readAttribute('user');
	var sets = switchStar(id);
	
	new Ajax.Request("/ajax/toggle_star.php", {method: 'post', postBody: 'id='+id+'&set='+sets+'&u='+u} );
	
	return false;
}

function switchStar(id) {
	var obj = $('star'+id);
	
	if(obj.src.include("star.gif")) { //already starred
		obj.src="/images/icons/starno.gif";
		return 0;
	} 
	
	obj.src="/images/icons/star.gif";
	
	return 1;
}

//CHECKBOX =========================================================================================================

function taskDuplicated(ret) {
	var res = ret.responseText;
		
	var orig = res.substr(0,res.indexOf("#"));
	var duped = res.substr(res.indexOf("#")+1);
	
	if(res=='' || res[0]=="0") { 
		alert("There was an error and the task was not duplicated.");
	} else {
		//display or sort new task
		new Insertion.After($("row"+orig),duped);
		if($('t0ev')) $('t0ev').remove();
	}
}

function duplicateTask(id) {
	var u = $('tasks').readAttribute('user');
	if($('status')) {
		var s1 = $('status').readAttribute('s');
		var s2 = $('status').readAttribute('s2');
		var s3 = $('status').readAttribute('s3');
	}
	new Ajax.Request( '/ajax/duplicate_task.php', {method: 'post', postBody: 'id='+id+'&u='+u+'&s1='+s1+'&s2='+s2+'&s3='+s3, onSuccess: taskDuplicated } );
}

function showCheckDetails(obj) {
	var id = obj.id.sub(/\D+/,'');
	
	if($('tasks').readAttribute('hovering')==id && $('chhover')) return;
	
	removeCheckDetails();
	removeSubtaskDetails();
		
	$('tasks').setAttribute('hovering',id);

	hoverDelay = new PeriodicalExecuter(function(pe) {
		pe.stop();
		var row = $('tasks').readAttribute('hovering');
		var details = $('chkhov'+row).innerHTML;
		var rep = 0;
		if($('rep'+row)) rep=$('rep'+row).readAttribute('val');
		var comp = obj.up().hasClassName('ch');
		var perm = 3;
		if($('tasks')) perm = $('tasks').readAttribute('perm');
		if(offline==1) perm=1;
		
		var hover="";
		if(perm==3) {
			if(comp) {
				hover="Click checkbox to complete task";
				if(rep>0) hover+=" and repeat";
			} else {
				hover="Click checkbox to uncomplete task";
			}
		} else {
			hover="You don't have permission to complete this task.";
		}
		
		if(perm>=2) hover+="<br /><br /><a href='#' id='hdup"+row+"' onclick='return false;'>Clone This Task</a>";
		
		//var edit = $("formReassign");
		//hover+="<br /><a href='#' onclick='return false;' id='asn"+row+"'>Reassign...</a>"+edit.innerHTML;
		
		if(perm==3) hover+="<br /><br /><a href='#' id='delk"+row+"' class='delk' onclick='return false;'><img src='/images/icons/trash.gif' id='delkk"+row+"' width='16' height='16' /> Delete Task</a><br />";
		hover+="<hr />"+details;
		
		new Insertion.Top($('row'+row),"<div id='chhover'>"+hover+"</div>");
		
		if(Prototype.Browser.IE && !document.documentMode) Position.clone($('row'+row),$('chhover'),{ setWidth: false, setHeight: false, offsetTop: 3, offsetLeft: 0 });

	}, 1);	
	 
	//positionOnScreen(190,obj,$('chhover'));
}

function removeCheckDetails() {
	if($('chhover')) {
		$('chhover').remove();
	}
	if(hoverDelay) {
		hoverDelay.stop();
		hoverDelay = null;
	}
	$('tasks').setAttribute('hovering',0);
}

function checkToggled(ret) {
	var res = ret.responseText;
	
	if(res=='' || res[0]=="0") return;
	
	var pieces = res.split("#");
	var id = pieces[0];
	var rep = pieces[1];
	var hover = pieces[2];

	$('check'+id).setAttribute('hover',hover);
}

function toggleCheck(id) {
	var u = $('tasks').readAttribute('user');
	var setc = switchCheckmark(id);
			
	new Ajax.Request( '/ajax/toggle_task.php', {method: 'post', postBody: 'id='+id+'&set='+setc+'&u='+u, onComplete: checkToggled } );
	
	if(setc==1) {
		var obj = new Object();
		obj.responseText = "-"+id;
		cb_timer(obj);//turn off timer
	} 
	
	return false;
}

function switchCheckmark(id) {
	var obj = $('check'+id).up();
	var row = obj.up(".row");
	
	if(obj.className.include("chd")) { //already checked
		obj.className='ch';
		row.removeClassName('rowcomp');
		return 0;
	} 
	
	row.addClassName('rowcomp');
	obj.className='chd';
	
	return 1;
}


//SEARCH ==========================================================

function search() {
	//show think
	if($('searching')==null) new Insertion.After("searchField"," <img src='/images/icons/think2.gif' width='16' height='16' id='searching' />");
	
	if(searchtime!=0) clearTimeout(searchtime);
	searchtime = setTimeout("doSearch(0)",500);
}

function doSearch(start) {	
	var val = $F('searchField').toLowerCase();
	var numAtTime=50;
	
	var look = $$('span.task'); //includes subtasks
	var len = look.length;
	for (var index = start; index < len && index<start+numAtTime; ++index) {
 		var item = look[index];
		var id = item.id.sub(/\D+/,'');
		var me = $('row'+id);
				
		if(item.innerHTML.toLowerCase().indexOf(val)==-1) {
			me.hide();
		} else { //show
			var divClosed = me.readAttribute('d');
			if(!divClosed || divClosed==0) { //divider open
				me.show();
				if($('subm'+id)) var parent = $('subm'+id).readAttribute('parent');
				if(parent) var parentElem = $('row'+parent);
				if(parentElem) { //is subtask
					var parDiv = parentElem.readAttribute('d');
					if(!parDiv || parDiv==0) { //parent's div open
						parentElem.show(); //show parent
						if($('subtasks'+parent)) $('subtasks'+parent).show();//open parent
					}
				}
			}
		}
	}
	if(len>start+numAtTime) {
		if(searchtime!=0) clearTimeout(searchtime);
		searchtime = setTimeout("doSearch("+(start+numAtTime)+")",1);
	} else {
		if($("searching")) $("searching").remove();
	}
}

function modifyASearch() {
	if($('filtertask')) $('filtertask').hide();
	$('searchtask').show();
}

function switchToNewSearch() {
	if($('filtertask')) $('filtertask').hide();
	$('searchtask').show();
	$('action_sorttask').hide();
	$('action_edittasks').hide();
	$('toolbar').hide();
	$('val2').down('input').focus(); //ie7 inconsistent
}
function closeASearch() {
	if($('filtertask')) $('filtertask').show();
	$('searchtask').hide();
	$('action_sorttask').show();
	$('action_edittasks').show();
	$('toolbar').show();
	if($('status').readAttribute('d')==1) $('action_hidedetails').show();
	else $('action_showdetails').show();
	
}
function forgetSearch() {
	var conf = confirm('Are you sure you want to permanently remove this saved search?');
		
	return conf;
}

function searchDateType(obj) {
	var id = obj.id.sub(/\D+/,'').substring(1);
	
	if($('field'+id).value==8) {
		if(obj.value<=8) {
			if(!$('value'+id).hasClassName('dabs')) $('val'+id).update('<input type="text" id="value'+id+'" class="dabs" name="value'+id+'" onchange="this.value=reformatTime(this.value,3);" />');
		} else {
			if(!$('value'+id).hasClassName('drel')) $('val'+id).update('<input type="text" id="value'+id+'" class="drel" name="value'+id+'" /> mins');
		}
	} else {
		if(obj.value<=8) {
			if(!$('value'+id).hasClassName('dabs')) $('val'+id).update('<input type="text" id="value'+id+'" class="dabs" name="value'+id+'" onfocus="addDueFocus(\'value'+id+'\');" />');
		} else {
			if(!$('value'+id).hasClassName('drel')) $('val'+id).update('<input type="text" id="value'+id+'" class="drel" name="value'+id+'" /> days');
		}
	}
}

function searchChangeDrop(id,type) {
	$('type1'+id).hide();
	$('type2'+id).hide();
	$('type3'+id).hide();
	$('type4'+id).hide();
	$('type5'+id).hide();
		
	if(type==1) { //txt
		$('type1'+id).show();
		setSelectedVal($('type1'+id),1);
	
	} else if(type==2) { //sel
		$('type2'+id).show();
		setSelectedVal($('type2'+id),2);
		
	} else if(type==3) { //date,time
		$('type3'+id).show();
		setSelectedVal($('type3'+id),2);
		
	} else if(type==4) { //len,timer
		$('type4'+id).show();
		setSelectedVal($('type4'+id),2);
		
	} else if(type==5) { //completed,starred
		$('type5'+id).show();
		setSelectedVal($('type5'+id),2);
	}

}

function searchChange(id,type) {
	
	if(type==1) { //txt 
		$('val'+id).update('<input type="text" name="value'+id+'" />');
	} else if(type==2) { //folder
		$('val'+id).update();
		var select = $('self').cloneNode(true);
		select = $('val'+id).appendChild(select);
		select.id = "sel"+id;
		select.name = "value"+id;
		select.removeClassName('inplace');
	} else if(type==3) { //context
		$('val'+id).update();
		var select = $('selc').cloneNode(true);
		select = $('val'+id).appendChild(select);
		select.id = "sel"+id;
		select.name = "value"+id;
		select.removeClassName('inplace');
	} else if(type==4) { //goal
		$('val'+id).update();
		var select = $('selg').cloneNode(true);
		select = $('val'+id).appendChild(select);
		select.id = "sel"+id;
		select.name = "value"+id;
		select.removeClassName('inplace');
	} else if(type==5) { //priority
		$('val'+id).update("<select name='value"+id+"'><option value='-1'>-1 Negative</option><option value='0' selected='selected'>0 Low</option><option value='1'>1 Medium</option><option value='2'>2 High</option><option value='3'>3 Top</option></select>");
	} else if(type==6) { //date
		$('val'+id).update('<input type="text" id="value'+id+'" class="dabs" name="value'+id+'" onfocus="addDueFocus(\'value'+id+'\');" />');
	} else if(type==7) { //status
		$('val'+id).update("<select name='value"+id+"'><option value='0'>None</option><option value='1'>Next Action</option><option value='2'>Active</option><option value='3'>Planning</option><option value='0' disabled='true'>----</option><option value='4'>Delegated</option><option value='5'>Waiting</option><option value='6'>Hold</option><option value='7'>Postponed</option><option value='8'>Someday</option><option value='9'>Canceled</option><option value='10'>Reference</option></select>");
	} else if(type==8) { //via
		$('val'+id).update("<select name='value"+id+"'><option value='0'>Main Website</option><option value='1'>Email Import</option><option value='2'>Firefox Addon</option><option value='3'>Developers API</option><option value='4'>Slim Browser Widget (Google Gadget, etc..)</option><option value='6'>WAP or Mobile Phone</option><option value='7'>iPhone</option><option value='8'>Import Tools</option><option value='9'>Twitter</option><option value='10'>Jott</option></select>");
	} else if(type==9) { //time
		$('val'+id).update('<input type="text" id="value'+id+'" name="value'+id+'" class="dabs" onchange="this.value=reformatTime(this.value,3);" />');
	} else if(type==10) { //len
		$('val'+id).update('<input type="text" name="value'+id+'" onchange="this.value=reformatTime(this.value,1);" />');
	} else if(type==11) { //timer
		$('val'+id).update('<input type="text" name="value'+id+'" onchange="this.value=reformatTime(this.value,2);" />');
	} else if(type==12) { //asssign
		$('val'+id).update();
		var select = $('sela').cloneNode(true);
		select = $('val'+id).appendChild(select);
		select.id = "sel"+id;
		select.name = "value"+id;
		select.removeClassName('inplace');
	} else if(type==13) { //repeat
		$('val'+id).update("<select name='value"+id+"'><option value='0'>None</option><option value='4'>Daily</option><option value='1'>Weekly</option><option value='5'>Biweekly</option><option value='2'>Monthly</option><option value='6'>Bimonthly</option><option value='8'>Quarterly</option><option value='7'>Semiannually</option><option value='3'>Yearly</option><option value='0' disabled='true'>----</option><option value='9'>With Parent</option><option value='10'>Other</option></select>");

	} else {
		$('val'+id).update();
	}
}

function searchChangeField(obj) {
	var id = obj.id.sub(/\D+/,'');
	var field = parseInt($F('field'+id));
	
	switch (field) { 
		case 1: searchChangeDrop(id,2); searchChange(id,12); break;//ass
		case 2: searchChangeDrop(id,5); searchChange(id,0); break;//comP
		case 3: searchChangeDrop(id,2); searchChange(id,3); break;//con
		case 4: searchChangeDrop(id,3); searchChange(id,6); break;//Dadd
		case 5: searchChangeDrop(id,3); searchChange(id,6); break;//Dcom
		case 6: searchChangeDrop(id,3); searchChange(id,6); break;//Dmod
		case 7: searchChangeDrop(id,3); searchChange(id,6); break;//Due
		case 8: searchChangeDrop(id,3); searchChange(id,9); break;//time
		case 9: searchChangeDrop(id,2); searchChange(id,2); break;//fol
		case 10: searchChangeDrop(id,2); searchChange(id,4); break;//gol
		case 11: searchChangeDrop(id,4); searchChange(id,10); break;//len
		case 12: searchChangeDrop(id,1); searchChange(id,1); break;//not
		case 13: searchChangeDrop(id,2); searchChange(id,5); break;//pri
		case 14: searchChangeDrop(id,2); searchChange(id,13); break;//rep
		case 15: searchChangeDrop(id,5); searchChange(id,0); break;//*
		case 16: searchChangeDrop(id,3); searchChange(id,6); break;//strt
		case 17: searchChangeDrop(id,2); searchChange(id,7); break;//stat
		case 18: searchChangeDrop(id,1); searchChange(id,1); break;//tag
		case 19: searchChangeDrop(id,1); searchChange(id,1); break;//task
		case 20: searchChangeDrop(id,4); searchChange(id,11); break;//timr
		case 21: searchChangeDrop(id,2); searchChange(id,8); break;//via
		case 22: searchChangeDrop(id,5); searchChange(id,0); break;//issub
		case 23: searchChangeDrop(id,5); searchChange(id,0); break;//isparent
	}
}

function searchDelCriteria(obj) {
	var rules = $$('.rule');
	obj = $(obj);
	if(rules.size()>1) { //more than 1 rule
		var group = obj.up('.rulegroup');
		if(group) { //if deleted rule is in a group
			obj.up('.rule').remove();
			var children = group.childElements();
			if(children.size()==3) { //one subrule left in group
				var child = group.down('.rule');
				child = $('searchtask').insertBefore(child,group);
				group.remove();
				child.down('.sg').value = 0;
				child.removeClassName('first');
				child.down('.rchain').src="/images/icons/split.gif";
			} else {
				group.down('.rule').addClassName('first');
			}
		} else {
			obj.up('.rule').remove(); //ungrouped rule
		}
	}
	if(rules.size()==2) { //there is one rule left, hide del btn
		$('searchtask').down('.rule').down('.rdel').hide();
	}
	$('searchtask').down('div').addClassName('first'); //hide first bool
}

function searchAddCriteria(group) {
	var rules = parseInt($('numrules').value)+1; //number of rules
	var toclone = $('searchtask').down('.rule'); //first rule
	toclone.down('.rdel').show();
	var cloned = toclone.cloneNode(true);
	cloned.id = "rule"+rules;
	cloned = $('searchtask').insertBefore(cloned,$('addrulebtn')); //insert new at end
	$('numrules').value=rules;
	
	cloned = $(cloned);

	var tmp = cloned.down('.sf0'); //down is expensive
	tmp.id = "field"+rules;
	tmp.name = "field"+rules;
	tmp = cloned.down('.sf1');
	tmp.id = "type1"+rules;
	tmp.name = "type1"+rules;
	tmp = cloned.down('.sf2');
	tmp.id = "type2"+rules;
	tmp.name = "type2"+rules;
	tmp = cloned.down('.sf3');
	tmp.id = "type3"+rules;
	tmp.name = "type3"+rules;
	tmp = cloned.down('.sf4');
	tmp.id = "type4"+rules;
	tmp.name = "type4"+rules;
	tmp = cloned.down('.sf5');
	tmp.id = "type5"+rules;
	tmp.name = "type5"+rules;
	tmp = cloned.down('.sg');
	tmp.id = "mygroup"+rules;
	tmp.name = "mygroup"+rules;
	tmp.value = group;
	cloned.down('.srchval').id = "val"+rules;
	
	//cloned.down('.rdel').show();
	cloned.down('.rchain').src="/images/icons/split.gif";	
	cloned.removeClassName('first');
	
	setSelectedVal($('field'+rules),19);
	searchChangeField($('field'+rules));

	return cloned;
}

function searchAddSubCriteria(obj) {
	obj=$(obj);
	var me = obj.up('.rule');

	var group = obj.up('.rulegroup');
	if(group) {
		var buddy = searchAddCriteria(group.down('.rlgp').value);
		group.appendChild(buddy);
		buddy.down('.rchain').src="/images/icons/add.gif";
		buddy.down('.rdel').show();
	} else {
		var groupid = parseInt($('numgroups').value)+1; //number of groups
		$('numgroups').value=groupid;
		
		new Insertion.After(me,"<div class='rulegroup'><input type='hidden' class='rlgp' name='grp"+groupid+"' value='"+groupid+"' /><img src='/images/s.gif' class='bool left' width='24' height='16' alt='bool' /></div>");
		var grp = me.next('.rulegroup');
		grp.appendChild(me);
		
		var buddy = searchAddCriteria();
		grp.appendChild(buddy);
		
		me.down('.sg').value = groupid;
		buddy.down('.sg').value = groupid;
		me.addClassName('first');
		me.down('.rchain').src="/images/icons/add.gif";
		buddy.down('.rchain').src="/images/icons/add.gif";
		me.down('.rdel').show();
		buddy.down('.rdel').show();
	}
	$('searchtask').down('div').addClassName('first'); //hide first bool
}

function searchChangeBool() {
	var val = $F('andor');
	if(val==1) {
		$('searchtask').removeClassName('or');
		$('searchtask').addClassName('and');
	} else {
		$('searchtask').addClassName('or');
		$('searchtask').removeClassName('and');
	}
}

function tasksEdited(ret) {
	cancelMultiEdit();
	var currentTab = $('status').readAttribute('i')
	swap_tabs(currentTab);
}

function multiEditTasks(e) {
	Event.stop(e);
	
	//collect ids
	var rowIDs = "";
	var allrows = $('tasks').descendants();
	for (var i = 0, len = allrows.length; i < len; ++i) {
		if(allrows[i].visible() && allrows[i].hasClassName('row')) rowIDs += ","+allrows[i].id.substr(3);
	}
	$('ids').value = rowIDs;
	
	if($F('sel999e')==1) {
		var cont = confirm("You are about to permanently delete all of the tasks on this screen.  Are you sure this is what you want to do?");
		if(!cont) return;
	}
	
	$('formMultiEdit').request({ onComplete: tasksEdited });
}

//TIMER ==========================================================
function cb_timer(ret) {
	var res = ret.responseText;
	
	if(res=='' || res[0]=="0") { //error
		alert("error");
		//error
	} else {
		res = parseInt(res,10);
		var off = 0;
		
		if(res<0) {
			res = -res;
			off=1;
		}
		if(!$("tig"+res)) return;
		
		if(off) {
			$("tig"+res).src = "/images/icons/play.gif";
			$("tig"+res).title="start timer"; 
		} else { 
			$("tig"+res).src = "/images/icons/pause.gif";
			$("tig"+res).title="pause timer"; 
			if($("tim"+res).empty()) $("tim"+res).update("0:00");
		}
	}
}
function toggleTimer(obj,id) {
	var u = $('tasks').readAttribute('user');
	new Ajax.Request( '/ajax/toggle_timer.php', {method: 'post', postBody: 'id='+id+'&u='+u, onSuccess: cb_timer} );
}

function updateTimers(pe) {
	//find all timer widgets
	var timers = $$('img.timer');
	if(timers.size()==0) pe.stop();//no  timer widgets, so timer column doesnt exist
	
	timers.each(function(n) {
		var id = n.id.sub(/\D+/,'');
		if($("tig"+id).src.indexOf("play")==-1) {
			var current = $("tim"+id).innerHTML.split(":");
			if(isNaN(current[0]) || isNaN(current[1])) current=0;
			else current = current[0]*60+current[1]*1+1;
			$("tim"+id).update(reformatTime(current.toString(),2));
		}
	});
}

//SWAP ==========================================================
function updateStatus(ret) {
	var ss = $('status');
	var ns = $('newstatus');
	var sort = ns.readAttribute('s');
	var sort2 = ns.readAttribute('s2');
	var sort3 = ns.readAttribute('s3');
	var i = ns.readAttribute('i');
		 
	ss.update(ns.innerHTML);
	ss.setAttribute('t',ns.readAttribute('t'));
	ss.setAttribute('c',ns.readAttribute('c'));
	ss.setAttribute('f',ns.readAttribute('f'));
	ss.setAttribute('n',ns.readAttribute('n'));
	ss.setAttribute('z',ns.readAttribute('z'));
	ss.setAttribute('b',ns.readAttribute('b'));
	ss.setAttribute('p',ns.readAttribute('p'));
	ss.setAttribute('i',i);
	ss.setAttribute('s',sort);
	ss.setAttribute('s2',sort2);
	ss.setAttribute('s3',sort3);
	ss.setAttribute('d',ns.readAttribute('d'));
	$('tasks').setAttribute('query',ns.readAttribute('query'));
	ns.remove();
	
	if($("colheadnew")) {
		var ww = $('colheadnew').getStyle('width');
		var parent = $('colheadnew').parentNode;
		var colheadnew =  parent.removeChild($('colheadnew'));
		colheadnew.removeClassName('noshow');
		colheadnew.id = "colhead";
		$('main').replaceChild(colheadnew,$('colhead'));
		
		
		$('tasks').setStyle({ width: ww});
	}
	
	if($('newsearchtask')) {
		$('searchform').replaceChild($('newsearchtask'),$('searchtask'));
		$('newsearchtask').id = "searchtask";
		if(i==-9) switchToNewSearch();
		else closeASearch();
	}
	if($('action_toggleDividers')) {
		var divstate = $('status').readAttribute('p');
		
		$('action_toggleDividers').setAttribute('c',divstate);
		
		if(divstate==1) {
			$('action_toggleDividers').update("Open Dividers");
			countTasksPerDivider();
		} else {
			$('action_toggleDividers').update("Close Dividers");
		}
	}
	if($('action_filter_b2')) {
		var substate = $('status').readAttribute('b');
		if(substate==2) toggleAllSubtasks(1);
	}
}

function swapTab(id) {
	var style = $('toc').readAttribute('colorstyle');
	$('taboverflow').hide(); //if we selected from overflow
	
	if(id==-9) id="x";
	if(id==-1) id="y";
	
	var current = $('tabs').down('.tabon'); //turn off
	current.className = "tab";
	current.down('.tl').remove();
	new Insertion.Top(current,"<img src='/images/"+style+"tlt.gif' width='3' height='3' class='tl' />");
	
	$('tab'+id).className="tabon"; //turn on
	$('tab'+id).down('.tl').remove();
	new Insertion.Top($('tab'+id),"<img src='/images/"+style+"tly.gif' width='3' height='32' class='tl' />");

	//set add task prefill
	if($('star') && $('star').value==1 && $('addtask').readAttribute('d1')==0) $('star').value=switchStar('new');
	var page = $('tasks').readAttribute('page');
	if(id=="x" && page!=9) id = $('addtask').readAttribute('d'+page);
	
	if(page==1 && id==4 && $('addtask').readAttribute('d1')==0) newStar(null);
	else if(page==2) setSelectedVal('fold',id);
	else if(page==3) setSelectedVal('contx',id);
	else if(page==5) setSelectedVal('goal',id);
	else if(page==6 && id=='y') setSelectedVal('priority',-1);
	else if(page==6 && id!='x') setSelectedVal('priority',id);
	else if(page==9 && id=='x') $('tag').value=$('addtask').readAttribute('d9');
	else if(page==9) $('tag').value=$('tab'+id).readAttribute('valtxt');
	else if(page==10) setSelectedVal('stat',id);
}

function swap_tabs(id) {
	if(offline) return true;
	if($('filediv')!=null) $('filediv').remove();
	if($('colhead')) {
		var state = $('colhead').readAttribute('editing');
		if(state==1) {
			document.location.reload();
			return;
		}
	}
	
	var u = $('tasks').readAttribute('user');
	var s = '';
	
	if(blurDelay!=0) {
		setTimeout("swap_tabs("+id+")",250);
		return false;
	}
	
	hideAllEditables();
	if(searchtime!=0) clearTimeout(searchtime); //cancel search
	
	$('status').update("&nbsp;");
	$('tasks').update("<br /><br /><div align='center'><img src='/images/icons/thinkbig.gif' width='32' height='32' /><br />Loading...</div>");
	
	if($('action_toggleSubtasks')!=null) {
		$('action_toggleSubtasks').setAttribute('c',0);
		$('action_toggleSubtasks').update("Toggle Subtasks");
	}
		
	var page = $('tasks').readAttribute('page');
	var sort = $('tasks').readAttribute('sort');
	
	if(page==8) {
		if($('forgetsearch')) {
			$('forgetsearch').href="/views/search.php?x="+u+";i=-9;forget="+id;
		} else if($('filtertask')){
			$('filtertask').update('<a href="/views/search.php?x='+u+';i=-9;forget='+id+'" id="forgetsearch" onclick="return forgetSearch();">Forget this Search</a> &nbsp; <a href="/views/search.php" onclick="modifyASearch(); return false;">Modify this Search</a>');
		}
		if(id==-9) {
			$('searchtask').hide();
			if($('filtertask')) $('filtertask').hide();			
		} else {
			$('searchtask').hide();
			if($('filtertask')) $('filtertask').show();
		}
		if(id==-8) {
			var query = $('tasks').readAttribute('query');
			s = "&search=1&"+query;
		}
	}
	if(page==1 && id==2 && sort==98) {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').show();
		if($("morelnk")) $('morelnk').setAttribute('page',1);
	} else {
		if($("moretasks")) $('moretasks').hide();
	}
	if(page==1) page = '/ajax/swap_main.php';
	else if(page==2) page = '/ajax/swap_folders.php';
	else if(page==3) page = '/ajax/swap_context.php';
	else if(page==4) page = '/ajax/swap_duedate.php';
	else if(page==5) page = '/ajax/swap_goal.php';
	else if(page==6) page = '/ajax/swap_priority.php';
	else if(page==7) page = '/ajax/swap_sharing.php';
	else if(page==8) page = '/ajax/swap_search.php';
	else if(page==9) page = '/ajax/swap_tags.php';
	else if(page==10) page = '/ajax/swap_status.php';
	
	if(!Prototype.Browser.IE) window.stop(); //stops FF from cont to load page behind the swapped tab
	new Ajax.Updater('tasks', page, {method: 'post', postBody: 'i='+id+'&u='+u+s, onComplete: updateStatus } );
	
	swapTab(id);
	
	if($('searchField')!=null) $('searchField').clear();
	
	return false;
}

function multiSort(e) {
	Event.stop(e);
	
	var s1 = $F('sort1');
	var s2 = $F('sort2');
	if($('sort3')) var s3 = $F('sort3'); else var s3=-1;
		
	swap_sort(s1,s2,s3);
}

function swap_sort(s,s2,s3) {
	if(offline) return false;
	
	if(s2==undefined) s2=-1;
	if(s3==undefined) s3=-1;
	
	if($('sort1')) setSelectedVal($('sort1'),s);
	if($('sort2')) setSelectedVal($('sort2'),s2);
	if($('sort3')) setSelectedVal($('sort3'),s3);
	
	if($('filediv')!=null) $('filediv').remove();
	if($('colhead')) {
		var state = $('colhead').readAttribute('editing');
		if(state==1) {
			document.location.reload();
			return;
		}
	}
	
	if(blurDelay!=0) {
		setTimeout("swap_sort("+s+","+s2+","+s3+")",250);
		return false;
	}
	
	hideAllEditables();
	if(searchtime!=0) clearTimeout(searchtime); //cancel search
	
	var page = $('tasks').readAttribute('page');
	var tab = $('status').readAttribute('i');
	var u = $('tasks').readAttribute('user');
	
	if(page==99) return true;
	
	$('status').update("&nbsp;");
	$('tasks').update("<br /><br /><div align='center'><img src='/images/icons/thinkbig.gif' width='32' height='32' /><br />Loading...</div>");
	$('tasks').setAttribute('sort',s);
	
	if($("colhead")) $("colhead").hide();
	
	if($('action_toggleSubtasks')!=null) {
		$('action_toggleSubtasks').setAttribute('c',0);
		$('action_toggleSubtasks').update("Toggle Subtasks");
	}
	
	if(page==1 && tab==2 && s==98) {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').show();
		if($("morelnk")) $('morelnk').setAttribute('page',1);
	} else {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').hide();
	}
	
	if(page==8 && tab==-8) {
		var query = $('tasks').readAttribute('query');
		s = s+"&i=-9&search=1&"+query;
	}
	
	if(page==1) page = '/ajax/swap_main.php';
	else if(page==2) page = '/ajax/swap_folders.php';
	else if(page==3) page = '/ajax/swap_context.php';
	else if(page==4) page = '/ajax/swap_duedate.php';
	else if(page==5) page = '/ajax/swap_goal.php';
	else if(page==6) page = '/ajax/swap_priority.php';
	else if(page==7) page = '/ajax/swap_sharing.php';
	else if(page==8) page = '/ajax/swap_search.php';
	else if(page==9) page = '/ajax/swap_tags.php';
	else if(page==10) page = '/ajax/swap_status.php';
	
	new Ajax.Updater('tasks', page, {method: 'post', postBody: 's='+s+'&s2='+s2+'&s3='+s3+'&u='+u, onComplete: updateStatus } );
	
	if($('searchField')!=null) $('searchField').clear();
	
	return false;
}

function limitContext(e) {
	swap_filter('t');
}
function swap_filter(f) {
	if($('filediv')!=null) $('filediv').remove();
	if($('colhead')) {
		var state = $('colhead').readAttribute('editing');
		if(state==1) {
			document.location.reload();
			return;
		}
	}
	
	if(blurDelay!=0) {
		setTimeout("swap_filter('"+f+"')",250);
		return false;
	}
	
	hideAllEditables();
	if(searchtime!=0) clearTimeout(searchtime); //cancel search
	
	var u = $('tasks').readAttribute('user');
	var v = $('status').readAttribute(f);
	if(f!='b') {
		if(v==0) v=1; else v=0;
	}
	if(f=='t') v = $('contxfilter').value;
	
	var page = $('tasks').readAttribute('page');
	var tab = $('status').readAttribute('i');
	var sort = $('tasks').readAttribute('sort');
	
	$('status').update("&nbsp;");
	$('tasks').update("<br /><br /><div align='center'><img src='/images/icons/thinkbig.gif' width='32' height='32' /><br />Loading...</div>");
	
	if(page==1 && tab==2 && sort==98) {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').show();
		if($("morelnk")) $('morelnk').setAttribute('page',1);
	} else {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').hide();
	}
	
	var s = "";
	if(page==8 && tab==-8) {
		var query = $('tasks').readAttribute('query');
		s = "&i=-9&search=1&"+query;
	}
	
	if(page==1) page = '/ajax/swap_main.php';
	else if(page==2) page = '/ajax/swap_folders.php';
	else if(page==3) page = '/ajax/swap_context.php';
	else if(page==4) page = '/ajax/swap_duedate.php';
	else if(page==5) page = '/ajax/swap_goal.php';
	else if(page==6) page = '/ajax/swap_priority.php';
	else if(page==7) page = '/ajax/swap_sharing.php';
	else if(page==8) page = '/ajax/swap_search.php';
	else if(page==9) page = '/ajax/swap_tags.php';
	else if(page==10) page = '/ajax/swap_status.php';
	
	new Ajax.Updater('tasks', page, {method: 'post', postBody: f+'='+v+'&u='+u+s, onComplete: updateStatus } );

	if(f=='a') {
		if($('action_filter_f0')) $('action_filter_f0').show();
		if($('action_filter_f1')) $('action_filter_f1').hide();
		if($('action_filter_n0')) $('action_filter_n0').show();
		if($('action_filter_n1')) $('action_filter_n1').hide();
		if($('action_filter_z0')) $('action_filter_z0').show();
		if($('action_filter_z1')) $('action_filter_z1').hide();
		if($('contxfilter')) setSelectedVal('contxfilter',-1);
		if($('action_filter_b0')) swapSubtaskFilter(0);
	} else if(f!='t' && f!='b') {
		if(v==0) {
			$('action_filter_'+f+'0').hide();
			$('action_filter_'+f+'1').show();
		} else {
			$('action_filter_'+f+'0').show();
			$('action_filter_'+f+'1').hide();
		}
	}
	
	if($('searchField')) $('searchField').clear();
	
	return false;
}

function getall_dets(e) {
	if($('filediv')!=null) $('filediv').remove();
	if($('tasks').readAttribute('cols')=="1") {
		showDetails(e);
		return false;
	}
	if($('colhead')) {
		var state = $('colhead').readAttribute('editing');
		if(state==1) {
			document.location.reload();
			return;
		}
	}
	if(e!=null) Event.stop(e);
	
	if(blurDelay!=0) {
		setTimeout("getall_dets(null)",250);
		return false;
	}
	//if(popCal!=null) hideCal(); //calendar may be open and it could get orphaned
	
	$('tasks').update("<br /><br /><div align='center'><img src='/images/icons/thinkbig.gif' width='32' height='32' /><br />Loading...</div>");
	
	var u = $('tasks').readAttribute('user');
	var page = $('tasks').readAttribute('page');
	var tab = $('status').readAttribute('i');
	var sort = $('tasks').readAttribute('sort');
	var d = 'd=1';
	
	if(page==8 && tab==-8) {
		var query = $('tasks').readAttribute('query');
		d = "d=1&i=-9&search=1&"+query;
	}
	
	if(page==1 && tab==2 && sort==98) {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').show();
		if($("morelnk")) $('morelnk').setAttribute('page',1);
	} else {
		if($("nomoretasks")) $('nomoretasks').hide();
		if($("moretasks")) $('moretasks').hide();
	}

	if($('action_toggleSubtasks')!=null) {
		$('action_toggleSubtasks').setAttribute('c',0);
		$('action_toggleSubtasks').update("Toggle Subtasks");
	}
	
	if(searchtime!=0) clearTimeout(searchtime); //cancel search
	
	if(page==1) page = '/ajax/swap_main.php';
	else if(page==2) page = '/ajax/swap_folders.php';
	else if(page==3) page = '/ajax/swap_context.php';
	else if(page==4) page = '/ajax/swap_duedate.php';
	else if(page==5) page = '/ajax/swap_goal.php';
	else if(page==6) page = '/ajax/swap_priority.php';
	else if(page==7) page = '/ajax/swap_sharing.php';
	else if(page==8) page = '/ajax/swap_search.php';
	else if(page==9) page = '/ajax/swap_tags.php';
	else if(page==10) page = '/ajax/swap_status.php';
	
	new Ajax.Updater('tasks', page, {method: 'post', postBody: d+'&u='+u, onComplete: updateStatus} );
	
	$('action_hidedetails').show();
	$('action_showdetails').hide();
	if($('searchField')!=null) $('searchField').clear();
	
	return false;
}

function gotMore(ret) {
	var res = ret.responseText;
	if(res=='' || res[0]=="0") { //no more
		$('moretasks').hide();
		$('nomoretasks').show();
	}
	$('moreprog').remove();
}

function fetchMore() {
	if(!$('morelnk')) return;
	
	new Insertion.After('morelnk',"<img src='/images/icons/think2.gif' id='moreprog' width='16' height='16' />");

	var m = $('morelnk').readAttribute('page');
	//$('morelnk').remove();//setAttribute('page',(m*1)+1);
	
	//alert("more "+m);
	//$('status').update("fetch more "+m);
	
	//TODO: Need to handle searching, closing dividers, closed dividers, toggling subtasks then scrolling, etc

	var u = $('tasks').readAttribute('user');
	var tab = $('status').readAttribute('i');
	
	var page = $('tasks').readAttribute('page');
	if(page==1) page = '/ajax/swap_main.php';
	else if(page==2) page = '/ajax/swap_folders.php';
	else if(page==3) page = '/ajax/swap_context.php';
	else if(page==4) page = '/ajax/swap_duedate.php';
	else if(page==5) page = '/ajax/swap_goal.php';
	else if(page==6) page = '/ajax/swap_priority.php';
	else if(page==7) page = '/ajax/swap_sharing.php';
	else if(page==8) page = '/ajax/swap_search.php';
	else if(page==9) page = '/ajax/swap_tags.php';
	else if(page==10) page = '/ajax/swap_status.php';
	
	new Ajax.Updater('tasks', page, {method: 'post', postBody: 'i='+tab+'&u='+u+'&m='+m, insertion: Insertion.Bottom, onComplete: gotMore } );
}

//Goals/folders/contexts ==========================================================

function onTheFlew(ret) {
	var res = ret.responseText;
	if(res=='' || res[0]=="0") { 
		//error
	} else {
		window.location.reload();
	}
}

function onTheFly(type) {
	if(type==1) {
		var name = prompt("Please enter new folder name:","");
		if(name==null || name=='') return false;
		new Ajax.Request('/ajax/quick_addField.php', {method: 'post', postBody: 't=1&v='+name, onComplete: onTheFlew} );
	} else if(type==2) {
		var name = prompt("Please enter new context name:","");
		if(name==null || name=='') return false;
		new Ajax.Request('/ajax/quick_addField.php', {method: 'post', postBody: 't=2&v='+name, onComplete: onTheFlew} );
	} else if(type==3) {
		var name = prompt("Please enter new goal name:","");
		if(name==null || name=='') return false;
		new Ajax.Request('/ajax/quick_addField.php', {method: 'post', postBody: 't=3&v='+name, onComplete: onTheFlew} );
	}
	return false;
}

function updateGoalList(value) {
	var g1 = $('g1');
	var g2 = $('g2');
	
	if(value==0) {
		if(g1) g1.hide();
		if(g2) g2.hide();
	} else if(value==1) {
		if(g1) g1.show();
		if(g2) g2.hide();
	} else if(value==2) {
		if(g1) g1.hide();
		if(g2) g2.show();
	}
}

function goalsShowArchived(obj) {
	 $$('.cols').invoke('show');
	 $(obj).hide();
	 return false;
}

function goalsShowNote(id) {
	 $('note'+id).toggle();
	 return false;
}

function goalsShowChain(id) {
	 $('chain'+id).toggle();
	 return false;
}

function goalDelete(id) {
	if(confirm("Are you sure you want to permanently delete this goal?")) {
		new Ajax.Request( '/ajax/delete_goal.php', {method: 'post', postBody: 'id='+id } );
		$('row'+id).remove();
	}
	return false;
}

function folderDelete(id) {
	if(confirm("If you delete this folder, any tasks or notebook entries inside it will become folderless.  Is this what you want?")) {
		new Ajax.Request( '/ajax/delete_folder.php', {method: 'post', postBody: 'id='+id } );
		$('row'+id).remove();
	}
	return false;
}

function contextDelete(id) {
	if(confirm("If you delete this context, any tasks with this context will lose their context.  Is this what you want?")) {
		new Ajax.Request( '/ajax/delete_context.php', {method: 'post', postBody: 'id='+id } );
		$('row'+id).remove();
	}
	return false;
}

function foldDrag(e) {
	var mousePos = mouseCoords(e);
	var scroll = getScroll();//var scroll = Prototype.Browser.IE ? document.documentElement.scrollTop : document.getElementById('main').scrollTop;
	var keepgoing = 1;
	
	while(keepgoing) {
		keepgoing=0;
		
		var up = dragger.previous();
		var down = dragger.next();
		
		if(up) { //check above row for mouseover
			var upc = Position.page(up);
			if(Prototype.Browser.Opera) upc[1]-=scroll.y; //Opera needs help
			if(mousePos.y<upc[1]+scroll.y+(up.offsetHeight/2)) {
				dragger.parentNode.insertBefore(dragger,up);
				up.addClassName('moveTop');
				up.removeClassName('moveBot');
				if(down) {
					down.removeClassName('moveTop');
					down.removeClassName('moveBot');
				}
				keepgoing=1;
			} 
		} 
		
		if(down) { //check below row for mouseover
			var downc = Position.page(down);
			if(Prototype.Browser.Opera) downc[1]-=scroll.y; //Opera needs help
			if(mousePos.y>downc[1]+scroll.y+(down.offsetHeight/2)) {
				dragger.parentNode.insertBefore(down,dragger);
				down.addClassName('moveBot');
				down.removeClassName('moveTop');
				if(up) {
					up.removeClassName('moveTop');
					up.removeClassName('moveBot');
				}
				keepgoing=1;
			}
		}
		
		dragger.style.top = (mousePos.y-dragger.offsetHeight/2)+"px";
	
	}
	Event.stop(e);
}

function foldDrop(e) {
	var mousePos = mouseCoords(e);
	list = $('folderlist');
	
	var up = dragger.previous();
	if(up) {
		up.removeClassName('moveTop');
		up.removeClassName('moveBot');
	}
	var down = dragger.next();
	if(down) {
		down.removeClassName('moveTop');
		down.removeClassName('moveBot');
	}
	dragger.setStyle({ position: '', cursor: '', width: '', height: '', backgroundColor: '', opacity: '', top: '', marginLeft: ''});
	
	var slot = $('slot');
	slot.hide();
	list.appendChild(slot);
	
	foldRenumber();
		
	Event.stop(e);
	Event.stopObserving(document,'mousemove', foldDrag);
	Event.stopObserving(document,'mouseup', foldDrop);
	Event.observe('folderlist','mousedown', foldStartDrag);
}

function foldStartDrag(e) {
	var obj = Event.element(e);
	var mousePos = mouseCoords(e);
	var scroll = getScroll();
	
	if(obj.hasClassName('subm')) {
		dragger = obj.up('.row');
		list = $('folderlist');
		
		var h = dragger.getHeight()-8;
		var w = dragger.getWidth();
	
		var slot = list.removeChild($('slot'));//remove slot
		slot.setStyle({ display: '', height: h+'px'}); //make visible
		list.replaceChild(slot,dragger); //add slot, remove drag
		dragger.setStyle({ position: 'absolute', cursor:'move', width: w+'px', height: h+'px', backgroundColor: '#ccc', opacity: 0.5, top: (mousePos.y-h/2-4)+"px"}); //style drag
		list.insertBefore(dragger,slot); //re-add drag
		
		Event.stop(e);
		Event.observe(document,'mousemove', foldDrag);
		Event.observe(document,'mouseup', foldDrop);
		Event.stopObserving('folderlist','mousedown', foldStartDrag);
	}
}

function foldRenumber() {
	var nums = $$('input.num');
	for(var i=0; i<nums.length; i++) {
		nums[i].value = i+1;
	}
}

function toggleTOC() {
	var style = $('toc').readAttribute('colorstyle');
	if($('toc').visible()) {
		$('toc').hide();
		$('tocsmall').show();
		$('main').addClassName('front');
		document.body.style.background = "url(/images/"+style+"side_small.gif) repeat-y left";
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k=toc&v=1'} );

	} else {
		$('toc').show();
		$('tocsmall').hide();
		$('main').removeClassName('front');
		document.body.style.background = "url(/images/"+style+"side.gif) repeat-y left";
		new Ajax.Request( '/ajax/set_cookie.php', {method: 'post', postBody: 'k=toc&v=0'} );
	}
	manageTabs();
	return false;
}

function fieldsUsed(id) {
	if(id==1) {
		if($('omit65536').checked) {
			$('omit1048576').enable();
		} else {
			$('omit1048576').disable();
			$('omit1048576').checked = false;
		}
	} else if(id==2) {
		if($('omit2').checked) {
			$('omit2048').enable();
		} else {
			$('omit2048').disable();
			$('omit2048').checked = false;
		}
	}
}

// NOTEBOOK =========================================================================================================
function note_registerObservers() {
	if($('action_addNote')!=null) Event.observe('action_addNote','click', note_new);
	if($('noteshield')!=null) Event.observe('noteshield','click', note_hide);
	if($('action_notecancel')!=null) Event.observe('action_notecancel','click', note_hide);
	if($('action_noteedit')!=null) Event.observe('action_noteedit','click', note_edit);
	
	if($('note_title')!=null) Event.observe('note_title','keypress', note_dirty);
	if($('notefield')!=null) Event.observe('notefield','keypress', note_dirty);
	if($('fold')!=null) Event.observe('fold','change', note_dirty);
}

function note_dirty(e) {
	unsavedChanges=1;
}

function note_show(id) {
	$('notetext').update('Loading...');
	$('notetext').show();
	$('noteshield').show();
	$('notebook').show();
	$('read_note').show();
	$('edit_note').hide();
	$('allowedhtml').hide();
	$('addbtn').hide();
	$('notebook').setAttribute('nid',id);
	$('notefield').value='';
	$('notefield').hide();
	$('action_noteedit').hide();
	new Ajax.Updater('notetext', '/ajax/get_note.php', {method: 'post', postBody: 'id='+id, onComplete: note_loaded} );
}

function note_loaded(ret) {
	$('action_noteedit').show();
}

function note_new(e) {
	Event.stop(e);
	unsavedChanges=0;
	
	$('notefield').update();
	$('notefield').show();
	$('noteshield').show();
	$('edit_note').show();
	$('allowedhtml').show();
	$('addbtn').show();
	$('read_note').hide();
	$('notetext').hide();
	$('notebook').show();
	
	if($('notebook').getHeight()<20) $('notebook').setStyle({ height: '400px' }); //IE7 bug
	
	var w = $('notebook').getWidth()-16;
	var h = $('notebook').getHeight()-90;
	$('notefield').setStyle({ width: w+'px', height: h+'px' });
	
	
	$('note_title').value = '';
	setSelectedVal($('fold'),0);
	$('noteid').value = 0;
	$('note_title').focus();
	
}

function note_edit(e) {
	Event.stop(e);
	unsavedChanges=0;
	
	$('notefield').update("Loading...");
	$('notefield').show();
	$('noteshield').show();
	$('notebook').show();
	$('read_note').hide();
	$('edit_note').show();
	$('allowedhtml').show();
	$('addbtn').show();
	
	var w = $('notebook').getWidth()-16;
	var h = $('notebook').getHeight()-90;
	$('notefield').setStyle({ width: w+'px', height: h+'px' });

	
	var id = $('notebook').readAttribute('nid');
	var title = $('title'+id).innerHTML.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
	var note = linkReplace(br2nl($('notetext').innerHTML.strip().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")));
	var folder = $('title'+id).readAttribute('folder');
	
	$('noteid').value = id;
	$('note_title').value=title;
	$('notefield').value=note;
	if(folder) setSelectedVal($('fold'),folder);
}

function note_hide(e) {
	Event.stop(e);
	if($('edit_note').visible() && unsavedChanges) {
		var cont=confirm("Are you sure that you want to abandon any edits that you have made?");	
		if(!cont) return;
	}
	$('noteshield').hide();
	$('notebook').hide();
	$('notefield').value='';
	$('note_title').value = '';
	$('notetext').update();
	setSelectedVal($('fold'),0);
	$('noteid').value = 0;
}

// GEARS =========================================================================================================
function goOffline() {
	if($('action_addtask')) $('action_addtask').hide();
	if($('sorttask')) $('sorttask').hide();
	if($('sharetask')) $('sharetask').hide();
	if($('filtertask')) $('filtertask').hide();
	if($('action_sorttask')) $('action_sorttask').hide();
	if($('action_sharetask')) $('action_sharetask').hide();
	if($('action_filtertask')) $('action_filtertask').hide();
	if($('tb_cust')) $('tb_cust').hide();
	if($('t0mr')) $('t0mr').hide();
	
	if(offline==0) {
		gears_createStore();
	} else { 
		$('gooffline').hide();
		$('goonline').show();
	}
	offline=1;
}

function goOnline() {
	if($('action_addtask')) $('action_addtask').show();
	if($('action_sorttask')) $('action_sorttask').show();
	if($('action_sharetask')) $('action_sharetask').show();
	if($('action_filtertask')) $('action_filtertask').show();
	if($('tb_cust')) $('tb_cust').show();
	if($('t0mr')) $('t0mr').show();

	if(offline==1) gears_removeStore();
	
	$('gooffline').show();
	$('goonline').hide();
	
	offline=0;
}

function gears_init() {
	if(google.gears && $('gooffline') && $('goonline')) {
		var localServer = google.gears.factory.create('beta.localserver');
		var store = localServer.openManagedStore('toodledo-store');
		if(store==null) {
			offline=0;
			goOnline();
		} else {
			offline=1;
			goOffline();
		}
	}
}

function gears_createStore() {
	if(google.gears) {
		$('gooffline').update("Downloading Data...");
		var localServer = google.gears.factory.create('beta.localserver');
		var store = localServer.createManagedStore('toodledo-store');
		store.manifestUrl = '/ajax/manifest.php';
		store.checkForUpdate();
		
		var timer = google.gears.factory.create('beta.timer');
		var timerId = timer.setInterval(function() {
			// When the currentVersion property has a value, all of the resources
			// listed in the manifest file for that version are captured. There is
			// an open bug to surface this state change as an event.
			if (store.currentVersion) {
			  timer.clearInterval(timerId);
			  $('gooffline').update("Go Offline");
			  $('gooffline').hide();
			  $('goonline').show();
			  $('goonline').update("Go Online ("+store.currentVersion+")");
			 
			} else if(store.updateStatus==3) {
				alert(store.lastErrorMessage);
				timer.clearInterval(timerId);
				$('gooffline').update("Go Offline");
				goOnline();
				gears_removeStore();
			}
		}, 500);
	}
}

function gears_removeStore() {
	if(google.gears) {
		var localServer = google.gears.factory.create('beta.localserver');
 		localServer.removeManagedStore('toodledo-store');
 	}
}
