$(document).ready(function() {
  var bindBehaviors = function(scope) {
    $('h3', scope).click(function() {
      $(this).toggleClass('highlight');
    });
  };
  
  // If invoked again, it will double invoke the toggle, cancelling it out
  bindBehaviors(this);
  
  // To avoid the above, we could have used event bubbling in conjunction with
  // a higher container and using event.target:
  //$('body').click(function(event) {
  //    if ($(event.target).is('h3')) {
  //         $(event.target).toggleClass('highlighted');
  //    }
  //});
  
  // The second version below this one uses the optional on
  // success callback.
  //$('#letter-a .button').click(function() {
  //  $('#dictionary').load('a.html');
  //});
  $('#dictionary').hide().load('a.html', function() {
    bindBehaviors(this);
    $(this).fadeIn('slow');
  });
  
  $('#letter-b .button').click(function() {
    $.getJSON('json/b.json', function(data) {
      $('#dictionary').empty();
      $.each(data, function(entryIndex, entry) {
        var html = '<div class="entry">';
        html += '<h3 class="term">' + entry['term'] + '</h3>';
        html += '<div class="part">' + entry['part'] + '</div>';
        html += '<div class="definition">';
        html += entry['definition'];
        if (entry['quote']) {
          html += '<div class="quote">';
          $.each(entry['quote'], function(lineIndex, line) {
          html += '<div class="quote-line">' + line + '</div>';
          });
          if (entry['author']) {
            html += '<div class="quote-author">' + entry['author'] +
            '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        $('#dictionary').append(html);
      });
    });
  });
  
  $('#letter-c .button').click(function() {
    $.getScript('external_js/c.js');
  });
  
  $('#letter-d .button').click(function() {
    $.get('external_xml/d.xml', function(data) {
      $('#dictionary').empty();
      $(data).find('entry').each(function() {
        var $entry = $(this);
        var html = '<div class="entry">';
        html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
        html += '<div class="part">' + $entry.attr('part') + '</div>';
        html += '<div class="definition">'
        html += $entry.find('definition').text();
        var $quote = $entry.find('quote');
        if ($quote.length) {
          html += '<div class="quote">';
          $quote.find('line').each(function() {
            html += '<div class="quote-line">' + $(this).text() +
            '</ div>';
          });
          if ($quote.attr('author')) {
            html += '<div class="quote-author">' +
            $quote.attr('author') + '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        $('#dictionary').append($(html));
      });
    });
  });
  
  $('#letter-e a').click(function() {
    $.get('term/term', {'term': $(this).text()}, function(data) {
      $('#dictionary').html(data);
    });
    return false;
  });
  
  $('#letter-e2 a').click(function() {
    // This is also valid:
    //$('#dictionary').load('term/term', {'term': $(this).text()});
    // This is failing due to the way Rails now protects against forgery
    // See http://www.mddev.co.uk/tag/invalidauthenticitytoken/
    // This seems to limit doing a post as opposed to get from a static web page.
    $.post('term/term', {'term': $(this).text()}, function(data) {  
      $('#dictionary').html(data);
    });
    return false;
  });
  
  // While the .serialize() method is convenient, it does not perfectly mimic 
  // the submit action of a browser. In particular, multiple-select fields 
  // will be reduced to a single selection when serialized. Use this method 
  // with caution. For an exact imitation of a browser's normal form submission 
  // behavior, we can instead turn to the form.js jQuery plug-in.
  $('#letter-f form').submit(function() {
    $.get('term/uppercase', $(this).find('input').serialize(), function(data)
    {
      $('#dictionary').html(data);
    });
    return false;
  });
  
  $('#loading').ajaxStart(function() {
      $(this).show();
    }).ajaxStop(function() {
      $(this).hide();
  });
});