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
loadFilm()

async function loadClassement(){
    let list_classement = [];
    const classementResponse = await fetch(API + "/film-ranking", {
        method: "GET",
        credentials: "include"
    });
    const classement = await classementResponse.json();
    //titre + nb de likes
    classement.forEach(async element => {
        const id_film = element.film; //c'est l'ID
        // const filmResponse = await fetch(API + "/film/"+id_film , {
        //     method: "GET",
        //     credentials: "include"
        // });
        // const film = await filmResponse.json();
        const nb_like = element.nb_likes;
    })

}

loadClassement()

async function loadCoupDeCoeur(){
    const filmResponse = await fetch(API + "/film-bestofweek", {
        method: "GET",
        credentials: "include"
    });
    const film = await filmResponse.json();
    return film;
}