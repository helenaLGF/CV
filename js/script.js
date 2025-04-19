// Ajoute un écouteur d'événement sur chaque lien du menu pour activer le défilement fluide
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêche l'action par défaut du lien
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Défilement fluide
        });
    });
});
