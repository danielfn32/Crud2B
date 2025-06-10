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
            <button onClick="AbrirModalEditar(${persona.id}, '${persona.Nombre}', '${persona.Apellido}', '${persona.Correo}', '${persona.Edad}')">Editar</button>
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


    //proeceso para editar registro
    const modalEditar = document.getElementById("modalEditar");//modal
    const btnCerrarEditar = document.getElementById("btnCerrarEditar");//x para cerrar

    //evenlistener para cerrar el modal editar
    btnCerrarEditar.addEventListener("click", ()=>{
        modalEditar.close();
    });

    function AbrirModalEditar(id, nombre, apellido, Correo, edad){
        document.getElementById("nombreEditar").value = nombre;
        document.getElementById("apellidoEditar").value = apellido;
        document.getElementById("emailEditar").value = Correo;
        document.getElementById("edadEditar").value = edad;
        document.getElementById("IdEditar").value = id;// el id va oculto pero debe estar presente

        modalEditar.showModal();// el modal se abre cuando ya tiene los valores ingresados
    }

    document.getElementById("frmAEditarIntegranteS").addEventListener("submit", async e => {
        e.preventDefault();

        const id = document.getElementById("IdEditar").value;
        const nombre = document.getElementById("nombreEditar").value.trim();
        const apellido = document.getElementById("apellidoEditar").value.trim();
        const edad = document.getElementById("emailEditar").value.trim();
        const Correo = document.getElementById("edadEditar").value.trim();


        if(!nombre || !apellido || !edad || !Correo || !id){
            alert("complete todos los campos");
            return;
        }

        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({edad, Correo, nombre, apellido})
        });

        if(respuesta.ok){
            alert("registro actualizado correctamente");
            modalEditar.close();
            ObtenerPersonas();
        }else{
            alert("rror al Actualizar")
        }
    });