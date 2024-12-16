// Liste des couleurs possibles avec des noms valides en CSS
const colors = ["red", "blue", "green", "purple", "yellow", "orange", "black", "white", "pink", "turquoise", "brown", "gray"];

// Fonction pour générer une combinaison aléatoire
function generateSecretCode(length = 4) {
    const secret = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        secret.push(colors[randomIndex]);
    }
    return secret;
}

// Initialiser le code secret
let secretCode = generateSecretCode();
let currentGuess = [];
let attempts = 12;

// Récupération des éléments HTML
const gameBoard = document.getElementById("gameBoard");
const colorOptions = document.getElementById("colorOptions");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const messageBox = document.getElementById("messageBox");

// Création des options de couleurs
colors.forEach(color => {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.backgroundColor = color;  // Utilisation de la couleur valide
    circle.addEventListener("click", () => addColor(color));
    colorOptions.appendChild(circle);
});

// Ajouter une couleur à la tentative
function addColor(color) {
    if (currentGuess.length < 4) {
        currentGuess.push(color);
        updateBoard();
        submitBtn.disabled = currentGuess.length !== 4;
    }
}

// MAJ de l'affichage de la tentative
function updateBoard() {
    gameBoard.innerHTML = ""; // Efface la tentative précédente
    const row = document.createElement("div");
    row.className = "row";
    currentGuess.forEach(color => {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.style.backgroundColor = color;
        row.appendChild(circle);
    });
    gameBoard.appendChild(row);
}

// Vérifie la tentative et affiche le feedback
function checkGuess() {
    if (currentGuess.length !== 4) return;

    const feedback = [];
    const tempSecret = [...secretCode];
    const feedbackMessages = [];

    // Vérification des couleurs correctes aux bonnes positions
    currentGuess.forEach((color, index) => {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.style.backgroundColor = color;

        if (color === tempSecret[index]) {
            feedback.push("black");
            feedbackMessages.push("Bonne couleur, bonne position");
            tempSecret[index] = null; // Marque comme vérifié
            circle.style.border = "2px solid gold";  // Bordure dorée pour bonne couleur et bonne position
        } else {
            circle.style.border = "2px solid gray";  // Bordure grise pour couleur incorrecte
        }
        gameBoard.appendChild(circle);

        // Ajouter le message de feedback sous la couleur
        const messageElement = document.createElement("div");
        messageElement.className = "feedback-message";
        messageElement.textContent = feedbackMessages[index];
        gameBoard.appendChild(messageElement);
    });

    // Vérification des couleurs correctes aux mauvaises positions
    currentGuess.forEach((color, index) => {
        if (tempSecret.includes(color) && color !== tempSecret[index]) {
            feedback.push("white");
            feedbackMessages.push("Bonne couleur, mauvaise position");
            tempSecret[tempSecret.indexOf(color)] = null;
        }
    });

    renderFeedback(feedback, feedbackMessages);
    currentGuess = [];
    submitBtn.disabled = true;
    attempts--;

    // Affichage du message en cas de victoire ou de perte
    if (feedback.filter(f => f === "black").length === 4) {
        displayMessage("Félicitations ! Vous avez trouvé la combinaison !");
    } else if (attempts === 0) {
        displayMessage(`Dommage ! La combinaison secrète était : ${secretCode.join(", ")}`);
    }
}

// Affiche le feedback (noir et blanc) et les messages sous chaque couleur
function renderFeedback(feedback, feedbackMessages) {
    const row = document.createElement("div");
    row.className = "feedback";

    feedback.forEach((color, index) => {
        const feedbackCircle = document.createElement("div");
        feedbackCircle.className = "circle feedback-circle";
        feedbackCircle.style.backgroundColor = color === "black" ? "black" : "white";
        row.appendChild(feedbackCircle);

        // Ajouter le message de feedback sous la couleur
        const messageElement = document.createElement("div");
        messageElement.className = "feedback-message";
        messageElement.textContent = feedbackMessages[index];
        row.appendChild(messageElement);
    });

    gameBoard.appendChild(row);
}

// Affiche le message de victoire ou de défaite
function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = message;
    messageBox.innerHTML = '';  // Efface les messages précédents
    messageBox.appendChild(messageElement);
}

// Réinitialise le jeu
function resetGame() {
    currentGuess = [];
    attempts = 12;
    secretCode = generateSecretCode(); // Nouveau code secret à chaque partie
    gameBoard.innerHTML = "";
    messageBox.innerHTML = "";
    submitBtn.disabled = true;
}

// Bouton pour soumettre la tentative
submitBtn.addEventListener("click", checkGuess);

// Bouton pour réinitialiser le jeu
resetBtn.addEventListener("click", resetGame);


/*// Fonction qui vérifie si la proposition est valide
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
mastermind(); */
