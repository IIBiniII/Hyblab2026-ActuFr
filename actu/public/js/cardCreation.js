function averageColor(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img,0,0);

  const data = ctx.getImageData(0,0,img.width,img.height).data;

  let r=0,g=0,b=0,count=0;

  for(let i=0;i<data.length;i+=40){
    r+=data[i];
    g+=data[i+1];
    b+=data[i+2];
    count++;
  }

  return `rgb(${r/count},${g/count},${b/count})`;
}

function createFrontCard(titre, affiche, genre, realisateur){

  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = affiche;

  const front = document.createElement("div");
  front.classList.add("affiche_front");

  image.onload = () => {
    const color = averageColor(image);
    front.style.backgroundColor = color;
  };


  const img = document.createElement("img");
  img.src = affiche;//"img/exemple/affiche_cine.png";

  const info = document.createElement("div");

  const title = document.createElement("h3");
  title.innerText = titre;

  const genre_span = document.createElement("span");
  genre_span.innerText = genre;

  const real_span = document.createElement("span");
  real_span.innerText = realisateur;

  const icon = document.createElement("img");
  icon.src = "./img/coin.png";
  icon.classList.add("icon-bottom");


  info.appendChild(title);
  info.appendChild(genre_span);
  info.appendChild(real_span);

  front.appendChild(img);
  front.appendChild(info);
  front.appendChild(icon);
  

  return front;
}


function createBackCard(titre, affiche, critique,nb_etoile,lien_bande_annonce, lien_article){

  const back = document.createElement("div");
  back.classList.add("affiche_back");

  const img = document.createElement("img");
  img.src = affiche;//"img/exemple/affiche_cine.png";

  const info = document.createElement("div");

  const title = document.createElement("h3");
  title.innerText = titre;

  const desc = document.createElement("p");
  desc.innerText = critique;

  const stars = document.createElement("div");

  for(let i = 0; i < nb_etoile; i++){
    const star = document.createElement("img");
    star.src = "img/exemple/etoile.png";
    stars.appendChild(star);
  }
  for(let i = 0; i < 4-nb_etoile; i++){
    const starGrey = document.createElement("img");
    starGrey.src = "img/exemple/etoile_gris.png";
    stars.appendChild(starGrey);
  }

  

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

function createCard(titre,affiche, genre, realisateur, critique,nb_etoile,lien_bande_annonce,lien_article){

  const section = document.createElement("section");
  section.classList.add("film");

  const front = createFrontCard(titre,affiche==null?"img/affiche-cine.png":affiche, genre==null?"Film":genre, realisateur);
  const back = createBackCard(titre, affiche==null?"img/affiche-cine.png":affiche, critique,nb_etoile,lien_bande_annonce, lien_article);

  section.appendChild(front);
  section.appendChild(back);

  return section;

  
}