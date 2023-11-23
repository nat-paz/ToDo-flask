const tabela = document.querySelector(".tabela-js");
const from = document.querySelector(".form-js")

axios.get('http://127.0.0.1:5000/list').then((response) => {
        getData(response.data);
    })

    .catch(function(error){
        console.log(error);
    })

    function getData(data){
        data.map((item)=>{
            tabela.innerHTML += ` 
            <tr>
                <th scope="row">${item.ID}</th>
                <td>${item.TAREFA}</td>
                <td><span class="material-symbols-outlined text-danger" type="button" data-bs-toggle="modal" data-bs-target="#modalDel" onclick="excluir(${item.ID})">
                delete
                </span><span class="material-symbols-outlined text-success" type="button" data-bs-toggle="modal" data-bs-target="#modalEdit" onclick="update('${item.TAREFA}')">
                edit
                </span></td>
            </tr>
            `
        })
    }

    function add() {
        const tarefaN = document.getElementById("tarefaN").value;

        if(tarefaN.trim() !== ""){
            
    
            const Tarefa = {
                Tarefa: tarefaN,
            };
        
            axios.post('http://127.0.0.1:5000/add', Tarefa)
                .then(response => {
                    console.log('Resposta do servidor:', response.data.Tarefa);
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
        }
        else{
            alert("Insira uma tarefa valida")
        }
    }

    from.addEventListener("submit", function (event) {
        event.preventDefault(); 
        add();
    });

    function excluir(id) {
        const btn = document.getElementById("btnS");

        btn.addEventListener("click", function () {
            axios.delete(`http://127.0.0.1:5000/delete/${id}`)
                .then((response) => {
                    console.log('Resposta do servidor:', response.data);
                })
                .catch((error) => {
                    console.error('Erro na requisição DELETE:', error);
                });
        })
    }

    function update(tarefa_antiga) {
        const btn = document.getElementById("salvar");
    
        btn.addEventListener("click", function () {
            const tarefa_nova = document.getElementById("tarefaUP").value;
    
            if (tarefa_nova.trim() !== "") {
    
                axios.put(`http://127.0.0.1:5000/update/${tarefa_antiga}/${tarefa_nova}`)
                    .then(response => {
                        console.log('Resposta do servidor:', response.data.Tarefa);
                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });
            }
        });
    }