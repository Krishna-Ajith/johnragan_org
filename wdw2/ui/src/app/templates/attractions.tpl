{{#each myAttractions}}
  <section>
    <div class="row">
      <div class="span3">
        <img src="{{list_item_photo_url}}" alt="{{name}} picture"/>
      </div>
      <div class="span6">
        <div class="row">
          <div class="span6">
            <h2 class="attraction_name">&#062; {{name}}</h2><br/>
          </div>
        </div>  
        <div class="row">
          <div class="span6">
            <strong><span class="summary_popover attraction_summary" rel="popover" title="Ride Summary" data-content="{{summary}}">Hover for Summary </span></strong><i class="icon-search summary_popover"></i>
          </div>
        </div>
        <div class="row">  
          <div class="span1">
            <strong>Rating:</strong><br/>
            <strong>Wait Type:</strong><br/>
            <strong>Intensity:</strong><br/>
            <strong>Height:</strong><br/>
          </div> 
          <div class="span1">
            <div style="float:right">
              <span class="badge {{ratingFormatter rating}}">{{rating}}</span><br/>
              <span class="badge {{waitFormatter wait}}">{{wait}}</span><br/>
              <span class="badge {{ratingFormatter intensity}}">{{intensity}}</span><br/>
			  {{#if height}}<span class="label label-success">{{height}}</span>{{/if}}<br/>
            </div>
          </div>
          <div class="span3">
            {{#if FP}}<span class="label label-info">{{FP}}</span>{{/if}}<br/>
            {{#if pal_mickey}}<span class="label label-warning">{{pal_mickey}}</span>{{/if}}<br/>
            {{#if rider_swap}}<span class="label">{{rider_swap}}</span>{{/if}}<br/>
            {{#if wheelchair}}<span class="label label-important">{{wheelchair}}</span>{{/if}}<br/>
          </div>  
        </div>
      </div>
    <div>
    <br/>
  </section>
 {{/each}}