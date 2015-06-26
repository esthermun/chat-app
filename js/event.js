//my event submit events functions

// login & signup

$('#loginForm').submit(function(event){
	event.preventDefault();
	var loginForm = $('#loginForm');
	var myUsername = loginForm.find('input[name = "username"]');
	var myPassword = loginForm.find('input[name = "password"]');
	var newUser = checkIfSignUp.checked; // true or false
	var error = false;

	//console.log(newUser);
	console.log("Login form submitted");

	if (myUsername.val() === '' || myPassword.val() === ''){
		myUsername.css('border-color', 'red');
		myPassword.css('border-color', 'red');
		//loginForm.append("<p>Please enter a value!</p>");
		console.log("Need to enter");
		$('#logText').text("<p>Please enter username/password.</p>");
		error = true;
	}

	if(!error) {
		//console.log(myUsername.val());
		//console.log(myPassword.val());

          if (newUser){
          	console.log("signup");
          	signup(myUsername.val(), myPassword.val());
          	//myForm.append("<p>Now, trying logging in</p>");         	

          } else {
          	console.log("Let's login");
          	login(myUsername.val(), myPassword.val());
          	// upon logging in, close this box and start chat session
         
          }
	}

});


// $('#commentForm').submit(function(event){
// 	event.preventDefault();
// 	var commentForm = $('#commentForm');
// 	var myMessage = commentForm.find('textarea[name="comment"]').val();

// 	sendMessage(myMessage);
// });