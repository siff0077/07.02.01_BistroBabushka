document.addEventListener("DomContentLoaded", start)


function start() {

    console.log("DON Content Loaded");

}


let temp = document.querySelector("template");

let container = document.querySelector("section");

let json;

let filter = "alle";


const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";



async function hentData() {

    const respons = await fetch(link);

    json = await respons.json();

    addEventListenersToButtons();

    vis(json);

}



function vis(menu) {

    console.log(menu);

    container.innerHTML = "";

    menu.feed.entry.forEach(ret => {

        if (filter == "alle" || filter == ret.gsx$kategori.$t) {


            const klon = temp.cloneNode(true).content;

            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;

            klon.querySelector(".kort").textContent = ret.gsx$kort.$t;

            klon.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t + ",-";

            klon.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";

            container.appendChild(klon);

        }

    })

}



function addEventListenersToButtons() {

    document.querySelectorAll(".filter").forEach((btn) => {

        btn.addEventListener("click", filterBTNs);

    });

}



function filterBTNs() {

    filter = this.dataset.kategori;

    document.querySelector(".kategorinavn").textContent = this.textContent;

    document.querySelectorAll(".filter").forEach((btn) => {

        btn.classList.remove("valgt")

    })

    this.classList.add("valgt")

    vis(json);

}



hentData();
