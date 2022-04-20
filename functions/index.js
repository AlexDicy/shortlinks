// use the europe-west1 region by default
const functions = require("firebase-functions").region("europe-west1");
const admin = require("firebase-admin");
admin.initializeApp();

const firestore = admin.firestore();

const collections = {
  redirects: firestore.collection("redirects")
};

exports.redirectById = functions.https.onRequest(async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string") {
    res.status(400).send("Redirect requires an id");
    return;
  }

  const redirect = await collections.redirects.doc(id).get();
  if (redirect.exists) {
    res.redirect(redirect.data().url);
    return;
  }
  res.status(404).send("Redirect not found");
});

exports.passwordCheck = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.password;
  // Push the new message into Firestore using the Firebase Admin SDK.
  //const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  // , our password: ${process.env.PASSWORD}
  res.json({result: `Sent password : ${original}`});
});
