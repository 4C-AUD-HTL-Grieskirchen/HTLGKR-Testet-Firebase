import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();


export const scheduler = functions.pubsub.schedule("0 0 * * MON").onRun((context) => {
  return true;
});

export const test = functions.https.onCall((data, context) => {
  return true;
});

functions.


