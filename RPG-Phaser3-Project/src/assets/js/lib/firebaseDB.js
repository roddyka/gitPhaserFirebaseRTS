import Firebase from "firebase/app";
import FirebaseAuth from "firebase/auth";
import FirebaseConfig from "./firebaseConfig";
import database from "firebase/database";
import firebaseConfig from "./firebaseConfig";
Firebase.initializeApp(FirebaseConfig);

async function singIn(email, password) {
  return Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (result) {
      return result.user.uid;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return false;
    });
}

async function singUp(email, password) {
  console.log(email);
  return Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (result) {
      return result.user.uid;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      return false;
    });
}

function singInUser() {
  //   return Firebase.auth().onAuthStateChanged(function (user) {
  //     // quando autenticar
  //     if (user) {
  //       return true;
  //       // se for autenticado
  //       // User is signed in.
  //       // displayName = user.displayName;
  //       // var email = user.email;
  //       // var emailVerified = user.emailVerified;
  //       // var photoURL = user.photoURL;
  //       // var isAnonymous = user.isAnonymous;
  //       //var uid = user.uid;
  //       // var providerData = user.providerData;
  //       // ...
  //     } else {
  //       //logout
  //       // User is signed out.
  //       alert("insira seu email e senha");
  //       // ...
  //     }
  //   });
}

async function userInfo(id) {
  //retorna o ID do user que se logou
  var userId = id;
  return Firebase.database()
    .ref("users/" + userId)
    .once("value")
    .then(function (snapshot) {
      var name = snapshot.val() && snapshot.val().player.name;
      var level = snapshot.val() && snapshot.val().player.level;
      var money = snapshot.val() && snapshot.val().player.money;
      console.log(money);
      return snapshot.val();
    });
}

async function update(
  id,
  email,
  name,
  money,
  level,
  character,
  sex,
  skin,
  life
) {
  var userId = id;
  var info = {
    email: email,
    name: name,
    player: {
      level: level,
      money: money,
      name: character,
      sex: sex,
      skin: skin,
      life: life,
    },
  };

  return Firebase.database()
    .ref("users/" + userId)
    .update(info)
    .then(function (snapshot) {
      console.log(snapshot);
      return snapshot;
    });
}

async function create(id, email, name, money, level, character, sex, skin) {
  var userId = id;
  console.log(id);
  var info = {
    email: email,
    name: name,
    player: {
      level: level,
      money: money,
      name: character,
      sex: sex,
      skin: skin,
      life: 3,
    },
  };

  return Firebase.database()
    .ref("users/" + userId)
    .set(info)
    .then(function () {
      return true;
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

export { singIn, singUp, singInUser, userInfo, update, create };
