///GET, POST, PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://140.84.185.32:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){
    if($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url:"http://140.84.185.32:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    }
    
   
}

function putCategoria(idBotonActualizar){
    console.log(idBotonActualizar);
    if($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios para actualizar");
    }else{
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://140.84.185.32:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la categoria");
            window.location.reload();
            }
        });
    }
}

function deleteCategoria(idBotonBorrar){
   
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar la categoria?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         
          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://140.84.185.32:8080/api/Category/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
               // alert("se borro correctamente la categoria");
                window.location.reload();
            }
        });
        swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })    
   
}

/////////////////////////////////////////////////
function pintarCategoria(respuesta){
    let myTable = "";
    respuesta.forEach(habitacion => {
        myTable += `<tr>
        <td>${habitacion.id}</td>
        <td>${habitacion.name}</td>
        <td>${habitacion.stars}</td>
        <td>${habitacion.hotel}</td>
        <td>${habitacion.description}</td>
        <td>${habitacion.category.name}</td>
        <td><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick='deleteCategoria(${habitacion.id})>Red</button></td>
        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" onclick='putCategoria(${habitacion.id})>Actualizar</button>
        </tr>`
    });
    
    if (myTable.length == 0) {
        myTable = "<tr class='bg-gray-50 dark:bg-gray-800'><td colspan='7'>No hay datos</td></tr>";
    }

    $("#rooms").append(myTable);
}



