///GET, POST, PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Category/all",
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
            url:"http://130.162.44.50:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se creo correctamente la categoria");
                window.location.reload();
            }
        });
    }
    return false;
   
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
        url:"http://130.162.44.50:8080/api/Category/update",
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
          confirmButton: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-red-600 dark:hover:bg-red-700',
          cancelButton: 'focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 dark:bg-green-600 dark:hover:bg-darkgreen-700'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar la categoria?',
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
            url:"http://130.162.44.50:8080/api/Category/"+idBotonBorrar,
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
function pintarCategoria(respuesta){
    let myTable = "";
    respuesta.forEach(categoria => {
        myTable += `<tr>
        <td>${categoria.id}</td>
        <td>${categoria.name}</td>
        <td>${categoria.description}</td>
        <td><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick='deleteCategoria(${categoria.id})'>Eliminar</button>

        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-3 dark:focus:ring-yellow-900" onclick='putCategoria(${categoria.id})'>Actualizar</button></td>
        </tr>`
    });
    
    if (myTable.length == 0) {
        myTable = "<tr class='bg-gray-50 dark:bg-gray-800'><td colspan='7'>No hay datos</td></tr>";
    }

    $("#categories").append(myTable);
}



