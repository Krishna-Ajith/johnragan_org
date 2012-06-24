<div>
	<form class="well form-search">
		<a id="add-attraction" data-toggle="modal" href="#myModal">Add an Attraction</a><br/>
		<a id="remove-attractions" href="#">Remove All Attractions</a> 
	</form>	
		
        <div id="myModal" class="modal hide fade">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h3>Add an Attraction</h3>
          </div>
          <div class="modal-body">
           	{{> attractionAddPartial}}
          </div>
          <div class="modal-footer">
            <a id="cancel_new_attraction" href="#" class="btn" data-dismiss="modal" >Cancel</a>
            <a id="save_new_attraction" href="#" class="btn btn-primary" data-dismiss="modal">Save Changes</a>
          </div>
		</div>
</div>