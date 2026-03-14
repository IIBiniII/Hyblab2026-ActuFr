function createFrontCard(titre, genre, realisateur,index){

  const front = document.createElement("div");
  front.classList.add("affiche_front");

  const img = document.createElement("img");
  img.src = "img/exemple/affiche_cine.png";

  const info = document.createElement("div");

  const title = document.createElement("h3");
  title.innerText = titre+index;

  const genre_span = document.createElement("span");
  genre_span.innerText = genre;

  const real_span = document.createElement("span");
  real_span.innerText = realisateur;

  info.appendChild(title);
  info.appendChild(genre_span);
  info.appendChild(real_span);

  front.appendChild(img);
  front.appendChild(info);

  return front;
}


function createBackCard(titre, description){

  const back = document.createElement("div");
  back.classList.add("affiche_back");

  const img = document.createElement("img");
  img.src = "img/exemple/affiche_cine.png";

  const info = document.createElement("div");

  const title = document.createElement("h3");
  title.innerText = titre;

  const desc = document.createElement("p");
  desc.innerText = description;

  const stars = document.createElement("div");

  for(let i = 0; i < 3; i++){
    const star = document.createElement("img");
    star.src = "img/exemple/etoile.png";
    stars.appendChild(star);
  }

  const starGrey = document.createElement("img");
  starGrey.src = "img/exemple/etoile_gris.png";
  stars.appendChild(starGrey);

  info.appendChild(title);
  info.appendChild(desc);
  info.appendChild(stars);

  const buttons = document.createElement("div");

  const play = document.createElement("img");
  play.src = "img/exemple/playbutton.png";

  const review = document.createElement("img");
  review.src = "img/exemple/reviewbutton.png";

  buttons.appendChild(play);
  buttons.appendChild(review);

  back.appendChild(img);
  back.appendChild(info);
  back.appendChild(buttons);

  return back;
}

function createCard(titre, genre, realisateur, description,index){

  const section = document.createElement("section");
  section.classList.add("film");

  const init_scale = 0.3
  const init_width = 335*init_scale
  const init_height = 613*init_scale
  const init_style = 
    `transform: scale(${init_scale});
    width: ${init_width}px;
    height:  ${init_height}px;`

    
  section.setAttribute("style",init_style)

  const front = createFrontCard(titre, genre, realisateur,index);
  const back = createBackCard(titre, description);

  section.appendChild(front);
  section.appendChild(back);

  return section;
}


