/* =====================================================
   PRODUITS
===================================================== */

const produits = {

    /* ================= VÊTEMENTS ================= */

    vetements: {

        titre: "Conception des vêtements",

        produits: [

            {
                nom: "Robe africaine élégante",
                prix: "35 000 FCFA",
                matiere: "Pagne africain",
                image: "images/vetements/vetement1.jpg",
                description:
                    "Robe élégante confectionnée avec un tissu africain de qualité."
            },

            {
                nom: "Ensemble homme africain",
                prix: "45 000 FCFA",
                matiere: "Wax",
                image: "images/vetements/vetement2.jpg",
                description:
                    "Ensemble moderne pour homme avec motifs africains."
            },

            {
                nom: "Chemise africaine",
                prix: "25 000 FCFA",
                matiere: "Coton africain",
                image: "images/vetements/vetement3.jpg",
                description:
                    "Chemise confortable avec une finition inspirée de la culture africaine."
            }

        ]

    },


    /* ================= TABLES ================= */

    tables: {

        titre: "Tables murales",

        produits: [

            {
                nom: "Table murale Wax",
                prix: "60 000 FCFA",
                matiere: "Bois + Wax",
                image: "images/tables/table1.jpg",
                description:
                    "Table murale décorative avec finition en pagne africain."
            },

            {
                nom: "Table murale traditionnelle",
                prix: "75 000 FCFA",
                matiere: "Bois + tissu africain",
                image: "images/tables/table2.jpg",
                description:
                    "Création décorative inspirée des motifs traditionnels africains."
            },

            {
                nom: "Table murale moderne",
                prix: "85 000 FCFA",
                matiere: "Bois + tissu Wax",
                image: "images/tables/table3.jpg",
                description:
                    "Table murale moderne adaptée aux intérieurs contemporains."
            }

        ]

    },


    /* ================= SACS ================= */

    sacs: {

        titre: "Conception des sacs",

        produits: [

            {
                nom: "Sac à main Wax",
                prix: "20 000 FCFA",
                matiere: "Wax africain",
                image: "images/sacs/sac1.jpg",
                description:
                    "Sac à main élégant confectionné avec du tissu Wax."
            },

            {
                nom: "Sac bandoulière",
                prix: "18 000 FCFA",
                matiere: "Pagne africain",
                image: "images/sacs/sac2.jpg",
                description:
                    "Sac pratique et moderne pour une utilisation quotidienne."
            },

            {
                nom: "Grand sac africain",
                prix: "30 000 FCFA",
                matiere: "Wax + cuir",
                image: "images/sacs/sac3.jpg",
                description:
                    "Grand sac robuste et élégant avec une finition africaine."
            }

        ]

    },


    /* ================= PROTECTIONS ================= */

    protections: {

        titre: "Protections pour meubles",

        produits: [

            {
                nom: "Protection canapé 3 places",
                prix: "45 000 FCFA",
                matiere: "Pagne Wax",
                image: "images/protections/protection1.jpg",
                description:
                    "Protection élégante pour canapé trois places, confectionnée en tissu Wax."
            },

            {
                nom: "Protection fauteuil",
                prix: "25 000 FCFA",
                matiere: "Coton africain",
                image: "images/protections/protection2.jpg",
                description:
                    "Housse de protection pour fauteuil avec motifs africains."
            },

            {
                nom: "Protection canapé familial",
                prix: "65 000 FCFA",
                matiere: "Wax renforcé",
                image: "images/protections/protection3.jpg",
                description:
                    "Grande protection pour canapé familial avec tissu résistant."
            }

        ]

    }

};


/* =====================================================
   AFFICHER UN SERVICE
===================================================== */

function afficherService(service) {

    const data = produits[service];

    if (!data) {
        return;
    }


    const section =
        document.getElementById("produits-section");

    const container =
        document.getElementById("products-container");

    const title =
        document.getElementById("service-title");

    const label =
        document.getElementById("service-label");


    if (!container) {
        return;
    }


    title.textContent = data.titre;

    label.textContent =
        "Découvrez nos créations";


    container.innerHTML = "";


    data.produits.forEach(function(produit) {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-card-image">

                <img
                    src="${produit.image}"
                    alt="${produit.nom}"
                >

            </div>


            <div class="product-info">

                <h3>
                    ${produit.nom}
                </h3>

                <span class="product-material">
                    ${produit.matiere}
                </span>

                <p class="product-price">
                    ${produit.prix}
                </p>

                <p class="product-description">
                    ${produit.description}
                </p>

            </div>

        `;


        container.appendChild(card);

    });


    section.scrollIntoView({
        behavior: "smooth"
    });


    /* Modification de l'URL */

    const nouvelleURL =
        "services.html?service=" + service;

    window.history.pushState(
        {},
        "",
        nouvelleURL
    );

}


/* =====================================================
   CHARGER LE SERVICE DEPUIS L'URL
===================================================== */

function chargerServiceDepuisURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const service =
        params.get("service");


    if (service && produits[service]) {

        afficherService(service);

    }

}


/* =====================================================
   FORMULAIRE CONTACT
===================================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nom =
                document.getElementById("nom").value;


            alert(
                "Merci " +
                nom +
                " ! Votre message a bien été préparé."
            );


            contactForm.reset();

        }
    );

}


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        chargerServiceDepuisURL();

    }
);