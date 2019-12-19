window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (category) {
        getCategoryData(category)
    } else {
        getData();
    }
    getNavigation();
    getDropDown()
}

/*-------CODE FOR FECTCHING LINKS FOR DROPDOWN-----------*/
function getDropDown() {
    fetch("https://lasmaoficiere.com/wordpress/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addDrop)
        })
}

function addDrop(oneDrop) {
    //console.log(oneDrop);
    //document.querySelector("div .dropdown-nav").innerHTML += oneDrop.name;
    if (oneDrop.parent === 0 && oneDrop.count > 2) {
        const dropLink = document.createElement("a");
        dropLink.textContent = oneDrop.name;
        dropLink.setAttribute("href", "category.html?category=" + oneDrop.id)
        document.querySelector("div .dropdown-nav").appendChild(dropLink)
    }
}

/*--------CODE FOR MENU PAGE NAVIGATION---------*/ 
function getNavigation() {
    fetch("https://lasmaoficiere.com/wordpress/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    // console.log(oneItem)
    const link = document.createElement("a");
    link.textContent = oneItem.name;

    if (oneItem.parent === 0 && oneItem.id === 2) {
        link.setAttribute("href", "category.html?category=2")
        document.querySelector("h2").appendChild(link);


    } else if (oneItem.parent === 0 && oneItem.id === 5) {
        link.setAttribute("href", "category.html?category=5")
        document.querySelector("h3").appendChild(link);

    } else if (oneItem.parent === 0 && oneItem.id === 6) {
        link.setAttribute("href", "category.html?category=6")
        document.querySelector("h4").appendChild(link);

    } else if (oneItem.parent === 0 && oneItem.id === 4) {
        link.setAttribute("href", "category.html?category=4")
        document.querySelector("h5").appendChild(link);
    }

}


function getCategoryData(catId) {
    //console.log(catId)
    fetch("https://lasmaoficiere.com/wordpress/wp-json/wp/v2/artwork?_embed&per_page=50&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}


function getData() {
    fetch("https://lasmaoficiere.com/wordpress/wp-json/wp/v2/artwork?_embed&per_page=50")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //console.log(myData);
    myData.forEach(showArt)
}

function showArt(art) {
    console.log(art);

    const template = document.querySelector(".artworkTemplate").content;
    const artCopy = template.cloneNode(true);


    const imgPath = art._embedded['wp:featuredmedia']['0'].media_details.sizes.full.source_url;
    const img = artCopy.querySelector("img.artImage");
    img.setAttribute("src", imgPath)

/*----------CODE FOR MODAL-----------*/
    const modal = document.querySelector(".modal-bg");
    img.addEventListener("click", showModal);

    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", hideModal)
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function showModal() {
        modal.style.display = "block";
        modal.querySelector(".modal-title span").textContent = art.title.rendered;
        modal.querySelector(".modal-year span").textContent = art.year;
        modal.querySelector(".modal-size").textContent = art.size;


        const modalImg = modal.querySelector(".modal-image");
        modalImg.setAttribute("src", imgPath)
    }

    function hideModal() {
        modal.style.display = "none";
        modal.addEventListener("click", () => {
            modal.classList.add("hide");
        });
    }
    document.querySelector("#artworks").appendChild(artCopy)
}
