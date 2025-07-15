console.log("Script connecté !");



const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("https://script.google.com/macros/s/AKfycbwoboA04JBsYwoYN6KRn4hFRBUvWxvAwQtHWlcoIPg5heYHG-tr7D_tBoBBMcmlUbr5/exec")
  .then(res => res.json())                                     
  .then(produits => {
    const produit = produits.find(p => p.id === id);
    if (!produit) {
      document.body.innerHTML = "<h2>Produit introuvable</h2>";
      return;
    }

    // Affiche les infos
    document.querySelector("h1").innerText = produit.nom;
    document.querySelector(".encadrement-prix").innerText = produit.prix;
    document.querySelector(".info").innerHTML = produit.description;

    // Images dynamiques
    const image = document.getElementById("produitImage");
    image.src = produit.images[0];

    const thumbnails = document.querySelector(".thumbnails");
    thumbnails.innerHTML = "";
    produit.images.forEach((img, i) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.onclick = () => {
        image.src = img;
      };
      thumbnails.appendChild(thumb);
    });
  });
