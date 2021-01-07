const accountModal = document.querySelector(".rtAccount");
let acntOpen = false;
let currentUser;

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

accountModal.click();

document.querySelector(".passwordInput").addEventListener("input", (e) => {
    document.querySelector(".passwordInputText").value = e.target.value;
});

document.querySelector(".signUpButton").addEventListener("click", () => {
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        currentUser = cred.user;
        document.querySelector(".rtProfile.signUp.curProfile").classList.remove("curProfile");
        document.querySelector(".rtProfile.loggedIn").classList.add("curProfile");
        updateProfile();
    });
});

document.querySelector(".logInButton").addEventListener("click", () => {
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        currentUser = cred.user;
        document.querySelector(".rtProfile.signUp.curProfile").classList.remove("curProfile");
        document.querySelector(".rtProfile.loggedIn").classList.add("curProfile");
        updateProfile();
    });
});

document.querySelector(".logOutButton").addEventListener("click", () => {
    auth.signOut();
    currentUser = undefined;
    resetProfile();
});

function updateProfile() {
    document.querySelector(".rtProfileEmail").innerText = currentUser.email;
    if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = currentUser.photoURL;
}

function resetProfile() {
    document.querySelector(".rtProfileEmail").innerText = currentUser.email;
    if (currentUser.photoURL) document.querySelector(".rtAccountImage").src = 'https://mistersircode.com/defaultUser';
}
