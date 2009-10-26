/* =================================================================================

Protocal 1.0
8-10-07
Jake Olefsky
www.jakeo.com

Javascript Popup calendar for form input date selection, built on prototype.js.

USAGE:

<script type="text/javascript" src="/includes/prototype.js"></script>
<script type="text/javascript" src="/includes/protocal.js"></script>

<input type="text" id="objectID" />

<script type="text/javascript">

Event.observe('objectID','focus', function(e) {
	var obj = Event.element(e);
	var preSelected = new Date(); //set this to any timestamp that you want to be pre-selected
	
	var Cal = new ProtoCal(obj, preSelected, myCallback, null,null);
});

function myCallback(val) {
	var selectedDate = new Date(parseInt(val));
	$('objectID').value = selectedDate.toString();
}

</script>


================================================================================= */

function ProtoCal(placement,time,weekstart,picked,changed,focus) {
	this.callback =  picked; //callback to pass selected value
	this.notify =  changed; //callback to inform of month/year change
	this.focus =  focus; //callback to inform of month/year change
	this.placement = placement;
	this.weekstart = weekstart;
	
	if(weekstart==1) this.lang_days = new Array('Mo','Tu','We','Th','Fr','Sa','Su');
	else this.lang_days = new Array('Su','Mo','Tu','We','Th','Fr','Sa');
	this.lang_months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	this.lang_next = 'Go to the next month';
	this.lang_prev = 'Go to the previous month';	
	
	this.switchDate(time);
	
	this.clickListener = this.dayClick.bindAsEventListener(this); //create listener for this input
	Event.observe(placement, 'click', this.clickListener);
}

ProtoCal.prototype.switchDate = function (time) {
	
	this.time = time; //preset date (unix time in seconds)
	
	this.today = new Date();
	
	if(this.time<=0 || this.time==null || isNaN(this.time)) {
		this.time = 0;
		this.month = this.today.getUTCMonth();
		this.year = this.today.getUTCFullYear();
	} else {
		this.preset = new Date(this.time); //javascript does unix stamps in milliseconds
		this.month = this.preset.getUTCMonth();
		this.year = this.preset.getUTCFullYear();
		if(this.year>2100) this.year = 2100;
	}
	this.daysinmonth = new Array(31,((this.today.getUTCFullYear() - 2000) % 4 ? 28 : 29),31,30,31,30,31,31,30,31,30,31); //num days in month

	$(this.placement).update();
	this.buildCal(); //construct calendar
	this.showCal(); //reveal calendar
}

ProtoCal.prototype.stop = function () {
	if($(this.placement)!=null) {
		Event.stopObserving('protocal_month', 'change', this.monthListener);
		Event.stopObserving('protocal_year', 'change', this.yearListener);
		Event.stopObserving('protocal_next', 'click', this.nextListener);
		Event.stopObserving('protocal_prev', 'click', this.prevListener);
		Event.stopObserving(this.placement, 'click', this.clickListener);
		
		if(this.focus!=null) Event.observe('protocal_month', 'focus', this.focus);
		if(this.focus!=null) Event.observe('protocal_year', 'focus', this.focus);
		
		$(this.placement).update();
	}
}

