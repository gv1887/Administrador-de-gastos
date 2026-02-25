let gastos = JSON.parse(localStorage.getItem("gastos")) || []
const formulario = document.getElementById("formulario")
const lista = document.getElementById("lista-gastos")


function render() {
    lista.innerHTML = "";
    let totalGeneral = 0;
    let categorias = {};

    gastos.forEach(function(gasto) {
        if (!categorias[gasto.categoria]) {
            categorias[gasto.categoria] = [];
        }
        categorias[gasto.categoria].push(gasto);
    });

    for (let categoria in categorias) {

        const tituloCategoria = document.createElement("h3");
        tituloCategoria.textContent = categoria.toUpperCase();
        lista.appendChild(tituloCategoria);

        let totalCategoria = 0;

        categorias[categoria].forEach(function(gasto, index) {
            totalCategoria += gasto.gasto;
            totalGeneral += gasto.gasto;

            const li = document.createElement("li");

            const texto = document.createElement("span");
            texto.textContent =
                gasto.descripcion + " - $" + gasto.gasto +
                " - " + gasto.fecha;

            const boton = document.createElement("button");
            boton.textContent = "Eliminar";

            boton.addEventListener("click", function() {

                const indexReal = gastos.indexOf(gasto);

                gastos.splice(indexReal, 1);
                localStorage.setItem("gastos", JSON.stringify(gastos));
                render();
            });

            li.appendChild(texto);
            li.appendChild(boton);
            lista.appendChild(li);
        });

        const totalCat = document.createElement("p");
        totalCat.textContent = "Total " + categoria + ": $" + totalCategoria;
        totalCat.style.fontWeight = "bold";
        lista.appendChild(totalCat);
    }
    document.getElementById("total").textContent = totalGeneral;
}

formulario.addEventListener("submit",function(e){
    e.preventDefault()
    const formData = new FormData(formulario)
    const descripcion = formData.get("descripcion")
    const gasto = Number(formData.get("gasto"))
    const categoria = formData.get("categoria")
    const fecha = formData.get("fecha")
    
    const nuevoGasto = {
        descripcion,
        gasto,
        categoria,
        fecha
    };
    gastos.push(nuevoGasto);
    localStorage.setItem("gastos",JSON.stringify(gastos))
    render()
    console.log(gastos)
})

render()

