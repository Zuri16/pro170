AFRAME.registerComponent("markerhandler", {
  init: async function () {

    //Toma la colección de platillos desde la base de datos Firebase.
    var toys = await this.getToys();

    //Evento markerFound.
    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;      
      this.handleMarkerFound(toys, markerId);
    });

    //Evento markerLost.
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });

  },
  handleMarkerFound: function (toys, markerId) {
    // Cambiar la visibilidad del botón div.
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButtton = document.getElementById("order-button");

    // Usar eventos de clic.
    ratingButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Calificar juguete",
        text: "Procesando calificación"
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "¡Gracias por tu orden!",
        text: "¡Recibirás tu juguete pronto!"
      });
    });

    // Cambiar el tamaño del modelo a su escala incial.
    var toy = toys.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);
  },

  handleMarkerLost: function () {
    // Cambiar la visibilidad del botón div.
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
  //Tomar la colección de platillos desde la base de datos Firebase.
  getToys: async function () {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
