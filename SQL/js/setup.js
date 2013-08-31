$(document).ready(function(){


if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }

  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

var username = window.location.search.split('username=')[1].split('&')[0];

var messageList = $(".messages");
var roomList = $('.rooms');
var roomObj = {};
var currentRoom;
var friendList = [];

var createRoom = function(room) {
  var jsonText = JSON.stringify({roomname: room});

  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    url: 'http://127.0.0.1:8080/classes/' + room,
    data: jsonText,
    success: function(data) {
      console.log ('success!');
    }
  });
};

var renderFriendList = function(){
  $('#friendList').html('');
  for (var i=0; i<friendList.length; i++) {
    $('#friendList').append(friendList[i] + '<br>');
  }
};

var addFriend = function(friend) {
  if (_.contains(friendList, friend)) {
    return;
  } else {
    friendList.push(friend);
  }
  renderFriendList();
};

var postMessage = function(username, message, room) {

  var jsonText = JSON.stringify({username: username, text: message}); // prev had room here also

  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    url: 'http://127.0.0.1:8080/classes/messages',
    data: jsonText,
    success: function(data) {
      console.log('success!: ' + data);
    }
  });

};

var renderMessage = function(username, createdAt, message) {
  var messageSpan;

  if(_.contains(friendList, username)) {
    messageSpan = $('<b>').text(message);
  } else {
    messageSpan = $('<span>').text(message);
  }

  usernameSpan = $('<a class="username">').text(username);

  var newMessage = $('<li>').html('<b>Username: </b>');
  newMessage.append(usernameSpan);
  newMessage.append('<br><b>Created At: </b>' + createdAt + '<br><b>Message: </b>');

  newMessage.append(messageSpan).append('<hr>');
  messageList.append(newMessage);
};

var renderRoomList = function() {
  var roomOption;
  roomList.html('');
  roomList.append('<option>----</option>');
    for (var key in roomObj) {
      console.log("currentRoom: " + currentRoom + "\nkey: " + key);
      if (key === currentRoom) {
        roomOption = $('<option selected>').text(key);
      } else {
        roomOption = $('<option>').text(key);
      }
      roomList.append(roomOption);
    }
};

var fetchMessages = function(firstLoad) {
  // request({
  //   method: "POST",
  //   uri: 'http://127.0.0.1:8080/classes/messages',
  //   form: {username: ''}
  // })
  $.get(
    'http://127.0.0.1:8080/classes/messages', //?order=-createdAt
    function(data){
      data = JSON.parse(data);
      console.log("GET response from server: ",data);
      messageList.empty();
      $.each(data, function(key, value) {
        // console.log(data[0]['message']);
//iterate through all messages irrespective of the value.roomname of them
        // if (currentRoom === undefined) { //generate room list
        //   if (roomObj[value.roomname]===undefined) {
        //     roomObj[value.roomname] = 1;
        //   } else {
        //     roomObj[value.roomname] += 1;
        //   }
        renderMessage(data[key]['username'], value.createdAt, data[key]['message']);

        // } else {
        //   //iterate through all messages, grab only messages with value.roomname = currentRoom
        //   //store matching messages in variable.
        //   if (value.roomname === currentRoom) {
        //     renderMessage(value.username, value.createdAt, value.text);
        //   }
        // }
      });

  renderRoomList();

    }
  );

};

//postMessage('tae', 'hi', 'testroom');

$('.send').on('click', function(){
  var draft = $('.draft').val();
  if (draft === '') {
    return;
  }
  postMessage(username, draft, currentRoom);
  $('.draft').val('');
});

$('.rooms').change(function() {
  currentRoom = $(".rooms").val();
  if (currentRoom === "----"){
    currentRoom = undefined;
  }
    console.log(currentRoom);

});

$('.newRoomButton').on('click', function(){
  // var roomName = $('.newRoom').val();
  // createRoom(roomName);
  // console.log(roomName + ' created');
  currentRoom = $('.newRoom').val();
  roomObj[currentRoom] = 1;
  $('.newRoom').val('');
  if(roomObj[currentRoom]!==undefined) createRoom(currentRoom);
});

$('#main').on('click', '.username', function(){
  var clickedUser = $(this).text();
  addFriend(clickedUser);
  console.log('username: ' + clickedUser);
});

fetchMessages(true);

setInterval(fetchMessages, 4000);

});







