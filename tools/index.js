const admin = require("firebase-admin");


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://htlgkr-testet-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

const stations = db.collection("/ScreeningStations");


const data = {
  name: "Veranstaltungszentrum Gunskirchen",
  postalCode: "4623",
  city: "Gunskirchen",
  address: "Raiffeisenplatz 1",


};


const station = stations.doc();
const timeDays = station.collection("timeDays");

const date = new Date();

for (let i = 0; i < 7; i++) {
  const day = timeDays.doc(date.toDateString());
  for (let j = 0; j < 96; j++) {
    const totalMin = 15 * j;
    const min = totalMin % 60;
    const hours = ~~ (totalMin / 60);
    const slot = day.collection("slots").doc(hours + ":"+min);
    slot.collection("users").doc().set({name: "bled"});
  }


  date.setDate(date.getDate()+1);
}

station.set(data);

