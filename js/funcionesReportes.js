function getStatus(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
        }
    });

}

function pintarStatus(respuesta){
    $("#informe").html("");
    let myTable = `<div class="w-full my-10">
    <table class="w-4/5 text-sm text-center text-gray-500 dark:text-gray-400 m-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Completed
                </th>
                <th scope="col" class="py-3 px-6">
                    Cancelled
                </th>
            </tr>
        </thead>
            <tbody>
                <tr>
                    <td>${respuesta.completed}</td>
                    <td>${respuesta.cancelled}</td>
                </tr>
            </tbody>
        </table>
    </div> `;
    $("#informe").html(myTable);

}

function getFechas(){
    $("#informe").html("");

    let form = `<div class="w-full md:w-3/6 p-3">
    <label class="block tracking-wide text-black text-xs font-bold mb-2" for="startDate">
        Fecha Inicio Reservacion
    </label>
    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="startDate" type="date">
</div>`;
    
    form += `<div class="w-full md:w-3/6 p-3">
        <label class="block tracking-wide text-black text-xs font-bold mb-2" for="devolutionDate">
            Fecha Final
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="devolutionDate" type="date">
    </div>`

    form += ` <button onclick="getReportDate()" class="block max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-3">
    <h2 class="p-2 font-bold tracking-tight text-gray-900 dark:text-white">Generar Reporte</h2>
  </button>`;

    $("#informe").html(form);

}

function getReportDate(){
    let startDate = $("#startDate").val();
    let devolutionDate = $("#devolutionDate").val();
    console.log(startDate);

    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/report-clients/" + startDate + "/" + devolutionDate,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarDate(respuesta);
        }
    });
}

function pintarDate(respuesta) {
    $("#informe").html("");
    let myTable = `<div class="w-full my-10">
    <table class="w-4/5 text-sm text-center text-gray-500 dark:text-gray-400 m-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Id Reservacion
                </th>
                <th scope="col" class="py-3 px-6">
                    Status
                </th>
                <th scope="col" class="py-3 px-6">
                    Habitacion
                </th>
                <th scope="col" class="py-3 px-6">
                    Cliente
                </th>
            </tr>
        </thead>
            <tbody>`
    respuesta.forEach(registro => {
        myTable += ` <tr>
        <td>${registro.idReservation}</td>
        <td>${registro.status}</td>
        <td>${registro.room.name}</td>
        <td>${registro.room.client.name}</td>
        </tr>`
    });
    
    myTable += `</tbody>
        </table>
    </div> `;
    $("#informe").html(myTable);
}

function getClientes(){
    $.ajax({
        url:"http://130.162.44.50:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarClients(respuesta);
        }
    });
}

function pintarClients(respuesta){
    $("#informe").html("");
    let myTable = `<div class="w-full my-10">
    <table class="w-4/5 text-sm text-center text-gray-500 dark:text-gray-400 m-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Total
                </th>
                <th scope="col" class="py-3 px-6">
                    Cliente
                </th>
            </tr>
        </thead>
            <tbody>`
    respuesta.forEach(registro => {
        myTable += ` <tr>
        <td>${registro.total}</td>
        <td>${registro.client.name}</td>
        </tr>`
    });
    
    myTable += `</tbody>
        </table>
    </div> `;
    $("#informe").html(myTable);
}