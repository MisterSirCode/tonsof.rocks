const projects = [
	["Android Arthur", "AndroidArthur.png", true, "https://discordapp.com/oauth2/authorize?&client_id=731617199877521508&scope=bot", "This is a high quality Discord Bot that I'm building, it's main focus is working as an interconnected API for my game. However, it also contains many high quality commands and moderation tools useful for any server"],
];

function loadProjects(element, imagePath) {
    for (var i = projects.length - 1; i >= 0; --i) {
        const currentProject = projects[i];
        const rowElm = document.createElement("div");
        rowElm.classList.add("col-lg-4", "col-md-4", "col-sm-12");
        const imgTitleElm = document.createElement("h3");
        imgTitleElm.classList.add("feature-title");
        imgTitleElm.innerText = currentProject[0];
        const linkElm = document.createElement("a");
        if (currentProject[3]) {
            linkElm.href = currentProject[3];
            linkElm.target = "_blank";
        }
		const imgElm = document.createElement("img");
		imgElm.classList.add("img-fluid");
        if (currentProject[2] == true) imgElm.classList.add("round");
		imgElm.src = imagePath + currentProject[1];
        const descElm = document.createElement("p");
        descElm.innerText = currentProject[4];
        rowElm.appendChild(imgTitleElm);
        linkElm.appendChild(imgElm);
		rowElm.appendChild(linkElm);
        rowElm.appendChild(descElm);
        document.querySelector(element).appendChild(rowElm);
    }
}
