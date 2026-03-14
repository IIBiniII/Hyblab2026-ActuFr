const MovieList = (() => {
  let allMovies = [];
  let isExpanded = false;
  const API = "http://localhost:8080/actu/api" ;

  //pour tester sans les données de la route /film-ranking
  // async function loadFilm() {
  //   const filmsResponse = await fetch(API + "/film-week", {
  //       method: "GET",
  //       credentials: "include"
  //   });
  //   const film = await filmsResponse.json();
  //   allMovies = film;
  //   render();
  //   const films = [];
  //   film.forEach(element => {
  //     const titre = element.titre;
  //     const realisateur = element.realisateur;
  //     const critique = element.critique;
  //     const etoiles = element.nb_etoile;
  //     const bande_annonce = element.bande_annonce;
  //     const affiche = element.affiche;

  //     const film = {
  //         "titre" :titre,
  //         "affiche" :affiche,
  //         "realisateur" :realisateur,
  //         "nb_like":34,
  //         "rank": 4,// récupéere le rank dans le clasement
  //     }

  //     films.push(film);
  //   });
  //   return films;
  // }

  async function loadClassement(){
    const classementResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
    const classement = await classementResponse.json();
    allMovies = classement;
    render();
    const filmsAimeResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
    const filmsAime = await filmsAimeResponse.json();

    let list = [];
    let i= 0;
    classement.forEach(async element => {
        const rank = i;
        i +=1;
        const id_film = element.film;
        const filmResponse = await fetch(API + "/film/"+id_film , {
            method: "GET",
            credentials: "include"
        });
        const _film = await filmResponse.json();
        console.log(_film);
        const titre = _film.titre;
        const affiche = _film.affiche;
        const realisateur = _film.realisateur;
        const nb_like = element.nb_likes;

        const film = {
          "titre" :titre,
          "affiche" :affiche,
          "realisateur" :realisateur,
          "nb_like":nb_like,
          "rank": i, 
        }

        filmsAime.forEach(film => {
          if(element.titre == film.titre){
            film[aime] = true;
          }
          else{
            film[aime] = false;
          }
      })
      console.log(film);
      list.push(film);

    })
    render();
    return list;
  }

  //un item de la liste = un film
  function createItem(affiche, titre, realisateur, rank, nb_like, index, isNew = false) {
    const div = document.createElement('div');
    div.className = 'list-item' + (isNew ? ' fade-in' : '');
    div.style.animationDelay = isNew ? `${index * 60}ms` : '0ms';
    div.style.flexShrink = '0';
    div.innerHTML = `
    <img src="${affiche}" alt="${titre}" class="item-img">
    <div class="item-content">
      
      <div class="item-top">
        <div class="item-info">
          <span class="item-title">${titre}</span>
          <span class="item-director">${realisateur}</span>
        </div>
        <span class="item-rank">${rank}</span>
      </div>
      
      <div class="item-bottom">
        <div class="progress-wrapper">
          <div class="thumb-icon" style="left: calc(${nb_like}% - 8px);">
            <img src="img/podium/thumb.svg" alt="Thumb Icon" class="thumb-img">
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${nb_like}%;">

            </div>
          </div>
        </div>
        <span class="item-percent">${nb_like}%</span>
      </div>

    </div>
    `;
    return div;
  }

  //création de la liste liké
  async function render(animate = false) {

    const list = document.querySelector('.list');
    if (!list) return;

    //récupération des films liké par l'utilisateur
    let likedMovies = [];
    const filmsClassement = await loadClassement();
    filmsClassement.forEach(e =>{
      if (e.aime){
        likedMovies.push(e);
      }
    })

    const existingIds = new Set(
      [...list.querySelectorAll('.list-item')].map(el => el.dataset.id)
    );

    list.innerHTML = '';

    let i = likedMovies.length;

    if (i = 1 ){
      const film = likedMovies[0];
      const isNew = animate && !existingIds.has(String(movie.id));
      const item = createItem(film.affiche, film.titre, film.realisateur, film.rank, film.nb_like, i, isNew);
      item.dataset.id =5;
      list.appendChild(item);
    }
    else if (i > 1 ){
      likedMovies.forEach(element => {
        const isNew = animate && !existingIds.has(String(movie.id));
        const item = createItem(element.affiche, element.titre, element.realisateur, element.rank, element.nb_like, i, isNew);
        item.dataset.id =5;
        list.appendChild(item);
      });
    }
  }

  function toggle() {
    isExpanded = !isExpanded;

    const btn = document.querySelector('.toggle-btn');
    if (btn) btn.classList.toggle('expanded', isExpanded);

    render(true);
  }

  function initToggleButton() {
    const list = document.querySelector('.list');
    if (!list) return;

    list.style.maxHeight = '750px';
    list.style.overflowY = 'auto';
    list.style.boxSizing = 'border-box';

    if (list.parentElement.classList.contains('list-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'list-wrapper';
    list.parentNode.insertBefore(wrapper, list);
    wrapper.appendChild(list);

    const btn = document.createElement('button');
    btn.className = 'toggle-btn';
    btn.setAttribute('aria-label', 'Toggle all movies');
    btn.innerHTML = `
      <div class="arrow">
        <div class="arrow-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="19" viewBox="0 0 31 19" fill="none">
            <g filter="url(#filter0_dd_105_576)">
              <path d="M19.6147 7.69433C20.183 8.10769 20.9795 7.98227 21.393 7.41405C21.8063 6.84568 21.6809 6.04922 21.1127 5.63573L13.3637 -1.00136e-05L5.61466 5.63573C5.04644 6.04922 4.92103 6.84568 5.33439 7.41405C5.74788 7.98227 6.54434 8.10769 7.11271 7.69433L13.3637 3.14843L19.6147 7.69433Z" fill="#E5231A"/>
            </g>
            <defs>
              <filter id="filter0_dd_105_576" x="-8.86917e-05" y="0" width="30.5457" height="18.1197" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="3.81818" dy="5.09091"/>
                <feGaussianBlur stdDeviation="2.54545"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_576"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5.09091"/>
                <feGaussianBlur stdDeviation="2.54545"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_105_576" result="effect2_dropShadow_105_576"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_105_576" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="arrow-down">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="19" viewBox="0 0 31 19" fill="none">
            <g filter="url(#filter0_dd_105_575)">
              <path d="M19.6147 0.24357C20.183 -0.16979 20.9795 -0.0443755 21.393 0.523844C21.8063 1.09221 21.6809 1.88867 21.1127 2.30216L13.3637 7.93791L5.61466 2.30216C5.04644 1.88867 4.92103 1.09221 5.33439 0.523844C5.74788 -0.0443756 6.54434 -0.16979 7.11271 0.24357L13.3637 4.78947L19.6147 0.24357Z" fill="#E5231A"/>
            </g>
            <defs>
              <filter id="filter0_dd_105_575" x="-8.86917e-05" y="0" width="30.5457" height="18.1197" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="3.81818" dy="5.09091"/>
                <feGaussianBlur stdDeviation="2.54545"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_575"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5.09091"/>
                <feGaussianBlur stdDeviation="2.54545"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_105_575" result="effect2_dropShadow_105_575"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_105_575" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

    `;
    btn.addEventListener('click', toggle);
    wrapper.appendChild(btn);
  }

  function init(jsonPath) {
    initToggleButton();
    loadClassement();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  MovieList.init('data/movies.json');
});