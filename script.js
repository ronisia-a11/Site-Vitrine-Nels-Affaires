/* ====== À PERSONNALISER ====== */
const ENTREPRISE = {
  nom: "Nels Affaires",
  whatsapp: "237674671674",        // numéro international, sans + ni espaces
  telephone: "+237 674 671 674",
  facebook: "https://facebook.com/Nels.Affaires",
  tiktok: "https://tiktok.com/@00237nelsvibes",
  snapchat: "https://snapchat.com/add/votrecompte",
  adresse: "Douala, Cameroun"
};

/* Services et produits : modifiez, ajoutez ou supprimez librement.
   motif = m1 à m6 (motif de pagne affiché tant que vous n'avez pas de photo).
   Pour une vraie photo, ajoutez  img: "images/mon-produit.jpg"  */
const SERVICES = {
  vetements: {
    img: "habit.jpeg",
    titre: "Conception de vêtements",
    texte: "Robes, chemises, ensembles couple et tenues de cérémonie, cousus sur mesure.",
    motif: "m2",
    produits: [
      { nom: "Tenue de nuit en pagne", prix: "25 000 FCFA", matiere: "Wax 100 % coton", detail: "Sur mesure, délai 7 jours.", motif: "m2" },
      { nom: "Chemise homme col mao", prix: "18 000 FCFA", matiere: "Wax coton, doublure légère", detail: "Tailles S à XXL.", motif: "m3" },
      { nom: "Ensemble couple", prix: "40 000 FCFA", matiere: "Super wax", detail: "Deux pièces assorties, sur mesure.", motif: "m5" }
    ]
  },
  tables: {
    img: "tableaux.jpeg",
    titre: "Tables murales",
    texte: "Tableaux et panneaux muraux en pagne africain, encadrés pour embellir votre salon.",
    motif: "m1",
    produits: [
      { nom: "Table murale « Soleil »", prix: "35 000 FCFA", matiere: "Pagne wax sur cadre en bois", detail: "60 × 80 cm, prête à accrocher.", motif: "m1" },
      { nom: "Table murale « Savane »", prix: "48 000 FCFA", matiere: "Pagne et raphia", detail: "80 × 100 cm.", motif: "m4" },
      { nom: "Trio de petits tableaux", prix: "30 000 FCFA", matiere: "Pagne wax sur toile", detail: "3 pièces de 30 × 30 cm.", motif: "m6" }
    ]
  },
  sacs: {
    img: "sac.jpeg",
    titre: "Sacs",
    texte: "Sacs à main, sacs de voyage et pochettes en pagne, solides et colorés.",
    motif: "m3",
    produits: [
      { nom: "Sac cabas", prix: "15 000 FCFA", matiere: "Wax coton, anses en cuir synthétique", detail: "Fermeture zip, poche intérieure.", motif: "m3" },
      { nom: "Pochette de soirée", prix: "8 000 FCFA", matiere: "Pagne et satin", detail: "Tour de main inclus.", motif: "m5" },
      { nom: "Sac de voyage", prix: "28 000 FCFA", matiere: "Pagne enduit, imperméable", detail: "45 L.", motif: "m2" }
    ]
  },
  protections: {
    img: "table.jpeg",
    titre: "Protections pour meubles",
    texte: "Housses de canapé, chemins de table et couvre-fauteuils faits sur mesure.",
    motif: "m4",
    produits: [
      { nom: "Housse de canapé 3 places", prix: "45 000 FCFA", matiere: "Pagne coton épais, lavable en machine", detail: "Élastique aux angles.", motif: "m4" },
      { nom: "Chemin de table", prix: "10 000 FCFA", matiere: "Wax coton", detail: "180 × 40 cm.", motif: "m6" },
      { nom: "Couvre-fauteuil", prix: "18 000 FCFA", matiere: "Bogolan (coton tissé)", detail: "Pièce unique.", motif: "m1" }
    ]
  }
};
/* ============================ */

const ici = location.pathname.split("/").pop() || "index.html";
const lien = (f, t) => `<li><a href="${f}" ${ici === f || (f === "services.html" && ici === "produits.html") ? 'class="actif"' : ""}>${t}</a></li>`;

