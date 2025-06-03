//URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/BuWOdF/Expo";

//Funcion para llamara a la API y traer el JSON
async function ObtenerPersonas() {
    //Obtener la respuesta del servidor 
    const res = await fetch(API_URL); //Obtener datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos el JSON a la funcion "CrearTabla"
}

//Funcion que creara las filas de las tablas en base a los reguistros de la API

function CrearTabla(datos){//"Datos" respresenta al JSON que viene de la api
    //se llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla
    
    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Edad}</td>
            <td>${persona.Correo}</td>
        <td> 
            <button>Editar</button>
            <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
        </td>
        </tr>
        `
    });
}

ObtenerPersonas();


const modal = document.getElementById("modalAgregar");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnAgregarIntegrante = document.getElementById("btnAbrirModal");

btnAgregarIntegrante.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrarModal.addEventListener("click", ()=>{
    modal.close();
});

document.getElementById("frmAgregarIntegranteS").addEventListener("submit", async e => {
    e.preventDefault();

    const Nombre = document.getElementById("nombre").value.trim();
    const Apellido = document.getElementById("apellido").value.trim();
    const Edad = document.getElementById("edad").value.trim();
    const Correo = document.getElementById("email").value.trim();

    if( !Nombre || !Apellido || !Correo || !Edad ){
        alert("Complete todos los campos");
        return;
    }

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Nombre, Apellido, Edad, Correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        document.getElementById("frmAgregarIntegranteS").reset();

        modal.close();

        ObtenerPersonas();
    }
    else{
        alert("Hubo un error al Agregar")
    }

});


//para eliminar registros
 async function EliminarRegistro(id){// se pide el id para borrar
    if(confirm("Estas seguro de querer borrar este registro")){
        await fetch(`${API_URL}/${id}`,{method: `DELETE`});
        ObtenerPersonas();
    }
    }
 
