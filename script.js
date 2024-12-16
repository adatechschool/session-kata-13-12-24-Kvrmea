// Liste des couleurs possibles
const colors = ["rouge", "bleu", "vert", "violet", "jaune", "orange", "noir", "blanc"];

// Fonction pour générer une combinaison aléatoire
function generateSecretCode(length) {
    const secret = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        secret.push(colors[randomIndex]);
    }
    return secret;
}

// Génère la combinaision à deviner
const secretCode = generateSecretCode(4);

// Fonction qui vérifie si la proposition est valide
function validProposition(proposition) {
    if (proposition.length !== secret.length) {
        return false;
    }
    for (let color of proposition) {
        if (!colors.includes(color)) {
            return false;
        }
    }
    return true;
}

// Fonction qui vérifie si la combinaison est correcte
function correctValid(proposition) {
    for (let i = 0; i < secret.length; i++) {
        if (proposition[i] !== secret[i]) {
            return false;
        }
    }
    return true;
}

// Fonction qui gère la partie
function mastermind() {
    let attempts = 12;
    let win = false;

    console.log("Bienvenue dans le jeu Mastermind !");
    console.log(`Trouvez la bonne combinaison composée de ${secret.length} couleurs !`);
    console.log(`Couleurs possibles : ${colors.join(", ")}`);

    while (attempts > 0 && !win) {
        const proposition = askProposition();

        if (!validProposition(proposition)) {
            console.log("Proposition invalide. Veuillez choisir parmi les couleurs possibles.");
            continue;
        }

        if (correctValid(proposition)) {
            console.log("Félicitations ! Vous avez trouvé la bonne combinaison !");
            win = true;
        } else {
            attempts--;
            console.log(`Incorrect ! Il vous reste ${attempts} essai(s).`);
        }
    }

    if (!win) {
        console.log("Dommage, vous avez épuisé tous vos essais. La combinaison secrète était :", secret.join(", "));
    }
}

// Fonction pour demander une proposition
function askProposition() {
    const text = prompt("Entrez votre combinaison (séparée par des virgules) :");
    return text.split(",").map(color => color.trim().toLowerCase());
}

// Lance le jeu
mastermind();
