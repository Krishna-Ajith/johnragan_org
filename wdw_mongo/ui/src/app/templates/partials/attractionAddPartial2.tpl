<div class="attractionAddPartial">
<form class="form-horizontal">
  <fieldset>
    <div class="control-group">
      <label class="control-label" for="{{attraction_title_id}}">Title</label>
      <div class="controls">
        <input type="text" class="input-xlarge focused" id="{{attraction_title_id}}">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_summary_id}}">Summary</label>
      <div class="controls">
        <textarea class="input-xlarge" id="{{attraction_summary_id}}" rows="3"></textarea>
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_photo_url_id}}">Photo URL</label>
      <div class="controls">
        <input type="text" class="input-xlarge" id="{{attraction_photo_url_id}}">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_rating_id}}">Rating</label>
      <div class="controls">
        <input type="number" class="input-small" value="5" id="{{attraction_rating_id}}">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_wait_id}}">Wait Type</label>
      <div class="controls">
        <select id="{{attraction_wait_id}}">
          <option>Busy</option>
          <option>Idle</option>
        </select>
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_intensity_id}}">Intensity</label>
      <div class="controls">
        <input type="number" class="input-small" value="5" id="{{attraction_intensity_id}}">
      </div>
    </div>
	  <div class="control-group">
      <label class="control-label" for="{{attraction_height_id}}">Height</label>
      <div class="controls">
        <input type="number" class="input-small" id="{{attraction_height_id}}">
			  <p class="help-block">Leave empty if there is no height restriction.</p>
      </div>
    </div>
	  <div class="control-group">
	    <label class="control-label" for="{{inlineCheckboxes1_id}}">Options</label>
	    <div id="{{attraction_options1_id}}" class="controls">
	      <label class="checkbox inline">
	        <input type="checkbox" id="{{attraction_fpCheckbox_id}}" value="fp"> Fast Pass
	      </label>
	      <label class="checkbox inline">
	         <input type="checkbox" id="{{attraction_palMickey_id}}" value="palMickey"> Pal Mickey
	      </label>
	    </div>
	  </div>
	  <div class="control-group">
	    <label class="control-label" for="{{inlineCheckboxes2_id}}"></label>
	    <div id="{{attraction_options2_id}}" class="controls">
	      <label class="checkbox inline">
	        <input type="checkbox" id="{{attraction_rideswap_id}}" value="rideswap"> Ride Swap
	      </label>
	      <label class="checkbox inline">
	        <input type="checkbox" id="{{attraction_wheelchair_id}}" value="wheelchair"> Wheelchair
	      </label>
	    </div>
	  </div>
  </fieldset>
</form>
</div>