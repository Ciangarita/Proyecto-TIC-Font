/////////////GET, POST,PUT Y DELETE

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

/////////////////////////////////////////////////
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
        <td><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick='deleteMessage(${reservacion.idReservation})'>Eliminar</button>

        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:focus:ring-yellow-900" onclick='putMessage(${reservacion.idReservation})'>Actualizar</button></td>
        </tr>`
    });
    
    if (myTable.length == 0) {
        myTable = "<tr class='bg-gray-50 dark:bg-gray-800'><td colspan='7'>No hay datos</td></tr>";
    }

    $("#reservations").append(myTable);
}

function postReservaciones(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: $("#select-client").val()},
            room:{id: $("#select-room").val()}
        };
        $.ajax({
            url:"http://130.162.44.50/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la reservacion");
                //window.location.reload();
            }
        });
    }
}

// function putReservaciones(){
//     if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
//      alert("Todos los campos son obligatorios para actualizar la Reservacion");
//     }else{
   
//     let cajas = {
//         startDate:$("#startDate").val(),
//         devolutionDate:$("#devolutionDate").val(),
//         status:$("#status").val(),
//         room:{id:+$("#select-room").val()},
//         client:{idClient:+$("#select-client").val()}
//     };
//     console.log(cajas);
//     $.ajax({
//         url:"http://130.162.44.50:8080/api/Message/update",
//         type:"PUT",
//         datatype:"JSON",
//         contentType:"application/json",
//         data: JSON.stringify(cajas),
//         success:function(respuesta){
//             alert("se actualizo correctamente la Reservacion");
//             //window.location.reload();
//             }
//         });
//     }
// }

// function deleteReservaciones(){

// }

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