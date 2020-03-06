const { assert, expect } = require("chai");
const { db, adminref, getUserInfo, delUserfb } = require("../src/firebase");


const createDelete = (callback) => {
    adminref.auth().
        createUser({
            email: 'test@junk.com',
            emailVerified: false,
            phoneNumber: '+11234567890',
            password: 'secretPassword',
            displayName: 'John Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        }).
        then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            getUserInfo(userRecord.phoneNumber, data => {
                delUserfb(data, dataDel => {
                    console.log("delete status:", dataDel);
                    callback();
                });

            });


        }).
        finally(function () {

        }).
        catch(function (error) {
            console.log('Error creating new user:', error);
            expect.fail();
            callback();

        });


};


describe("Testing Firebase User", () => {


    it.skip("Create User", function (done) {
        this.timeout = 1000;
        setTimeout(done, 1000);
        createDelete(data => {


            console.log('done...')

            adminref.app.delete()
            .then(function() {
                console.log("App deleted successfully");
                done();
            })
            .catch(function(error) {
                console.log("Error deleting app:", error);
                done();
            });

        })

    });


});


// it.only

// it.skip("List User", function (done) {
//
//     function listAllUsers(nextPageToken) {
//         // List batch of users, 1000 at a time.
//         adminref.auth().
//             listUsers(1000, nextPageToken).
//             then(function (listUsersResult) {
//                 listUsersResult.users.forEach(function (userRecord) {
//                     console.log('user', userRecord.toJSON());
//                 });
//                 if (listUsersResult.pageToken) {
//                     // List next batch of users.
//                     listAllUsers(listUsersResult.pageToken);
//                 }
//             }).
//             catch(function (error) {
//                 console.log('Error listing users:', error);
//             });
//     }
//
// // Start listing users from the beginning, 1000 at a time.
//     listAllUsers();
//
// });
