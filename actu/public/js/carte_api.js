'use strict'

const API = "http://localhost:8080/actu/api" 

async function loadFilm(){
    const filmsResponse = await fetch(API + "/film-week", { //route a changer
        method: "GET",
        credentials: "include"
    });

    const films = await filmsResponse.json();
    let filmsNodes = films.map(film => {
        const titre_film = film.titre;
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

// async function loadClassement(){
//     let list_classement = [];
//     const classementResponse = await fetch(API + "/film-ranking", {
//         method: "GET",
//         credentials: "include"
//     });
//     const classement = await classementResponse.json();
//     //titre + nb de likes
//     classement.forEach(async element => {
//         const id_film = element.film; //c'est l'ID
//         // const filmResponse = await fetch(API + "/film/"+id_film , {
//         //     method: "GET",
//         //     credentials: "include"
//         // });
//         // const film = await filmResponse.json();
//         const nb_like = element.nb_likes;
//     })

// }

// loadClassement()

// async function loadCoupDeCoeur(){
//     const filmResponse = await fetch(API + "/film-bestofweek", {
//         method: "GET",
//         credentials: "include"
//     });
//     const film = await filmResponse.json();
//     return film;
// }