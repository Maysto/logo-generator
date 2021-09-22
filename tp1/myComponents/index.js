const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

class MyLogo extends HTMLElement {
  style = `
    @import url('https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap');

    #logo {
        font-family: 'Grey Qo', cursive;
    }
    .focus-in-expand {
        -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .focus-in-expand-fwd {
        -webkit-animation: focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .tracking-in-expand {
        -webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
                animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    }

@-webkit-keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
    #logo {
        color:red;
        font-size: 40px;
        border:5px solid green;
    }

@-webkit-keyframes focus-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-800px);
            transform: translateZ(-800px);
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
@keyframes focus-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-800px);
            transform: translateZ(-800px);
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

    `;
  html = `
    <div id="logo" >mon logo 2
    <!-- <img src="./images/flammes.jpg" width=200> -->
    <!-- <img src="./images/col-bg.png" width=200> -->
    </div>
        <br>
        Votre texte : <input type="text" id="nameInput">
        <br>
        Couleur : <input type="color" id="selecteurCouleur">
        <br>
        Taille : 5 <input type="range" val=40 min=5 max=100 
                          id="selecteurTaille"> 100
        <br>
        Background : <select id="selecteurImage">
          <option value = "0" selected>No Background</option>
          <option value = "1">Background 1</option>
          <option value = "2">Background 2</option>
        </select>
        <br>
        Text position : <select id="selecteurPosition">
          <option value = "0" selected>Gauche</option>
          <option value = "1">Centre</option>
          <option value = "2">Droite</option>
        </select>
        <br>
        Lien de votre police : <input type="text" id="policeInput">
        <br>
        <button id="random">Random</button>
    `;

  constructor() {
    super();
    // On crée le "shadow DOM"
    this.attachShadow({ mode: "open" });

    // récupérer les propriétés/attributs HTML
    this.couleur = this.getAttribute("couleur");
    if (!this.couleur) this.couleur = "black";

    this.text = this.getAttribute("text");
    this.animationClass = this.getAttribute("animation");
    this.controls = this.getAttribute("controls");
    this.size = this.getAttribute("size");
  }

  connectedCallback() {
    // ici on instancie l'interface graphique etc.
    this.shadowRoot.innerHTML = `<style>${this.style}</style>`
      + this.html;

    this.logo = this.shadowRoot.querySelector("#logo");
    // affecter les valeurs des attributs à la création
    this.logo.style.color = this.couleur;
    this.logo.classList.add(this.animationClass);
    this.declareEcouteurs();

    // On modifie les URLs relatifs
    this.fixRelativeURLs();

  }

  addFontURL(url) {
    this.style += "@import url('"+ url +"');"
  }

  fixRelativeURLs() {
    let images = this.shadowRoot.querySelectorAll('img');
    images.forEach((e) => {
      let imagePath = e.getAttribute('src');
      e.src = getBaseURL() + '/' + imagePath;
    });
  }

  declareEcouteurs() {
    this.shadowRoot.querySelector("#selecteurCouleur")
      .addEventListener("input", (event) => {
        this.changeCouleur(event.target.value);
      });

    this.shadowRoot.querySelector("#selecteurTaille")
      .addEventListener("input", (event) => {
        this.changeSize(event.target.value);
      });

      this.shadowRoot.querySelector("#selecteurImage")
      .addEventListener("input", (event) => {
        this.changeImg(event.target.value);
      });

      this.shadowRoot.querySelector("#selecteurPosition")
      .addEventListener("input", (event) => {
        this.changePos(event.target.value);
      });

      this.shadowRoot.querySelector("#random")
      .addEventListener("click", (event) => {
        this.randomize(event);
      });

      this.shadowRoot.querySelector("#nameInput")
      .addEventListener("input", () => {
        this.changeText(this.shadowRoot.querySelector("#nameInput").value);
      });

      this.shadowRoot.querySelector("#policeInput")
      .addEventListener("input", () => {
        this.addFontURL(this.shadowRoot.querySelector("#policeInput").value);
      });
  }

  // Fonction
  changeCouleur(val) {
    this.logo.style.color = val;
  }

  changeSize(val) {
    this.logo.style.fontSize = val + "px";
  }

  changePos(val) {
    switch (val) {
      case "0":
        this.logo.style.textAlign = "left";       
      break;

      case "1":
        this.logo.style.textAlign = "center";
      break;

      case "2":
        this.logo.style.textAlign = "right";
      break;
    }
  }

  changeText(val){
    this.logo.innerHTML = val;
  }

  randomize(){
    this.logo.style.fontSize = this.getRandomInt(25,100) + "px"; 
    this.logo.style.color = this.getRandomColor();
    this.changeImg(this.getRandomInt(0,5) + "");
    this.changePos(this.getRandomInt(0,3) + "");
  }

  getRandomInt(min,max) {
    return Math.floor(Math.random() * max) + min;
  }

  getRandomColor(){
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[this.getRandomInt(0,16)]
    }
    return color
  }

  changeImg(val){
    switch (val) {

      case "0":
        this.logo.style.background = "";
        break;

      case "1":
        this.logo.style.background = "url(" + getBaseURL() + "images/cool-bg.png)";
        this.logo.style.backgroundRepeat = "no-repeat";
        this.logo.style.backgroundSize = "cover";
        break;
  
      case "2":
        this.logo.style.background = "url(" + getBaseURL() + "images/flammes.jpg)";
        break;
    }
  }
}

customElements.define("my-logo", MyLogo);
