

$("#verAlumnos").click(function(event){
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => mostrarAlumnos(data))
    .catch(error => console.log(error))
    
    const mostrarAlumnos=(data)=>{
        console.log(data)
        let body=''
        for(let i=0;i<data.length;i++){
            body+=`<tr> 
            <td>${data[i].id}</td> 
            <td>${data[i].nombre}</td>
            <td>${data[i].email}</td>
            <td>${data[i].curso}</td>
            <td>${data[i].universidad}</td>
              <td><button class="btn btn-warning" id="editarUsuarios">Editar</button></td> 
              <td><button class="btn btn-danger" onclick = "deleteAlumnos(${data[i].id})" id="eliminarAlumnos">Eliminar</button></td>
              </tr>`
        }
        document.getElementById('dataAlumnos').innerHTML=body
    }
    
})


$("#agregarAlumnos").click(function(event){
    $("#contenedorU").load('agregarAlumno.html')
})





function registrarAlumnos() {

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var curso = document.getElementById('curso').value;
    var universidad = document.getElementById('universidad').value;

    const alumnos = {
        nombre : nombre,
        email : email,
        curso : curso,
        universidad:universidad,
    }

    console.log(alumnos)
    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        body: JSON.stringify(alumnos),
        headers: {
            "Content-type": "application/json"
        }

    }).then(res => res.json())
        .then(alumnos => console.log(alumnos))

}

$("#editarUsuarios").click(function(event){
    $("#contenedorU").load('editarAlumno.html')
})




function deleteAlumnos(id) {
    fetch('http://localhost:8080/usuarios/' + id, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json()) // Suponiendo que el backend envía una respuesta de confirmación
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Movimiento Eliminado',
          text: 'Alumno eliminado correctamente',
          timer: 1000,
          footer: '<p class="fw-bolder">Alumnos UFPS</p>'
        });
  
        // Actualizar los datos mostrados en el frontend después de una eliminación exitosa
        fetch('http://localhost:8080/usuarios') // Volver a obtener datos del backend
          .then(response => response.json())
          .then(newData => mostrarAlumnos(newData)) // Actualizar los datos mostrados
          .catch(error => console.log(error));
      })

      

      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el alumno!',
          timer: 1000,
          footer: '<a href="">¿Por qué tengo este problema?</a>'
        });
      });
  }






/** 
function deleteAlumnos(id){
   
    fetch('http://localhost:8080/usuarios/'+ id,{
        method:'DELETE',
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(response=>response.json())
    .then(data=>{
        Swal.fire({
            icon: 'success',
            title: 'Movimiento Eliminado',
            text: news,
            timer: 1000,
            footer: '<p class="fw-bolder" >Alumnos UFPS</p>'
          })

    

    })
    .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar movimiento!',
            timer:1000,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    })

}
*/