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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
      render(uid)
    }   
    else {
        location.href = "../../index.html"
    }
})

function render(uid){
    firebase.firestore().collection("dishes").get()
        .then(function(snapshot){
            snapshot.forEach(function(data){
                var obj = data.data()
                var src = obj.filename;
                
                var storage = firebase.storage();

                var storageRef = storage.ref();
                storageRef.child('dish/'+src).getDownloadURL()
                .then((url) => {
                    
                    document.getElementById("div").innerHTML += `
                    <div class="card" style="width: 18rem; ">
                        <img src="${url}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${obj.name}</h5>
                        <p class="card-text text-success" style="font-weight: 500; margin: -1%;">Price: ${obj.price}</p>
                        <p class="card-text" style=" margin: -1%;" >Cetegory: ${obj.cetegory}</p>
                        <p class="card-text" style=" margin: -1%;" >Delivery Type : ${obj.delivery}</p>
                        <button  class="btn btn-success" style="float: right;" id="${data.id}" onclick="order(this)">Order</button>
                        </div>
                    </div>
   
               `
   
                 })


                })


        })
 }
 var newobj;
 function order(t){

    var docRef = firebase.firestore().collection("dishes").doc(t.id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data()
            newobj = {
                status: "panding",
                titel: data.name,
                price: data.price,
                cetegory: data.cetegory,
                delivery: data.delivery,
                userUid: uid,
                resUid: data.resuid,
                
                

            }
            console.log(newobj)
            var db = firebase.firestore().collection("pending");
            db.add(newobj)
            .then(
                () =>{
                    swal({
                        titel: "good Job",
                        icon: "success",
                        button: "next",
                    })
                }
            )
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
                
        } else {
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
function logout() {
    firebase.auth().signOut().then(() => {
        location.href = "../../index.html";
    }).catch((error) => {
    });
    return false
}