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
    // User is signed in; Enable dashboard page
    var navigation = document.getElementById('navigation')
    navigation.innerHTML = `
        <div id="navigation">
          <nav class="navbar navbar-expand-md navbar-dark bg-dark flex-container-nav">
              <div class="flex-item">
                  <a class="navbar-brand"><img src="firebase_28dp.png"></a>
                  <span class="navbar-text">FirebaseLogin</span>
              </div>
              <div class="flex-item">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                        <a href="home.html" class="nav-link">Home</a>
                      </li>
                      <li class="nav-item">
                        <a href="login.html" class="nav-link">Login</a>
                      </li>
                      <li class="nav-item">
                        <a href="dashboard.html" class="nav-link">Dashboard</a>
                      </li>
                  </ul>
              </div>
          </nav>
        </div>
    `
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
    // No user is signed in; Disable dashboard page
    var navigation = document.getElementById('navigation')
    navigation.innerHTML = `
        <div id="navigation">
          <nav class="navbar navbar-expand-md navbar-dark bg-dark flex-container-nav">
              <div class="flex-item">
                  <a class="navbar-brand"><img src="firebase_28dp.png"></a>
                  <span class="navbar-text">FirebaseLogin</span>
              </div>
              <div class="flex-item">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                        <a href="home.html" class="nav-link">Home</a>
                      </li>
                      <li class="nav-item">
                        <a href="login.html" class="nav-link">Login</a>
                      </li>
                      <li class="nav-item">
                        <a href="signup.html" class="nav-link">SignUp</a>
                      </li>
                      <li class="nav-item">
                        <a href="login.html" class="nav-link">Dashboard</a>
                      </li>
                  </ul>
              </div>
          </nav>
        </div>
    `
    for (var i = 0; i < logOutFeatures.length; i++) {
      logOutFeatures[i].style.display = 'block';
    }
    for (var i = 0; i < logInFeatures.length; i++) {
      logInFeatures[i].style.display = 'none';
    }

  }
})


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

//~~~~~ Call this function for signing up ~~~~~~~~`
function signup () {
  //get elements
  var userEmail = document.getElementById("txtemail").value
  var userPassword1 = document.getElementById("txtpassword1").value
  var userPassword2 = document.getElementById("txtpassword2").value
  //Validation: email valid, password matches
  if (!userPassword1 === userPassword2) {
    window.alert("Password does not match")
    return
  }
  //Sign up function 
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword1).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error email & password " + errorCode + ": " + errorMessage )
  });  
}