//-----------------------------------------------------------------------------
ProtoCal.prototype.buildCal = function () {
	new Insertion.Top(this.placement,"<div id='protocal_top'><input type='button' value='&lt;' id='protocal_prev'><input type='button' value='&gt;' id='protocal_next'></div>");

	this.monthDrop(); //insert month dropdown into top div
	this.yearDrop(); //insert year dropdown into top div
	
	this.monthTable(); //insert month table into calendar div
	
	this.nextListener = this.nextMonth.bindAsEventListener(this); //create listener for this input
	Event.observe('protocal_next', 'click', this.nextListener);
	this.prevListener = this.prevMonth.bindAsEventListener(this); //create listener for this input
	Event.observe('protocal_prev', 'click', this.prevListener);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.showCal = function () {
	$(this.placement).show(); //reveal the calendar
	$(this.placement).style.visibility="visible";
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.monthDrop = function () {
	var select = "<select id='protocal_month'>";
	for(var i=0;i<12;i++) { //loop through all months and display option
		if(i==this.month) select += "<option value='"+i+"' selected='selected'>"+this.lang_months[i]+"</option>";
		else select += "<option value='"+i+"'>"+this.lang_months[i]+"</option>";
	}
	select += "</select>";
	
	new Insertion.After('protocal_prev',select); //stick it in
	
	this.monthListener = this.changeMonth.bindAsEventListener(this); //create listener for this input
	Event.observe('protocal_month', 'change', this.monthListener);
	if(this.focus!=null) Event.observe('protocal_month', 'focus', this.focus);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.yearDrop = function () {
	var select = "<select id='protocal_year'>";
	for(var i=2007;i<this.year+5;i++) { // one year back, 4 years forward
		if(i==this.year) select += "<option value='"+i+"' selected='selected'>"+i+"</option>";
		else select += "<option value='"+i+"'>"+i+"</option>";
	}
	select += "</select>";
	
	new Insertion.After('protocal_month',select); //stick it in
		
	this.yearListener = this.changeYear.bindAsEventListener(this); //create listener for this input
	Event.observe('protocal_year', 'change', this.yearListener);
	if(this.focus!=null) Event.observe('protocal_year', 'focus', this.focus);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.monthTable = function () {
	var start = new Date(this.year,this.month,1);
	var end = new Date(this.year,this.month,this.daysinmonth[this.month]);
	var current = new Date(this.year,this.month,1);
		
	current.setUTCDate(current.getUTCDate() - start.getUTCDay()+this.weekstart); //set start of table to appropriate day (may be last month)

	var table = "<table cellpadding='0' cellspacing='0' id='protocal_table'><tr>";

	//weekday names
	for(var i=0;i<7;i++) table += "<th>"+this.lang_days[i]+"</th>";

	//calendar
	var style='';
	for(var i=0;i<42;i++) { //we are going to display 6 weeks total
		if(i % 7 == 0) table += "</tr><tr>"; //add a row every 7 days
		
		if(this.month!=current.getUTCMonth()) style="dim";
		else if(this.time!=0 && current.getUTCFullYear() == this.preset.getUTCFullYear() && current.getUTCMonth() == this.preset.getUTCMonth() && current.getUTCDate() == this.preset.getUTCDate()) style="sel";
		else if(current.getUTCFullYear() == this.today.getFullYear() && current.getUTCMonth() == this.today.getMonth() && current.getUTCDate() == this.today.getDate()) style="today";
		else if(current.getUTCDay()==0 || current.getUTCDay()==6) style="end";
		else style="day";
		
		table += "<td class='"+style+"' time='"+current.getTime()+"'>"+current.getUTCDate()+"</td>";
		current.setUTCDate(current.getUTCDate() + 1); //increment the date
	}
	
	table += "</table></table>";
	
	new Insertion.Bottom(this.placement,table);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.changeMonth = function (e) {
	var newMonth = $F('protocal_month');
	
	this.month = newMonth;
	
	$('protocal_table').remove(); //remove old table and redraw
	this.monthTable();
	if(this.notify!=null) this.notify(this.month,this.year);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.changeYear = function (e) {
	var newYear = $F('protocal_year');
	
	this.year = newYear;
	
	$('protocal_table').remove(); //remove old table and redraw
	this.monthTable();
	if(this.notify!=null) this.notify(this.month,this.year);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.nextMonth = function (e) {
	this.month++;
	if(this.month>11) { 
		this.month = 0;
		this.year++;
	}
	
	var exists = this.setSelected('protocal_year',this.year);
	if(exists) {
		this.setSelected('protocal_month',this.month);
		
		$('protocal_table').remove(); //remove old table and redraw
		this.monthTable();
	} else {
		this.month = 11;
		this.year--;
		this.setSelected('protocal_year',this.year);
	}
	
	if(this.notify!=null) this.notify(this.month,this.year);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.prevMonth = function (e) {
	this.month--;
	if(this.month<0) { 
		this.month = 11;
		this.year--;
	}
	
	var exists = this.setSelected('protocal_year',this.year);
	if(exists) {
		this.setSelected('protocal_month',this.month);
		
		$('protocal_table').remove(); //remove old table and redraw
		this.monthTable();
	} else {
		this.month = 0;
		this.year++;
		this.setSelected('protocal_year',this.year);
	}
	
	if(this.notify!=null) this.notify(this.month,this.year);
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.dayClick = function (e) {
	var obj = Event.element(e);
	
	if(obj.tagName=="TD") {
		var time = obj.readAttribute('time');
		this.callback(time);
		//this.stop();
	}
}
//-----------------------------------------------------------------------------
ProtoCal.prototype.setSelected = function (obj,val) {
	obj = $(obj);
	var found = 0;
	for(var i=0;i<obj.options.length;i++) {
		if(obj.options[i].value==val) {
			obj.selectedIndex = obj.options[i].index;
			obj.options[i].selected=true;
			found=1;
		} else {
			obj.options[i].selected=false;
		}
	}
	return found;
}
//-----------------------------------------------------------------------------
