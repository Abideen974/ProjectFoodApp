var firebaseConfig = {
    apiKey: "AIzaSyCf_rzr_blTtC4LSYEAjTmbnCiHTMEoi80",
    authDomain: "hackathon-done.firebaseapp.com",
    projectId: "hackathon-done",
    storageBucket: "hackathon-done.appspot.com",
    messagingSenderId: "450265781537",
    appId: "1:450265781537:web:e79d6cb78a319a83719a60",
    measurementId: "G-SEBGWZH0SP"
  };
  firebase.initializeApp(firebaseConfig);

  var uid;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
    start(user)
    }
    else {
        location.href = "../../../../index.html"
    }
})

function start(user){
    console.log(user.uid)

    var docRef = firebase.firestore().collection("pending").where("resUid", "==", user.uid).where("status", "==", "accepted")
    docRef.get()
    .then(function(snapshot){
        snapshot.forEach(function(data, index){
            var obj = data.data()
                document.getElementById("div").innerHTML += `
                <div class="col col py-3 px-lg-5" style="border: solid 1px black; border-radius: 10px;" >

                <span class="titel" style="display: block; font-weight: bolder;">${obj.titel}</span>
                <span class="titel" style="display: block; ">Cetegery : ${obj.cetegory}</span>
                <span class="titel" style="display: block; ">Deleviery : ${obj.delivery}</span>
              <button class="btn btn-sm btn-success " style="float: right;" id="${data.id}" onclick="del(this)"> Delivered</button>
            </div>
           `
            })
    })
}

function del (i){
    var db = firebase.firestore();

db.collection("pending").doc(i.id).update({status: "delivered"});
swal({
    titel: "good Job",
    text: "please refresh",
    icon: "success",
    button: "next",
})
}
function logout() {
    firebase.auth().signOut().then(() => {
        location.href = "../../../index.html";
    }).catch((error) => {
    });
    return false
}