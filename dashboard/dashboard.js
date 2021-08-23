var firebaseConfig = {
  apiKey: "AIzaSyCf_rzr_blTtC4LSYEAjTmbnCiHTMEoi80",
  authDomain: "hackathon-done.firebaseapp.com",
  projectId: "hackathon-done",
  storageBucket: "hackathon-done.appspot.com",
  messagingSenderId: "450265781537",
  appId: "1:450265781537:web:e79d6cb78a319a83719a60",
  measurementId: "G-SEBGWZH0SP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var uid;
var status;
var user;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    user = user;
     uid = user.uid;
     var db = firebase.firestore();
  db.collection("users").doc(user.uid).get().then((snap) => {
        
    status = snap.data().status;
     Start()
      
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    } else {
    location.href = "../index.html"
    }
  });

function Start(){
    if( status == "resturent"){
        location.href = "./ResturentDashboard/ResturentDash.html"
    }
    else if( status == "user"){
      location.href = "./UserDashboard/userdash.html"
    }
    else{
        console.log("kam chal rha ha?")
    }
}

  
