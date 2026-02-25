let gastos = JSON.parse(localStorage.getItem("gastos")) || []
const formulario = document.getElementById("formulario")
const lista = document.getElementById("lista-gastos")


function render() {
    lista.innerHTML = "";
    let total = 0;

    gastos.forEach(function(gasto, index) {
        total += gasto.gasto;

        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent =
            gasto.descripcion + " - $" + gasto.gasto +
            " - " + gasto.categoria +
            " - " + gasto.fecha;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";

        boton.addEventListener("click", function() {
            gastos.splice(index, 1);
            localStorage.setItem("gastos", JSON.stringify(gastos));
            render();
        });

        li.appendChild(texto);
        li.appendChild(boton);
        lista.appendChild(li);
    });

    document.getElementById("total").textContent = total;
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
 


