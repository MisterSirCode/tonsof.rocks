const $ = document.querySelector.bind(document);
const accountModal = $(".rtAccount");
let acntOpen = false;
let currentUser;
let currentUserDB;

accountModal.addEventListener("click", () => {
    acntOpen = !acntOpen;
    if (acntOpen) {
        $(".rtAccountModal").style.top = "100px";
        $(".rtAccountModal").style.right = "25px";
    } else {
        $(".rtAccountModal").style.top = "-100vh";
        $(".rtAccountModal").style.right = "-100vw";
    }
});

$(".showSignUpForm").addEventListener("click", (e) => {
    document.querySelectorAll("form").forEach((el) => {
        el.style.display = "none";
    });
    $(".signUpForm").style.display = "unset";
});

$(".showLogInForm").addEventListener("click", (e) => {
    document.querySelectorAll("form").forEach((el) => {
        el.style.display = "none";
    });
    $(".logInForm").style.display = "unset";
});

$(".signUpWithForm").addEventListener("click", () => {
    const username = $("#newUsernameInput").value;
    const email = $("#newEmailInput").value;
    const password = $("#newPasswordInput").value;
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        db.collection("users").doc(cred.user.uid).set({
            userId: cred.user.uid,
            userRole: "basic",
            userName: username
        });
        db.collection("usernames").doc("claimed").update({
            names: firebase.firestore.FieldValue.arrayUnion(username)
        });
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(email, password).then((cred) => {
                currentUser = cred.user;
            });
        });
    });
});

$(".logInWithForm").addEventListener("click", () => {
    const email = $("#emailInput").value;
    const password = $("#passwordInput").value;
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            currentUser = cred.user;
        });
    });
});

$(".logOutOfProfile").addEventListener("click", () => {
    auth.signOut().then(() => {
        currentUser = undefined;
    });
});

$(".updateProfilePicture").addEventListener("click", () => {
    auth.currentUser.updateProfile({
        photoURL: $("#newPictureInput").value
    });
    updateProfile();
});

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            currentUserDB = doc.data();
            currentUser = user;
            updateProfile();
        });
    } else resetProfile();
});

function updateProfile() {
    try {
        if (currentUser.photoURL) $(".rtAccountImage").src = currentUser.photoURL;
        $(".profileEmail").innerText = currentUser.email;
        if (currentUserDB) $(".profileUserName").innerText = currentUserDB.userName;
        document.querySelectorAll("form").forEach((el) => {
            el.style.display = "none";
        });
        $(".profileForm").style.display = "unset";
    } catch (e) {}
}

function resetProfile() {
    try {
        $(".rtAccountImage").src = 'https://mistersircode.com/defaultUser';
        $(".profileEmail").innerText = "You shouldnt be here. Refresh the page";
        $(".profileUserName").innerText = "Not Signed In";
        document.querySelectorAll("form").forEach((el) => {
            el.style.display = "none";
        });
        $(".logInForm").style.display = "unset";
    } catch (e) {}
}