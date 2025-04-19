// Texte animé dans le menu : ce script alterne entre deux textes pour le lien des projets
const projectLink = document.getElementById('project-link');
const navTexts = ['Projets en cours', '🚧 En construction...'];  // Textes alternés à afficher
let currentTextIndex = 0;

// Fonction qui change le texte du lien toutes les 3 secondes
setInterval(() => {
  currentTextIndex = (currentTextIndex + 1) % navTexts.length;  // Alterner entre les textes
  projectLink.textContent = navTexts[currentTextIndex];          // Mise à jour du texte du lien
}, 3000);
