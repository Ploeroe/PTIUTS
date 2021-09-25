var selectedRow = null

//generate tabel dari JSON
function rendertabelmahasiswa(dataawal){
    let index = 0;
    let tbody = document.getElementById("studentlist").querySelector('tbody');
    tbody.innerHTML = '';
    for(index = 0; index < dataawal.length; index++){
        let colno = '<td>'+dataawal[index].no+'</td>';
        let colmakanan = '<td>'+dataawal[index].makanan+'</td>';
        let doublebutton = '<td> <button onClick="ModalEdit(this);" class="editbutton">Edit</button><br><button onClick="Delete(this);alertDelete()" class="deletebutton">Delete</button>';

        let barisbaru = '<tr>'+colno+colmakanan+doublebutton+'</tr>';
        tbody.innerHTML += barisbaru;
    }
}

//memanggil file JSON
function onDocFinish(){
    loadfirstdata();
}

function loadfirstdata(){
    let request = new XMLHttpRequest();
    request.open('GET','first.json', true);

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let dataawal = JSON.parse(request.responseText);
            console.log(dataawal);
            rendertabelmahasiswa(dataawal);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send();
}

//menentukan untuk masuk ke update data atau insert new data
function onModalSubmit(){
    if(validatemodalbox()){
        var formData = readEditData();
    if(selectedRow==null)
        insertNewData(formData);
        else
        updateData(formData);
    }
}

function onFormSubmit(){
    if (validate()){
        var formData = readFormData();
    if(selectedRow==null)
        insertNewData(formData);
        else
        updateEditData(formData);

    clearForm();
    }
}

//read untuk submit form
function readFormData(){
    var formData = {};
    formData["no"] = document.getElementById("no").value;
    formData["makanan"] = document.getElementById("makanan").value;
    return formData
}

//read data untuk modal box
function readEditData(){
    var formData = {};
    formData["no"] = document.getElementById("no").value;
    formData["makanan"] = document.getElementById("makanan").value;
    return formData
}

//memasukkan data baru ke tabel
function insertNewData(data){
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newrow = table.insertRow(table.length);
    cell1 = newrow.insertCell(0);
    cell1.innerHTML = data.no;
    cell2 = newrow.insertCell(1);
    cell2.innerHTML = data.makanan;
    cell3.innerHTML = `<button onClick="ModalEdit(this)" class="editbutton">Edit</button><br>
                       <button onClick="Delete(this);alertDelete()" class="deletebutton">Delete</button>`;
}

//membersihkan form
function clearForm(){
    document.getElementById("no").value = "";
    document.getElementById("makanan").value = "";
}

//memasukkan data ke modal box
function ModalEdit(td){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.add('boxactive');
    document.getElementById("modalbox").style.display="inline-flex";
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow);
    document.getElementById("no").value = selectedRow.cells[0].innerHTML;
    document.getElementById("makanan").value = selectedRow.cells[1].innerHTML;
}

function updateData(formData){
    selectedRow.cells[0].innerHTML = formData.no;
    selectedRow.cells[1].innerHTML = formData.makanan;
}

function updateEditData(formData){
    selectedRow.cells[0].innerHTML = formData.no;
    selectedRow.cells[1].innerHTML = formData.makanan;
}

//menghapus data
function Delete(td){
    if(confirm('Hapus data ini ?')){
        row = td.parentElement.parentElement;
        document.getElementById("studentlist").deleteRow(row.rowIndex);
        clearForm();
    } 
}

//validasi form submit
function validate() {
    isValid = true;
    if (document.getElementById("no").value == ""||document.getElementById("makanan").value  == "") {
        isValid = false;
        alert("Semua Data Wajib Diisi");
        insfailalert();
    } else {
        isValid = true;
        insalert();
    }
    return isValid;
}


//validasi form modal box
function validatemodalbox() {
    isValid = true;
    if (document.getElementById("no").value == ""|| document.getElementById("makanan").value == "") {
        isValid = false;
        alert("Semua Data Wajib Diisi");
        editfailalert();
    } else {
        isValid = true;
        editalert();
    }
    return isValid;
}

//show modalbox
function modalclose(){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.remove('boxactive');
}

//close modalbox
var closemodalbox = document.querySelector('.closemodal');

closemodalbox.addEventListener('click',function(){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.remove('boxactive');
})

//show alert"
function alertDelete(){
    var delalert = document.querySelector('.alertdelete');
    delalert.classList.add('boxactive');
}

function editalert(){
    var edalert = document.querySelector('.alertedit');
    edalert.classList.add('boxactive');
}

function editfailalert(){
    var edfalert = document.querySelector('.alertfailedit');
    edfalert.classList.add('boxactive');
}

function insalert(){
    var inalert = document.querySelector('.alertins');
    inalert.classList.add('boxactive');
}

function insfailalert(){
    var infalert = document.querySelector('.alertinsfail');
    infalert.classList.add('boxactive');
}

//hide alert"
var closedelalertbox = document.querySelector('.closedelalert');

closedelalertbox.addEventListener('click',function(){
    var delalert = document.querySelector('.alertdelete');
    delalert.classList.remove('boxactive');
})

var closealertbox = document.querySelector('.closeedalert');

closealertbox.addEventListener('click',function(){
    var edalert = document.querySelector('.alertedit');
    edalert.classList.remove('boxactive');
})

var closeedfalertbox = document.querySelector('.closeedfailalert');

closeedfalertbox.addEventListener('click',function(){
    var edfalert = document.querySelector('.alertfailedit');
    edfalert.classList.remove('boxactive');
})

var closeinsalertbox = document.querySelector('.closeinsalert');

closeinsalertbox.addEventListener('click',function(){
    var inalert = document.querySelector('.alertins');
    inalert.classList.remove('boxactive');
})

var closeinsfailalertbox = document.querySelector('.closeinsfailalert');

closeinsfailalertbox.addEventListener('click',function(){
    var infalert = document.querySelector('.alertinsfail');
    infalert.classList.remove('boxactive');
})