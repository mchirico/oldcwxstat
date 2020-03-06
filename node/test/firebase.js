const { assert, expect } = require("chai");
const { db } = require("../src/firebase");

describe("Testing Firebase", () => {
    before(function (done) {
        this.timeout(4000);
        setTimeout(done, 4000);
        if (typeof db !== "undefined") {
            // tests setup
            db.collection("users").
                doc("y").
                set({
                    first: "What now okay done...",
                    last: "Lovelace",
                    born: 1815,
                    msg: "Hello world"
                }).
                then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    done();
                }).
                catch(function (error) {
                    console.error("Error adding document: ", error);
                    done();
                });
        } else {
            this.skip();
        }
    });


    it("Service Account", function (done) {

        this.timeout(4000);
        setTimeout(done, 4000);

        function cleanup() {
            db.collection("users").
                doc("y").
                delete().
                then(function () {
                    console.log("Document successfully deleted!");
                }).
                catch(function (error) {
                    console.error("Error removing document: ", error);
                });
        }

        db.collection("users").
            where("born", "==", 1815).
            get().
            then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.createTime, " => ", doc.data());
                    cleanup();
                    done();
                });
            }).
            catch(function (error) {
                console.log("Error getting documents: ", error);
                done();
            });
    });

});


