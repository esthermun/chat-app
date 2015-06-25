//my event submit events functions

// login & signup

$('#loginForm').submit(function(event){
	event.preventDefault();
	var loginForm = $('#loginForm');
	var myUsername = loginForm.find('input[name = "username"]');
	var myPassword = loginForm.find('input[name = "password"]');
	var newUser = checkIfSignUp.checked; // true or false
	var error = false;

	console.log(newUser);

	if (myUsername.val() === '' || myPassword.val() === ''){
		myUsername.css('border-color', 'red');
		myPassword.css('border-color', 'red');
		console.log("Need to enter");
		error = true;
	}
	if(!error) {
          console.log( "doing something.");
	}

});


// submit messages

$('#inputChatForm').submit(function(event){
	event.preventDefault();
	var chatForm = $('#inputChatForm');
	var myMessage = chatForm.find('textarea[name = "cooment"]');

	console.log(myMessage);

}); 