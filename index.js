var count = 2;
var nomor = 0;
        function onDocumentFinish(){
            document.getElementById('formSubmit').onsubmit = function(form){
                form.preventDefault();
                let item = {
                    nomor:'',
                    makanan: '',
                    tombol:'',
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
                        const tombolCol = document.createElement('td');
                        tombolCol.appendChild(document.createTextNode(this.tombol));
                        newRow.appendChild(nomorCol);
                        newRow.appendChild(makananCol);
                        newRow.appendChild(tombolCol);
                        tbody.appendChild(newRow);
                        // console.log(nomorCol);
                        // console.log(makananCol);

                    },
                    fillProperty: function(dataSource){
                        nomor = nomor+1;
                        item.nomor = nomor;
                        item.makanan = dataSource.target['addMenu'].value;
                        item.tombol = ;
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