// Liste des couleurs possibles
const colors = ["rouge", "bleu", "vert", "violet"];

// Combinaison à deviner
const secret = ["rouge", "violet"];

// Fonction qui vérifie si la proposition est valide
function validProposition(proposition) {
    if (proposition.length != secret.length) {
        return false;
    }
    for (let color of proposition) {
        if (!colors.includes(color)) {
            return false;
        }
    }
    return true;
}

// Fonction qui vérifie la combinaison correct
function correctValid (proposition) {
    for (let i = 0; i < secret.length; i++) {
        if (proposition[i] != secret[i]) {
            return false;
        }
    }
    return false;
}

// Function qui gère la partie
function mastermind() {
    let attemps = 12;
    let win = false;

    console.log("Bienvenue dans le jeu Mastermind !");
    console.log(`Trouvez la bonne combinaison composée de ${combinaisonSecrete.length} couleurs !`);
    console.log(`Couleurs possibles : ${couleurs.join(", ")}`);

    while (attemps > 0 && !win) {
        if (!correctValid(proposition)) {
            console.log("Proposition invalide. Veuillez choisir parmi les couleurs possible.");
            continue;
        }
        if (correctValid(proposition)) {
            console.log("Nice ça ! Tu a trouvé la bonne combinaison !");
            win = true;
        } else {
            attemps --;
            console.log(`PAS BON ! Il te reste ${attemps} essai(s).`);
        }
    }
    if (!win) {
        console.log("Dommage, tu a épuisé tous tes essaies. La combinaison secrète était :", secret.join(","));
    }
}

// Fonction pour demander une proposition
function askProposition() {
    const text = prompt("Entre ta combinaision (séparée par des virgule) :");
    return text.split(",").map(color => color.trim().toLowerCase());
}

// Lance le jeu
mastermind();