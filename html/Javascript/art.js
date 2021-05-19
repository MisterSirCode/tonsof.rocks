const artPieces = [
	["Futuretire", "futuretire.jpg"],
	["H O T", "hotball.jpg"],
	["Block o' Loneliness", "block.jpg"],
	["The Planet Below", "planetbelow.jpg"],
	["Pencilfox", "foxsketch.jpg"],
	["Skin Fractal", "skinfractal.jpg"],
	["Primordial", "primordial.jpg"],
	["Infinite Jellyfish", "infinitejelly.jpg"],
	["The Old Eye", "eyesketch.jpg"],
	["The Greatest Blade", "greatestblade.jpg"],
	["Sapphire Planet", "sapphireplanet.jpg"],
	["Magmatic Planetoid", "magmaticball.jpg"],
	["Never Cat", "nevercat.jpg"],
	["Emerald of the 4th Dimension", "fouremerald.jpg"],
	["The Last Palm", "lastpalm.jpg"]
];

function loadArtPieces(element, artPath) {
    for (var i = artPieces.length; i > 0; --i) {
        const currentArtPiece = artPieces[i];
        const rowElm = document.createElement("div");
        rowElm.classList.add("col-lg-4", "col-md-4", "col-sm-12");
        const imgTitleElm = document.createElement("h3");
        imgTitleElm.classList.add("feature-title");
        imgTitleElm.innerText = currentArtPiece[0];
		const imgElm = document.createElement("img");
		imgElm.classList.add("img-fluid");
		imgElm.src = artPath + currentArtPiece[1];
        rowElm.appendChild(imgTitleElm);
		rowElm.appendChild(imgElm);
        document.querySelector(element).appendChild(rowElm);
    }
}
