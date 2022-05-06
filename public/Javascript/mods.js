const mods = [
	["teardown", "Quilez Laser", "quilezlaser.jpg", false, "https://steamcommunity.com/sharedfiles/filedetails/?id=2697004953", 
        "Hand held laser from the Quilez Security map. Written with <3 using UMF."],
];

function loadMods(element, imagePath, game) {
    for (var i = mods.length - 1; i >= 0; --i) {
        const currentProject = mods[i];
        if (currentProject[0] == game) {
            const rowElm = document.createElement("div");
            rowElm.classList.add("col-lg-4", "col-md-4", "col-sm-12");
            const imgTitleElm = document.createElement("h3");
            imgTitleElm.classList.add("feature-title");
            imgTitleElm.innerText = currentProject[1];
            const linkElm = document.createElement("a");
            if (currentProject[4]) {
                linkElm.href = currentProject[4];
                linkElm.target = "_blank";
            }
            const imgElm = document.createElement("img");
            imgElm.classList.add("img-fluid");
            if (currentProject[3] == true) imgElm.classList.add("round");
            imgElm.src = imagePath + currentProject[2];
            const descElm = document.createElement("p");
            descElm.innerText = currentProject[5];
            rowElm.appendChild(imgTitleElm);
            linkElm.appendChild(imgElm);
            rowElm.appendChild(linkElm);
            rowElm.appendChild(descElm);
            document.querySelector(element).appendChild(rowElm);
        } else continue;
    }
}