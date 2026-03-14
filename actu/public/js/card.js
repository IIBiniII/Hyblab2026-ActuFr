const affiches = document.querySelector(".affiches");
let film_cards=[];
let i =0;
loadFilm().then((filmsNodes) => {
  filmsNodes.forEach((card) => {
    i+=1;
    if(i>=6) return;
    film_cards.push(card);
    affiches.appendChild(card);

    const front = card.querySelector(".affiche_front");
  const back = card.querySelector(".affiche_back");
  const tl = gsap.timeline({ paused: true })
    .to(front, { duration: 1, rotationY: 180 })
    .to(back, { duration: 1, rotationY: 0 }, 0)

  card.addEventListener("click", function () {
    if (tl.progress() === 0) {
      tl.play();
    } else {
      tl.reverse();
    }
  });
  });
});
// function createCard(nom, critique, image_affiche, nb_etoile, realisateur, lien_bande_annonce, lien_article){

//   const section = document.createElement("section");
//   section.classList.add("film");

//   const front_div = document.createElement("div");
//   front_div.classList.add("affiche_front");

//   const affiche = document.createElement("img");
//   affiche.setAttribute("src", image_affiche);

//   const titre = document.createElement("h3");
//   titre.innerHTML = nom;
//   const real = document.createElement("span");
//   real.innerHTML = realisateur;

//   front_div.appendChild(affiche);
//   front_div.appendChild(titre);
//   front_div.appendChild(real);


//   const back_div = document.createElement("div");
//   back_div.classList.add("affiche_back");

//   const film_title = document.createElement("h2");
//   film_title.innerText = nom;
//   const film_text = document.createElement("p");
//   film_text.innerText = critique;

//   const etoiles = document.createElement("div");
//   for(let i = 0; i < 4; i++){
//     const etoile = document.createElement("img");
//     if (i< nb_etoile){
//       etoile.setAttribute("src", "img/exemple/etoile.png");
//     }
//     else{
//       etoile.setAttribute("src", "img/exemple/etoile_gris.png");
//     }
//     etoiles.appendChild(etoile);
//   }

//   const liens = document.createElement("div");
//   const bande_annonce = document.createElement("img");
//   bande_annonce.setAttribute("src", lien_bande_annonce);
//   const article = document.createElement("img");
//   article.setAttribute("src", lien_article);

//   liens.appendChild(bande_annonce);
//   liens.appendChild(article);


//   back_div.appendChild(film_title);
//   back_div.appendChild(film_text);
//   back_div.appendChild(etoiles);
//   back_div.appendChild(liens);

//   section.appendChild(front_div);
//   section.appendChild(back_div);


//   const tl = gsap.timeline({ paused: true })
//     .to(front_div, { duration: 1, rotationY: 180 })
//     .to(back_div, { duration: 1, rotationY: 0 }, 0)

//   section.addEventListener("click", function () {
//     if (tl.progress() === 0) {
//       tl.play();
//     } else {
//       tl.reverse();
//     }
//   });

//   return section;
// }

// const affiches = document.querySelector(".affiches");

// for(let i=0;i<5;i++){
//   const div = document.createElement('div');
//   div.appendChild(createFrontCard("HEY"));
//   div.appendChild(createEndCard("HEY","Oui."));
  
//   div.classList.add("container");
//   affiches.appendChild(div);

// }

document.getElementById("btnExport").addEventListener("click", () => {
  const element = document.getElementById("affiches");

  html2canvas(element).then(canvas => {
    // Convertit le canvas en image
    const imgData = canvas.toDataURL("image/png");

    // Crée un lien pour télécharger
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "capture.png";
    link.click();
  });
});
