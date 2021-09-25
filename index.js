var count = 2;
var nomor = 0;
        function onDocumentFinish(){
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
                        editCol.innerHTML = `<button class="editbutton">EDIT</button> || <button class="deletebutton">DELETE</button>`;
                        editCol.type = "submit";
                        editCol.name = "formbtn";
                        editCol.appendChild(document.createTextNode(this.edit));

                        newRow.appendChild(nomorCol);
                        newRow.appendChild(makananCol);
                        newRow.appendChild(editCol);
                        tbody.appendChild(newRow);
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