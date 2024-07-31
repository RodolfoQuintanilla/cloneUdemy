const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarritos = [];

cargarEvento();
function cargarEvento() {
    listaCursos.addEventListener('click', agregarCurso)
}

function agregarCurso(e) {
    e.preventDefault();

    const datos = e.target.parentElement.parentElement;
    if (e.target.classList.contains('agregar-carrito')) {

        leerDatosCurso(datos);
    }
}

function leerDatosCurso(curso) {

    infCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarritos.some(curso => curso.id === infCurso.id)

    if (existe) {
        const cursos = articulosCarritos.map(curso => {
            if (curso.id === infCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarritos = [...cursos];
    } else {
        articulosCarritos = [...articulosCarritos, infCurso]
    }



    carritoHTML(articulosCarritos);
}

function carritoHTML(articulosCarritos) {

    limpiarHtml();

    articulosCarritos.forEach(curso => {
        const { imagen, titulo, precio, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        ${imagen}
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>`;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}