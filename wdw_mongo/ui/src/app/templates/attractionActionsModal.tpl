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
           	<form class="form-horizontal">
		       <fieldset>
		          <div class="control-group">
		             <label class="control-label" for="attraction_title">Title</label>
		             <div class="controls">
		                <input type="text" class="input-xlarge focused" id="attraction_title">
		             </div>
		          </div>
				  <div class="control-group">
		            <label class="control-label" for="attraction_summary">Summary</label>
		            <div class="controls">
		              <textarea class="input-xlarge" id="attraction_summary" rows="3"></textarea>
		            </div>
		          </div>
				  <div class="control-group">
		             <label class="control-label" for="attraction_photo_url">Photo URL</label>
		             <div class="controls">
		                <input type="text" class="input-xlarge" id="attraction_photo_url">
		             </div>
		          </div>
				  <div class="control-group">
		             <label class="control-label" for="attraction_rating">Rating</label>
		             <div class="controls">
		                <input type="number" class="input-small" value="5" id="attraction_rating">
		             </div>
		          </div>
				  <div class="control-group">
		            <label class="control-label" for="attraction_wait">Wait Type</label>
		            <div class="controls">
		              <select id="select01">
		                <option>Busy</option>
		                <option>Idle</option>
		              </select>
		            </div>
		          </div>
				  <div class="control-group">
		             <label class="control-label" for="attraction_intensity">Intensity</label>
		             <div class="controls">
		                <input type="number" class="input-small" value="5" id="attraction_intensity">
		             </div>
		          </div>
				  <div class="control-group">
		             <label class="control-label" for="attraction_height">Height</label>
		             <div class="controls">
		                <input type="number" class="input-small" id="attraction_intensity">
						<p class="help-block">Leave empty if there is no height restriction.</p>
		             </div>
		          </div>
				  <div class="control-group">
				    <label class="control-label" for="inlineCheckboxes">Options</label>
				    <div class="controls">
				      <label class="checkbox inline">
				        <input type="checkbox" id="attraction_fpCheckbox" value="fp"> Fast Pass
				      </label>
				      <label class="checkbox inline">
				         <input type="checkbox" id="attraction_palMickey" value="palMickey"> Pal Mickey
				      </label>
				      <label class="checkbox inline">
				        <input type="checkbox" id="attraction_wheelchair" value="wheelchair"> Wheelchair
				      </label>
				    </div>
				</div>
		        </fieldset>
		     </form>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn" data-dismiss="modal" >Close</a>
            <a href="#" class="btn btn-primary" data-dismiss="modal">Save Changes</a>
          </div>
		</div>
</div>