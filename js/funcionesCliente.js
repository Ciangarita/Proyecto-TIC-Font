///GET, POST, PUT Y DELETE

function getCliente(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }

    });
    
}

function postCliente(){
    if($("#email").val() == 0 || $("#password").val() == 0 || $("#name").val() == 0
        || $("#age").val() == 0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        $.ajax({
            url:"http://130.162.44.50:8080/api/Client/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la Cliente");
                window.location.reload();
            }
        });
    }

    return false;
}

function putCliente(idBotonActualizar){
    if($("#email").val().length==0 || 
    $("#password").val().length==0 || 
    $("#name").val().length==0 || 
    $("#age").val().length==0 
    ){
     alert("Todos los campos son obligatorios para actualizar la habitacion");
    }else{
   
    let cajas = {
        idClient:idBotonActualizar,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    console.log(cajas);
    $.ajax({
        url:"http://130.162.44.50:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el cliente");
            window.location.reload();
            }
        });
    }
}

function deleteCliente(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-red-600 dark:hover:bg-red-700',
          cancelButton: 'focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-green-600 dark:hover:bg-darkgreen-700'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar el cliente?',
        text: "No se puede revertir esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://130.162.44.50:8080/api/Client/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
          
                window.location.reload();
            }
        });
        swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro se ha eliminado',
            'success'
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha eliminado el registro',
            'error'
          )
        }
      })    
}

/////////////////////////////////////////////////
function pintarCliente(respuesta){
    let myTable = "";
    respuesta.forEach(cliente => {
        myTable += `<tr>
        <td>${cliente.idClient}</td>
        <td>${cliente.email}</td>
        <td>${cliente.password}</td>
        <td>${cliente.name}</td>
        <td>${cliente.age}</td>
        <td><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick='deleteCliente(${cliente.idClient})'>Eliminar</button>
        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:focus:ring-yellow-900" onclick='putCliente(${cliente.idClient})'>Actualizar</button></td>
        </tr>`
    });
    
    if (myTable.length == 0) {
        myTable = "<tr class='bg-gray-50 dark:bg-gray-800'><td colspan='7'>No hay datos</td></tr>";
    }

    $("#clients").append(myTable);
}

// function getMessage_Client(){
//     $.ajax({
//         url:"http://130.162.44.50:8080/api/Message/all",
//         type:"GET",
//         datatype:"JSON",
//         success:function(respuesta){
//            let $select = $("#select-category optgroup");
//            $.each(respuesta, function(id, name){
//             $select.append('<option value='+name.id+'>'+name.name+'</option>')
//            })
//         }
//     });

// }