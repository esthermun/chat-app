// Initialize global user 
// (a good idea to store the information you need
// when sending messages here)
var CURRENT_USER = null;

// sendMessage() sends a message to the API
function sendMessage(message) {
	$.ajax({
		url: 'http://chat-app.brainstation.io/messages',
		type: 'POST',
		data: {
			userID:'c3b73f90e8124b93',
			message: message,
		},
		//dataType:'jsonp',
		xhrFields: {
			withCredentials: true
		}, 
		success: function(data){
			console.log("message sent");
			console.log(message);
			console.log(data);
		},
		error: function(data){
			console.log("message not sent");
			console.log(data);
		}

	});
}

// getMessages() gets all messages from the API.
// we can use diff() to get only the new ones.
function getMessages() {
	$.ajax({
		url: 'http://chat-app.brainstation.io/messages',
		type: 'GET',
		//data: {},
		xhrFields: {
			withCredentials: true
		}, 
		success: function(data){
			console.log("yes, getting messages");
			for (var i = 0; i < data.length; i++){
				var message = data[i].message;
				var username = data[i].username;
				var timestamp = data[i].timestamp;
				var postedTime = getReadableTime(timestamp);
				//console.log(username + " wrote " + message + " on " + postedTime);
				$('#allUserMssgs').append(mssgToHTML(username, message, postedTime));	
			}
			scrollBottom($('#allUserMssgs'), 1500);
		},
		error: function(data){
			console.log("no no messages");
			console.log(data);
		}
	});
}
getMessages();

// login() logs in a user by creating a session
function login(username, password) {
	$.ajax({
		url: 'http://chat-app.brainstation.io/users/login',
		type: 'POST',
		data: {
			username: username,
			password: password
		},
		xhrFields: {
			withCredentials: true
		}, 
		success: function(data){
			console.log("yes");
			console.log(data);
			var userID = data.uid;
			console.log(userID);

		},
		error: function (data){
			console.log("no");
			console.log(data);
		} 

	});
	
}

// signup() creates an account that we can sign in with
function signup(username, password) {
	$.ajax({
		url: 'http://chat-app.brainstation.io/users',
		type: 'POST',
		data: {
			username: username,
			password: password
		}, 
		xhrFields: {
			withCredentials: true
		}, 
		success:function(data){
			console.log("yes ");
			console.log (data.userID);
			//loginForm.reload();
		},
		error: function(data){
			console.log("no");
			console.log(data);
		}

	});

}

function mssgToHTML(username, message, postedTime){
	return "<article class = 'mssgLine'>" 
			+ "<div><p><strong>" + username + " wrote: </strong></p>"
			+ "<p>" + message + "</p></div>"
			+ "<div class = 'timeLine'><p>" + postedTime + "</p></div>"
			+ "</article>";
}

// HELPERS -------
// You can use these and modify them to fit your needs. 
// If you are going to use them, make sure you understand
// how they work!

// Helper - returns all elements in an array A, that are not in B
function diff(a, b) {
	var bIds = {}
	b.forEach(function(obj){
	    bIds[obj.id] = obj;
	});
	return a.filter(function(obj){
	    return !(obj.id in bIds);
	});
}

// Helper - scrolls to the bottom of the messages div
function scrollBottom(element, duration) {
	element.animate({ scrollTop: element[0].scrollHeight}, duration);
}

// Helper - turns JavaScript timestamp into something useful
function getReadableTime(stamp) {
	var time = new Date()
	time.setTime(stamp)
	return time.getMonth()+"/"+time.getDate()+" "+pad(time.getHours(),2)+":"+pad(time.getMinutes(),2);
}

// Helper - pads a number with zeros to a certain size. Useful for time values like 10:30.
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = s + "0";
    return s;
}

// Prints a useful error message to the console. Used when AJAX fails. A message can help us find the problem
function error(data, message) {
	console.log('Error '+message+': '+JSON.stringify(JSON.parse(data.responseText)))
}