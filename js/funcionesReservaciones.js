function getReservaciones(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservaciones(respuesta);
            console.log(respuesta);
        }
    });
}

function pintarReservaciones(respuesta){
    let myTable = "";
    respuesta.forEach(reservacion => {
        myTable += `<tr>
        <td>${reservacion.idReservation}</td>
        <td>${reservacion.startDate}</td>
        <td>${reservacion.devolutionDate}</td>
        <td>${reservacion.status}</td>
        <td>${reservacion.room.name}</td>
        <td>${reservacion.client.name}</td>
        <td><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick='deleteReservacion(${reservacion.idReservation})'>Eliminar</button>

        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:focus:ring-yellow-900" onclick='putReservacion(${reservacion.idReservation})'>Actualizar</button></td>
        </tr>`
    });
    
    if (myTable.length == 0) {
        myTable = "<tr class='bg-gray-50 dark:bg-gray-800'><td colspan='7'>No hay datos</td></tr>";
    }

    $("#reservations").append(myTable);
}

function postReservation(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length == 0){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
        room:{id: $("#select-room").val()},
        client: {idClient: $("#select-client").val()},
    };
    console.log(cajas);
    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la reservacion");
            window.location.reload();
            }
        });
    }
    return false;
}

function putReservacion(){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
     alert("Todos los campos son obligatorios para actualizar la Reservacion");
    }else{
   
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        room:{id: $("#select-room").val()},
        client:{idClient: $("#select-client").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            console.log(respuesta);
            alert("se actualizo correctamente la Reservacion");
            window.location.reload();
            }
        });
    }
}

function deleteReservacion(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-red-600 dark:hover:bg-red-700',
          cancelButton: 'focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-green-600 dark:hover:bg-darkgreen-700'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar el mensaje?',
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
            url:"http://130.162.44.50:8080/api/Reservation/"+idBotonBorrar,
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

function getRoom(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           let $select = $("#room");
           $.each(respuesta, function(id, room){
            $select.append('<option value='+room.id+'>'+room.name+'</option>')
           })
        }
    });

}

function getClient(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           let $select = $("#client");
           $.each(respuesta, function(id, client){
            $select.append('<option value='+client.idClient+'>'+client.name+'</option>')
           })
        }
    });

}