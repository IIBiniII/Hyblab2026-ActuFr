'use strict'

const API = "http://localhost:8080/actu/api" 

async function loadFilm(){
    // let list_film = [];
    const filmsResponse = await fetch(API + "/film-week", { //route a changer
        method: "GET",
        credentials: "include"
    });

    const films = await filmsResponse.json();

    //pour un film
    const i = 3;
    const titre_film = films[i].titre;
    const realisateur = films[i].realisateur;
    const critique = films[i].critique;
    const etoiles = films[i].nb_etoile;
    const bande_annonce = films[i].bande_annonce;
    const affiche = films[i].affiche;

    let carte = createCard(titre_film, critique, affiche, etoiles, realisateur, bande_annonce, null);
    document.body.appendChild(carte);
    //pour tous les films
    // filmsResponse.forEach(element => {
    //     const titre_film = element.titre;
    //     const realisateur = element.realisateur;
    //     const critique = element.critique;
    //     const etoiles = element.nb_etoile;
    //     const bande_annonce = element.bande_annonce;
    //     const affiche = element.affiche;

        // const film = {
        //     "titre" : titre_film,
        //     "realisateur": realisateur,
        //     "critique" : critique, 
        //     "etoiles": etoiles,
        //     "bande_annonce" : bande_annonce,
        //     "affiche" : affiche,
        // }
        // list_film.push(film);
        
    // });
    // return list_film;

}
// loadFilm()


async function loadClassement(){
    const classementResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
    const classement = await classementResponse.json();
    //titre + nb de likes
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
        list.push(film);
        
        // let item = createItem(affiche, titre, realisateur, rank, nb_like, index, isNew = false);
        // item.dataset.id = movie.id;
        // list.appendChild(item);
    })
    return list;
}

loadClassement()

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