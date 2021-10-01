var count = 2;
var nomor = 0;
var menu;
const renderPosts = (posts) => {
    var output = "";
    $(".tabelmakanan tr").remove()

    // set data ke local storage
    let myObj_serialized = JSON.stringify(posts);
    localStorage.setItem("myObj", myObj_serialized);
    console.log(localStorage);

    posts.forEach((post,index)=>{
        output += 
          `<tr>
            <td>${index+1}</td>
            <td>${post.makanan}</td>
            <td><button onClick="productEdit(this)" data-id="${post.id}" class="editbutton">EDIT</button> || <button onClick="productDelete(this)" data-id="${post.id}" class="deletebutton">DELETE</button></td>
          </tr>`
        ;
    });
    $(".tabelmakanan").append(output);

    // datalokal(post);
}

        function onDocumentFinish(){
            const tabelmakanan = $(".tabelmakanan") 


            fetch("menu.json")
                .then(response => response.json())
                .then(data => {
                    menu = data
                    renderPosts(data)
                    console.log(output)
                })
            

            document.getElementById('formSubmit').onsubmit = function(form){
                form.preventDefault();
                let item = {
                    nomor:'',
                    makanan: '',
                    edit:'',
                    isItemValid: function(){
                        if(this.makanan !== ''){
                            return true;
                        }
                        return false;
                    },
                    addToTable: function(){
                        const tbody = document.getElementById('tableItem').querySelector('tbody');
                        const newRow = document.createElement('tr');
                        const nomorCol = document.createElement("td");
                        nomorCol.appendChild(document.createTextNode(this.nomor));
                        const makananCol = document.createElement('td');
                        makananCol.appendChild(document.createTextNode(this.makanan));

                        const editCol = document.createElement("td");
                        editCol.innerHTML = `<button onClick="productEdit(this)" class="editbutton">EDIT</button> || <button onClick="productDelete(this)" class="deletebutton">DELETE</button>`;
                        editCol.type = "submit";
                        editCol.name = "formbtn";
                        editCol.appendChild(document.createTextNode(this.edit));

                        newRow.appendChild(nomorCol);
                        newRow.appendChild(makananCol);
                        newRow.appendChild(editCol);
                        menu.push({id:menu.length+1,makanan:this.makanan})
                        renderPosts(menu)
                        // tbody.appendChild(newRow);
                        // console.log(nomorCol);
                        // console.log(makananCol);

                    },
                    fillProperty: function(dataSource){
                        nomor = nomor+1;
                        item.nomor = nomor;
                        item.makanan = dataSource.target['addMenu'].value;
                        // item.edit = '';
                        // console.log(nomor);
                        // console.log(addMenu);
                    }
                }
                item.fillProperty(form);
                if(item.isItemValid()){
                    document.getElementById("formSubmit").reset();
                    item.addToTable();
                }
                else{
                    alert('All fields must not empty');
                }
            }
        }

        function productDelete(r){
            if(confirm('Hapus data ini ?')){
                var i = $(r).data().id
                menu = menu.filter(item => item.id !== i)
                renderPosts(menu)
                console.log($(r).data().id)
                
            } 
        }

        function productEdit(r){
            if(confirm('Edit data ini ?')){
                var updatemakanan = window.prompt("Nama makanan baru ?");
                var i = $(r).data().id
                var itemindex = menu.findIndex(item => item.id === i)
                menu[itemindex].makanan = updatemakanan
                renderPosts(menu) 
                console.log(itemindex)
                // var i = r.parentNode.parentNode.rowIndex;
                // document.getElementById("tableItem").deleteRow(i);
            } 
        }

        function randomize(){
            let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));

            var randomItem1 =
            myObj_deserialized[Math.floor(Math.random()*myObj_deserialized.length)];
            console.log(myObj_deserialized)
            var randomItem2 =
            myObj_deserialized[Math.floor(Math.random()*myObj_deserialized.length)];
            console.log(myObj_deserialized)
            while (randomItem1 == randomItem2 || randomItem1 == randomItem3 || randomItem2 == randomItem3){
                var randomItem2 =
                myObj_deserialized[Math.floor(Math.random()*myObj_deserialized.length)];
                console.log(myObj_deserialized)
            }
            var randomItem3 =
            myObj_deserialized[Math.floor(Math.random()*myObj_deserialized.length)];
            console.log(myObj_deserialized)
            while (randomItem1 == randomItem2 || randomItem1 == randomItem3 || randomItem2 == randomItem3){
                var randomItem3 =
                myObj_deserialized[Math.floor(Math.random()*myObj_deserialized.length)];
                console.log(myObj_deserialized)
            }
            // let randomItembr = JSON.parse(randomItem);
            document.getElementById("breakfast").innerHTML = "Breakfast    : " + randomItem1.makanan;
            document.getElementById("lunch").innerHTML = "Lunch        : " + randomItem2.makanan;
            document.getElementById("dinner").innerHTML = "Dinner       : " + randomItem3.makanan;


        }