$(document).ready(function() {
  
  if(!/(&|\?)username=/.test(window.location.search)){
    var newSearch = window.location.search;
    if(newSearch !== '' & newSearch !== '?'){
      newSearch += '&';
    }

    newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
    window.location.search = newSearch;
  }

  // set up variables
  var username = window.location.search.split('username=')[1].split('&')[0];
  var $messageList = $('.messages');

  var postMsg = function(username, message) {
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      dataType: 'json',
      url: 'http://127.0.0.1:8080/',
      data: jsonText,
      success: function() {
        console.log('Successfully posted!');
      }
    })
  };

  var renderMsg = function(username, message) {
    $messageList.append('<li><b>'+username+': </b>'+message+'</li>');
  }

  var fetchMsgs = function() {
    $.get('http://127.0.0.1:8080/', function(data){
      data = JSON.parse(data);
      console.log('GET response: '+data);
      $messageList.html('');
      $.each(data, function(key, value) {
        renderMsg(data[key]['username'], data[key]['message']);
      })
    })
  };

  $('#send').on('click', function(){
    var $userText = $('#userText');
    postMsg(username, $userText);
    $('#userText').val('');
  });

  setInterval(fetchMsgs, 2000);

});