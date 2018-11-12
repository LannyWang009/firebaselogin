// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Set Authentication State Persistence
//    Options: 'local', 'session', 'none'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(function() {
  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  // return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error Persistence " + errorCode + ": " + errorMessage )
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Check user status
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

firebase.auth().onAuthStateChanged(function(user) {
  // Any logged out features need to have the class "loggedOut"
  var logOutFeatures = document.getElementsByClassName('loggedOut')
  // Any logged in features need to have the class "loggedIn"
  var logInFeatures = document.getElementsByClassName('loggedIn')

  if (user) {
    // User is signed in.
    for (var i = 0; i < logOutFeatures.length; i++) {
      logOutFeatures[i].style.display = 'none';
    }
    for (var i = 0; i < logInFeatures.length; i++) {
      logInFeatures[i].style.display = 'block';
    }

    var user = firebase.auth().currentUser;

    if (user!=null) {
      var user_id
      if (user.isAnonymous){
        user_id = "Guest"
      } else {
        user_id = user.email
      }
      if (document.getElementById("user_para")){document.getElementById("user_para").innerHTML = "Welcome User: " + user_id}
    }

  } else {
    // No user is signed in.
    for (var i = 0; i < logOutFeatures.length; i++) {
      logOutFeatures[i].style.display = 'block';
    }
    for (var i = 0; i < logInFeatures.length; i++) {
      logInFeatures[i].style.display = 'none';
    }
  }
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Login functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~ Call this function for email & password login ~~~~~~~~~~~~~~~
function login () {
  var userEmail = document.getElementById("email_field").value
  var userPassword = document.getElementById("password_field").value

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword ).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error email & password " + errorCode + ": " + errorMessage )
  });  
}

// ~~~~~ Call this function for anonymous login ~~~~~~~~~~~~~~~
function loginAsGuest () {
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error Anonymous " + errorCode + ": " + errorMessage )
  });
}

// ~~~~~ Call this function for logging out ~~~~~~~~~~~~~~~
function logout () {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error signout " + errorCode + ": " + errorMessage )
      });
}