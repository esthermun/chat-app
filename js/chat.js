// Initialize global user 
// (a good idea to store the information you need
// when sending messages here)
var CURRENT_USER = null;

//login() logs in a user by creating a session


$('#loginForm').submit(function(event){
	event.preventDefault();
	var loginForm = $('#loginForm');
	var myUsername = loginForm.find('input[name = "username"]');
	var myPassword = loginForm.find('input[name = "password"]');
	var error = false;

	console.log("form submitted"); // works!
	//console.log(myUsername.val()); // works!
	//console.log(myPassword.val()); //works!

	// check error - for no value entered 
	if (myUsername.val() == '' || myPassword.val() == ''){
		myUsername.css('border-color', 'red');
		myPassword.css('border-color', 'red');
		console.log("enter something!");
		error = true;
	} 


// signup() creates an account that we can sign in with
	var newUser = checkIfSignUp.checked;
	console.log(newUser); // true or false
	
	if(!error){
		
		console.log(loginForm.serialize());

		$.ajax({
			url: 'http://45.55.83.78/users',
			type: loginForm.attr('method'),
			data: loginForm.serialize(),
			dataType:'jsonp',
			success: function (data){
				console.log(data);
				

				// push it to users info

			},
			error: function (data) {
				console.log(data);

			}
		});
	}
	


	// if no error, POST data for login
/*	if(!error){
		$.ajax({
			url: 'http://45.55.83.78/users/login',
			type: loginForm.attr('method'),
			data: loginForm.serialize(),
			dataType: 'jsonp', 
			success: function login (data) {
				for (var i = 0 ; i < data.length; i++){
					if (data[i].username == myUsername && data[i].password == myPassword){
						console.log("Welcome back " + data[i].username);
					} else {}
				
				}
			},
			error: function (data) {
			console.log(data + " not found.");
			}

		});
	}	
*/
	

	
	

});




// sendMessage() sends a message to the API
function sendMessage() {

}

// getMessages() gets all messages from the API.
// we can use diff() to get only the new ones.
function getMessages() {

}

function User (){
	this.username = $('#loginForm').find('input[name = "username"]').val();
	this.password = $('#loginForm').find('input[name = "password"]').val();
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