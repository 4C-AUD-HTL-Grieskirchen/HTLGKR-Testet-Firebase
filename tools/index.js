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
  district: "District fu Gunskirchen",
  address: "Raiffeisenplatz 1",
  maxUserPerTimeslot: 10,
  openingHours: "8-12",



};


const station = stations.doc();
const timeDays = station.collection("timeDays");

const date = new Date();

const startHour = 8;
const endHour = 12;

for (let i = 0; i < 7; i++) {
  const day = timeDays.doc();
  day.set({date: date.toISOString()})
  for (let j =(startHour*60)/15; j < (endHour*60)/15; j++) {
    const totalMin = 15 * j;
    const min = totalMin % 60;
    const hours = ~~ (totalMin / 60);
    const slot = day.collection("slots").doc();
    slot.set({time: hours + ":"+min});
    slot.collection("users").doc().set({name: "bled"});
  }


  date.setDate(date.getDate()+1);
}

station.set(data);

