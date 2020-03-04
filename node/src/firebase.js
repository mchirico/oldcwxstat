// const firebase = require("firebase");

require("firebase/firestore");

const admin = require("firebase-admin");
const serviceAccount = require("../credentials/cwxstat-23-firebase.json");

const getDB = function () {

    if (!admin.apps.length) {
        const app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cwxstat-23.firebaseio.com"
        });
        return app.firestore();
    }
};

const pgetUserInfo = (phone, callback) => {
    admin.auth().
        getUserByPhoneNumber(phone).
        then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
            callback(userRecord.uid);
        }).
        catch(function (error) {
            console.log('Error fetching user data:', error);
        });
};

const pdelUser = (uid, callback) => {
    admin.auth().
        deleteUser(uid).
        then(function () {
            callback('Successfully deleted user');
        }).
        catch(function (error) {
            console.log('Error deleting user:', error);
            callback('Error deleting user:', error);
        });
};


module.exports = {
    db: getDB(),
    adminref: admin,
    getUserInfo: pgetUserInfo,
    delUserfb: pdelUser
};
