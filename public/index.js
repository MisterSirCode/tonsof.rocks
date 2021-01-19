const accountModal = document.querySelector(".rtAccount");
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
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        db.collection("users").add({
            userId: cred.user.uid,
            userRole: "basic"
        });
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(email, password).then((cred) => {
                currentUser = cred.user;
            });
        });
    });
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
    updateProfile();
});

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").get().then((snapshot) => {
            currentUserDB = snapshot.docs;
        });
    }
    if (user) {
        currentUser = user;
        updateProfile();
    } else resetProfile();
});

function updateProfile() {
    document.querySelector(".rtProfile.signUp.curProfile").classList.remove("curProfile");
    document.querySelector(".rtProfile.loggedIn").classList.add("curProfile");
    document.querySelector(".rtProfileEmail").innerText = currentUser.email;
    if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = currentUser.photoURL;
    if (currentUserDB) {
        console.log(currentUserDB[currentUser.uid]);
    }
}

function resetProfile() {
    document.querySelector(".rtProfile.signUp").classList.add("curProfile");
    document.querySelector(".rtProfile.loggedIn.curProfile").classList.remove("curProfile");
    document.querySelector(".rtProfileEmail").innerText = currentUser.email;
    if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = 'https://mistersircode.com/defaultUser';
}