document.body.insertAdjacentHTML("afterbegin", `
<div class="bande"></div>
<header><div class="wrap nav">
  <a class="logo" href="index.html">${ENTREPRISE.nom}</a>
  <button class="burger" aria-label="Menu" aria-expanded="false">☰</button>
  <ul id="menu">${lien("index.html", "Accueil")}${lien("services.html", "Services")}${lien("contact.html", "Contact")}</ul>
</div></header>`);
document.body.insertAdjacentHTML("beforeend",
  `<footer><div class="wrap">© ${new Date().getFullYear()} ${ENTREPRISE.nom} · ${ENTREPRISE.adresse}</div></footer>`);

const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("ouvert"));

const visuel = (o, classe = "") =>
  o.img ? `<div class="visuel ${classe}" style="background:url('${o.img}') center/cover"></div>`
        : `<div class="visuel ${o.motif} ${classe}"></div>`;

/* Page services : cartes cliquables */
const zoneServices = document.getElementById("liste-services");
if (zoneServices) {
  zoneServices.innerHTML = Object.entries(SERVICES).map(([id, s]) => `
    <a class="card" href="produits.html?service=${id}">
      ${visuel(s)}
      <div class="corps"><h3>${s.titre}</h3><p>${s.texte}</p><span class="voir">Voir les articles</span></div>
    </a>`).join("");
}

/* Page produits : lit ?service=... dans l'adresse */
const zoneProduits = document.getElementById("liste-produits");
if (zoneProduits) {
  const s = SERVICES[new URLSearchParams(location.search).get("service")];
  if (!s) {
    document.getElementById("titre-service").textContent = "Service introuvable";
    zoneProduits.innerHTML = `<p>Choisissez un service dans la <a href="services.html">liste des services</a>.</p>`;
  } else {
    document.title = `${s.titre} – ${ENTREPRISE.nom}`;
    document.getElementById("titre-service").textContent = s.titre;
    document.getElementById("texte-service").textContent = s.texte;
    zoneProduits.innerHTML = s.produits.map(p => {
      const msg = encodeURIComponent(`Bonjour, je suis intéressé(e) par : ${p.nom} (${p.prix}).`);
      return `<article class="card">${visuel(p)}
        <div class="corps"><h3>${p.nom}</h3><div class="prix">${p.prix}</div>
        <p class="detail"><b>Matière :</b> ${p.matiere}</p><p class="detail">${p.detail}</p>
        <a class="btn" style="margin-top:12px" href="https://wa.me/${ENTREPRISE.whatsapp}?text=${msg}">Commander</a></div></article>`;
    }).join("");
  }
}

/* Page contact : liens + formulaire (envoi par WhatsApp) */
const zoneLiens = document.getElementById("liens-contact");
if (zoneLiens) {
  const e = ENTREPRISE;
  zoneLiens.innerHTML = `
    <a class="reseau wa" href="https://wa.me/${e.whatsapp}">WhatsApp</a>
    <a class="reseau tel" href="tel:${e.telephone.replace(/\s/g, "")}">Appeler ${e.telephone}</a>
    <a class="reseau fb" href="${e.facebook}" target="_blank" rel="noopener">Facebook</a>
    <a class="reseau tk" href="${e.tiktok}" target="_blank" rel="noopener">TikTok</a>
    <a class="reseau sc" href="${e.snapchat}" target="_blank" rel="noopener">Snapchat</a>`;
}

const form = document.getElementById("form-contact");
if (form) {
  const bouton = form.querySelector('button[type="submit"]');
  const retour = document.getElementById("retour-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texteInitial = bouton.textContent;
    bouton.textContent = "Envoi en cours…";
    bouton.disabled = true;
    retour.textContent = "";

    try {
      const reponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form)   // contient déjà access_key (champ caché)
      });
      const data = await reponse.json();

      if (reponse.ok && data.success) {
        retour.style.color = "";
        retour.textContent = "Merci ! Votre message a bien été envoyé, nous vous répondons rapidement.";
        form.reset();
      } else {
        retour.style.color = "#b8432b";
        retour.textContent = "Erreur : " + (data.message || "l'envoi a échoué.");
      }
    } catch (erreur) {
      retour.style.color = "#b8432b";
      retour.textContent = "Problème de connexion. Vérifiez votre internet et réessayez.";
    } finally {
      bouton.textContent = texteInitial;
      bouton.disabled = false;
    }
  });
}
