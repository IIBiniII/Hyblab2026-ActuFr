'use strict'

async function loadFilm(){
    const filmsResponse = await fetch(API + "/film-week-unknown", { 
        method: "GET",
        credentials: "include"
    });

    const films = await filmsResponse.json();
    let filmsNodes = films.map(film => {
        const titre_film = film.nom;
        const realisateur = film.realisateur;
        const critique = film.critique;
        const etoiles = film.nb_etoile;
        const bande_annonce = film.bande_annonce;
        const affiche = film.affiche;

        let carte = createCard(titre_film,affiche, "genre", realisateur, critique,etoiles,bande_annonce,"#");
        return carte;
    });

    return filmsNodes;
}

async function loadClassement(){
    const classementResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
    let classement = await classementResponse.json();
    const nb_films = classement.length || 0;
    classement = classement.sort((a,b)=>{
        const aRatio = a?.nb_likes/a?.nb_dislikes;
        const bRatio = b?.nb_likes/b?.nb_dislikes;
        return aRatio<bRatio;
    }).map((obj, index) => ({
        ...obj,
        classement: index
    }));

    const filmLikedResponse = await fetch(API + "/film-like", {
        method: "GET",
        credentials: "include"
    });
    let filmLiked = await filmLikedResponse.json();
    filmLiked = filmLiked.filter((f) => {
            return classement.some((e) => f?.nom === e?.nom);
        });
    return {filmLiked,classement};
}


async function loadCoupDeCoeur(){
    const filmCoeurResponse = await fetch(API + "/film-bestofweek", {
        method: "GET",
        credentials: "include"
    });
    const filmCoeur = await filmCoeurResponse.json();
    const id_film = film.id_film;
    const filmResponse = await fetch(API + "//film-id/"+id_film, {
        method: "GET",
        credentials: "include"
    });
    const film = await filmResponse.json();
    const affiche = film.affiche;
}

async function loadFilmsAime(){
    //juste des id des films
    const filmsResponse = await fetch(API + "/film-like", {
        method: "GET",
        credentials: "include"
    });
    const films = await filmsResponse.json(); //id_film, id_utilisateur
    let films_aime= [];
    films.forEach(async element =>{
        const id_film = element.id_film;
        const filmResponse = await fetch(API + "/film/"+id_film , {
            method: "GET",
            credentials: "include"
        });
        const _film = await filmResponse.json();

        const titre = _film.titre;
        const affiche = _film.affiche;
        const realisateur = _film.realisateur;
        const nb_like = element.nb_likes;

        const film = {
            "titre" :titre,
            "affiche" :affiche,
            "realisateur" :realisateur,
            "nb_like":nb_like,
        }

        films_aime.push(film);
    })
    return films_aime;
}

async function ajoutLike(film){
    const response = await fetch(API + "/film-like", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_film : film,
        })
    });
    const data = await response.json();
}