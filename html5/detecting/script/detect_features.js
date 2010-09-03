function detectFeatures() {
  detectCanvasSupport();
  detectVideoSupport();
  detectLocalStorageSupport();
  detectWebWorkersSupport();
  detectOfflineApplicationSupport();
  detectGeoLocationSupport();
  detectInputTypes();
  detectMicrodataFormatsSupport();
}

function detectCanvasSupport() {
  if (Modernizr.canvas) {
    $('#canvas_support').html("<b>is</b>");
  } else {
    $('#canvas_support').html("<b>is not</b>");
  }
  
  if (Modernizr.canvastext) {
    $('#canvastext_support').html("<b>is</b>");
  } else {
    $('#canvastext_support').html("<b>is not</b>");
  }
}

function detectVideoSupport() {
  if (Modernizr.video) {
    $('#video_support').html("<b>is</b>");
    
    if (Modernizr.video.ogg) {
      $('#video_ogg_support').html("<b>is </b>");
    } else {
      $('#video_ogg_support').html("<b>is not</b>");
    }
    
    if (Modernizr.video.h264) {
      $('#video_h264_support').html("<b>is </b>");
    } else {
      $('#video_h264_support').html("<b>is not</b>");
    }
  } else {
    $('#video_support').html("<b>is not</b>");
    $('#video_ogg_support').html("<b>is not</b>");
    $('#video_h264_support').html("<b>is not</b>");
  }
}

function detectLocalStorageSupport() {
  if (Modernizr.localstorage) {
    $('#local_storage_support').html("<b>is</b>");
  } else {
    $('#local_storage_support').html("<b>is not</b>");
  }
}

function detectWebWorkersSupport() {
  if (Modernizr.webworkers) {
    $('#web_workers_support').html("<b>is</b>");
  } else {
    $('#web_workers_support').html("<b>is not</b>");
  }
}

function detectOfflineApplicationSupport() {
  if (Modernizr.applicationcache) {
    $('#offline_application_support').html("<b>is</b>");
  } else {
    $('#offline_application_support').html("<b>is not</b>");
  }
}

function detectGeoLocationSupport() {
  if (Modernizr.geolocation) {
    $('#geo_location_support').html("<b>is</b>");
  } else {
    $('#geo_location_support').html("<b>is not</b>");
  }
}

function detectInputTypes() {
  if (Modernizr.inputtypes.search) {
    $('#input_type_search_support').html("<b>is</b>");
  } else {
    $('#input_type_search_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.number) {
    $('#input_type_number_support').html("<b>is</b>");
  } else {
    $('#input_type_number_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.range) {
    $('#input_type_range_support').html("<b>is</b>");
  } else {
    $('#input_type_range_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.color) {
    $('#input_type_color_support').html("<b>is</b>");
  } else {
    $('#input_type_color_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.tel) {
    $('#input_type_telephone_support').html("<b>is</b>");
  } else {
    $('#input_type_telephone_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.url) {
    $('#input_type_url_support').html("<b>is</b>");
  } else {
    $('#input_type_url_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.email) {
    $('#input_type_email_support').html("<b>is</b>");
  } else {
    $('#input_type_email_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.date) {
    $('#input_type_date_support').html("<b>is</b>");
  } else {
    $('#input_type_date_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.month) {
    $('#input_type_month_support').html("<b>is</b>");
  } else {
    $('#input_type_month_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.week) {
    $('#input_type_week_support').html("<b>is</b>");
  } else {
    $('#input_type_week_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.time) {
    $('#input_type_time_support').html("<b>is</b>");
  } else {
    $('#input_type_time_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.datetime) {
    $('#input_type_datetime_support').html("<b>is</b>");
  } else {
    $('#input_type_datetime_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.datetime_local) {
    $('#input_type_datetime_local_support').html("<b>is</b>");
  } else {
    $('#input_type_datetime_local_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.placeholder) {
    $('#input_placeholder_support').html("<b>is</b>");
  } else {
    $('#input_placeholder_support').html("<b>is not</b>");
  }
  
  if (Modernizr.inputtypes.autofocus) {
    $('#input_autofocus_support').html("<b>is</b>");
  } else {
    $('#input_autofocus_support').html("<b>is not</b>");
  }
}

function detectMicrodataFormatsSupport() {
  if (!!document.getItems) {
    $('#microdata_support').html("<b>is</b>");
  } else {
    $('#microdata_support').html("<b>is not</b>");
  }
}