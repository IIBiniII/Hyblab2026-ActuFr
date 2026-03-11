"use strict"




const affiches = document.querySelector(".affiches");

const film_cards = [];
// generate affiche

[...Array(12).keys()].forEach(()=>{
  console.log("ici")
  const section = document.createElement("section");
  section.classList.add("film")

  const front_div = document.createElement("div")
  front_div.classList.add("affiche_front")

  const affiche = document.createElement("img")
  affiche.setAttribute("src","./img/background.svg")

  front_div.appendChild(affiche)

  const back_div = document.createElement("div")
  back_div.classList.add("affiche_back")
  
  const film_title = document.createElement("h2")
  film_title.innerText = "Nom Film"
  const film_text = document.createElement("p")
  film_text.innerText = "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès"
  
  back_div.appendChild(film_title)
  back_div.appendChild(film_text)

  section.appendChild(front_div)
  section.appendChild(back_div)

  film_cards.push(section)

  affiches.appendChild(section)
})


//anmation card
film_cards.forEach((card) =>{
  const front = card.querySelector(".affiche_front"); 
  const back = card.querySelector(".affiche_back");
  const tl = gsap.timeline({ paused: true })
    .to(front, { duration: 1, rotationY: 180 })
    .to(back, { duration: 1, rotationY: 0 }, 0)

  card.addEventListener("click", function() {
    tl.reversed() ? tl.play() : tl.reverse();
  });

})