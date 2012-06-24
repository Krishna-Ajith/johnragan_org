<div class="attractionAddPartial">
<form class="form-horizontal">
  <fieldset>
    <div class="control-group">
      <label class="control-label" for="new_attraction_title">Title</label>
      <div class="controls">
        <input type="text" class="input-xlarge focused" id="new_attraction_title">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="new_attraction_summary">Summary</label>
      <div class="controls">
        <textarea class="input-xlarge" id="new_attraction_summary" rows="3"></textarea>
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="new_attraction_photo_url">Photo URL</label>
      <div class="controls">
        <input type="text" class="input-xlarge" id="new_attraction_photo_url">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="new_attraction_rating">Rating</label>
      <div class="controls">
        <input type="number" class="input-small" value="5" id="new_attraction_rating">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="new_attraction_wait">Wait Type</label>
      <div class="controls">
        <select id="new_attraction_wait">
          <option>Busy</option>
          <option>Idle</option>
        </select>
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="new_attraction_intensity">Intensity</label>
      <div class="controls">
        <input type="number" class="input-small" value="5" id="new_attraction_intensity">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="id_attraction_height">Height</label>
      <div class="controls">
        <input type="number" class="input-small" id="id_attraction_height">
			  <p class="help-block">Leave empty if there is no height restriction.</p>
      </div>
    </div>
	  <div class="control-group">
	    <label class="control-label" for="inlineCheckboxes1">Options</label>
	    <div id="new_attraction_options1" class="controls">
	      <label class="checkbox inline">
	        <input type="checkbox" id="attraction_fpCheckbox" value="fp"> Fast Pass
	      </label>
	      <label class="checkbox inline">
	         <input type="checkbox" id="attraction_palMickey" value="palMickey"> Pal Mickey
	      </label>
	    </div>
	  </div>
	  <div class="control-group">
	    <label class="control-label" for="inlineCheckboxes2"></label>
	    <div id="new_attraction_options2" class="controls">
	      <label class="checkbox inline">
	        <input type="checkbox" id="attraction_rideswap" value="rideswap"> Ride Swap
	      </label>
	      <label class="checkbox inline">
	        <input type="checkbox" id="attraction_wheelchair" value="wheelchair"> Wheelchair
	      </label>
	    </div>
	  </div>
  </fieldset>
</form>
</div>