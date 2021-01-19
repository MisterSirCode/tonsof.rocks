const accountModal = document.querySelector(".rtAccount");
const restAPIKey = "ODAwODQ1NzYyOTA0MDY0MDQx.YAYDvA.U9x8aOi8youXXWGj4rvmQSaG6sg";
let acntOpen = false;
let currentUser;
let currentUserDB;

accountModal.addEventListener("click", () => {
    acntOpen = !acntOpen;
    if (acntOpen) {
        document.querySelector(".rtAccountModal").style.top = "100px";
        document.querySelector(".rtAccountModal").style.right = "25px";
    } else {
        document.querySelector(".rtAccountModal").style.top = "-100vh";
        document.querySelector(".rtAccountModal").style.right = "-100vw";
    }
});

document.querySelector(".passwordInput").addEventListener("input", (e) => {
    document.querySelector(".passwordInputText").value = e.target.value;
});

document.querySelector(".signUpButton").addEventListener("click", () => {
    const username = document.querySelector(".usernameInput").value;
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    try {
        if (!username || username.length >= 21 || username.length <= 1) {
            alert("Invalid Username\nMust be between 2 and 20 characters");
            return;
        } else {
            db.collection("users").get().then(querySnapshot => {
                querySnapshot.docs.forEach((userObj) => {
                    const userData = userObj.data();
                    if (username == userData.userName) {
                        alert("Username already exists")
                        return Promise.reject("end");
                    }
                });
            }).then(() => {
                console.log("test");
                auth.createUserWithEmailAndPassword(email, password).then((cred) => {
                    db.collection("users").doc(cred.user.uid).set({
                        userId: cred.user.uid,
                        userRole: "basic",
                        userName: username
                    })
                    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                        auth.signInWithEmailAndPassword(email, password).then((cred) => {
                            currentUser = cred.user;
                        });
                    });
                });
            })
        }
    } catch (e) {
        console.log(e);
    }
});

document.querySelector(".logInButton").addEventListener("click", () => {
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            currentUser = cred.user;
        });
    });
});

document.querySelector(".logOutButton").addEventListener("click", () => {
    auth.signOut().then(() => {
        currentUser = undefined;
    });
});

document.querySelector(".updateProfileImgButton").addEventListener("click", () => {
    auth.currentUser.updateProfile({
        photoURL: document.querySelector(".profilePictureLink").value
    });
    window.location.href = window.location.href;
});

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            currentUserDB = doc.data();
        });
    }
    if (user) {
        currentUser = user;
        updateProfile();
    } else resetProfile();
});

function updateProfile() {
    document.querySelector(".rtProfile.signUp").classList.remove("curProfile");
    document.querySelector(".rtProfile.loggedIn").classList.add("curProfile");
    document.querySelector(".rtProfileUsername").innerText = currentUserDB.userName;
    document.querySelector(".rtProfileEmail").innerText = currentUser.email;
    if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = currentUser.photoURL;
    else {
        if (currentUser.userIdDiscord) {
            var picReq = new XMLHttpRequest();
            picReq.addEventListener("load", (responseText) => {
                const user = JSON.parse(responseText);
                document.querySelector(".rtAccountImage").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
            });
            picReq.open("GET", "https://discordapp.com/api/users/" + currentUserDB.userIdDiscord);
            picReq.setRequestHeader("Authorization", restAPIKey);
            picReq.send();
        }
    }
}

function resetProfile() {
    if (currentUser) {
        document.querySelector(".rtProfile.signUp").classList.add("curProfile");
        document.querySelector(".rtProfile.loggedIn").classList.remove("curProfile");
        document.querySelector(".rtProfileEmail").innerText = currentUser.email;
        if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = 'https://mistersircode.com/defaultUser';
    }
}