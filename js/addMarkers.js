AFRAME.registerComponent("create-markers", {
  init: async function(){
    var escena=document.querySelector("#main-scene")
    var toys = await this.getToys()
    toys.map(toy => {
      var mark = document.createElement("a-marker")
      mark.setAttribute("id", toy.id)
      mark.setAttribute("type", "pattern")
      mark.setAttribute("url", toy.marker_pattern_url)
      mark.setAttribute("cursor", {rayOrigin:"mouse"})
      mark.setAttribute("markerhandler", {})
      escena.appendChild(mark)

      var modelo = document.createElement("a-entity")
      modelo.setAttribute("id", `model-${toy.id}`)
      modelo.setAttribute("position", toy.model_geometry.position)
      modelo.setAttribute("rotation", toy.model_geometry.rotation)
      modelo.setAttribute("scale", toy.model_geometry.scale)
      modelo.setAttribute("gltf-model", `url(${toy.model_url})`)
      modelo.setAttribute("gesture-handler", {})
      mark.appendChild(modelo)

      var description_plano = document.createElement("a-plane")
      description_plano.setAttribute("id", `main-plane-${toy.id}`)
      description_plano.setAttribute("position", {x:0, y:0, z:0})
      description_plano.setAttribute("rotation", {x:-90, y:0, z:0})
      description_plano.setAttribute("width", 1.7)
      description_plano.setAttribute("height", 1.5)
      mark.appendChild(description_plano)

      var dish_title = document.createElement("a-plane")
      dish_title.setAttribute("id", `title-plane-${toy.id}`)
      dish_title.setAttribute("position", {x:0, y:0.89, z:0.02})
      dish_title.setAttribute("rotation", {x:0, y:0, z:0})
      dish_title.setAttribute("width", 1.69)
      dish_title.setAttribute("height", 0.3)
      dish_title.setAttribute("material", {color:"#F0C30F"})
      description_plano.appendChild(dish_title)

      var text_title = document.createElement("a-entity")
      text_title.setAttribute("id", `dich-title-${toy.id}`)
      text_title.setAttribute("position", {x:0, y:0, z:0.1})
      text_title.setAttribute("rotation", {x:0, y:0, z:0})
      text_title.setAttribute("text", {font:"monoid", color:"black", width:1.8, height:1, align:"center", value:`${toy.nombre.toUpperCase()}`})
      dish_title.appendChild(text_title)

      var text_descrip = document.createElement("a-entity")
      text_descrip.setAttribute("id", `ingredientes-${toy.id}`)
      text_descrip.setAttribute("position", {x:0.1, y:-0.6, z:0.1})
      text_descrip.setAttribute("rotation", {x:0, y:0, z:0})
      text_descrip.setAttribute("text", {font:"monoid", color:"black", width:1.6, align:"left", value:`${toy.description}`})
      text_title.appendChild(text_descrip)
    })
  },
  getToys: async function(){
    return await firebase
    .firestore()
    .collection("toys")
    .get()
    .then(snap => {
      return snap.docs.map(doc => doc.data())
    })
  }

  });
