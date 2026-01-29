const formulario = document.getElementById("formProducto");
const listaProductos = document.getElementById("listaProductos");

let productoEditando = null;

// AGREGAR / EDITAR
formulario.addEventListener("submit", e => {
  e.preventDefault();

  const producto = {
    marca: formulario.marca.value,
    categoria: formulario.categoria.value,
    nombre: formulario.nombre.value,
    precio: Number(formulario.precio.value),
    descripcion: formulario.descripcion.value,
    imagen: formulario.imagen.value,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  };

  if (productoEditando) {
    db.collection("productos").doc(productoEditando).update(producto)
      .then(() => {
        productoEditando = null;
        formulario.reset();
        formulario.querySelector("button").textContent = "➕ Agregar producto";
      });
  } else {
    db.collection("productos").add(producto)
      .then(() => formulario.reset());
  }
});

// LISTAR
db.collection("productos").onSnapshot(snapshot => {
  listaProductos.innerHTML = "";

  snapshot.forEach(doc => {
    const p = doc.data();

    const card = document.createElement("div");
    card.className = "admin-card";

    card.innerHTML = `
      <img src="${p.imagen}">
      <h4>${p.nombre}</h4>
      <p>${p.marca} - ${p.categoria}</p>
      <strong>RD$ ${p.precio}</strong>

      <div class="admin-actions">
        <button onclick="editarProducto('${doc.id}', ${JSON.stringify(p).replace(/"/g, '&quot;')})">
          ✏️ Editar
        </button>
        <button class="danger" onclick="eliminarProducto('${doc.id}')">
          🗑️
        </button>
      </div>
    `;

    listaProductos.appendChild(card);
  });
});

// EDITAR
function editarProducto(id, producto) {
  productoEditando = id;

  formulario.marca.value = producto.marca;
  formulario.categoria.value = producto.categoria;
  formulario.nombre.value = producto.nombre;
  formulario.precio.value = producto.precio;
  formulario.descripcion.value = producto.descripcion;
  formulario.imagen.value = producto.imagen;

  formulario.querySelector("button").textContent = "💾 Guardar cambios";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ELIMINAR
function eliminarProducto(id) {
  if (confirm("¿Eliminar este producto?")) {
    db.collection("productos").doc(id).delete();
  }
}
