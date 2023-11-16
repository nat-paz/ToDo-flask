const tabela = document.querySelector(".tabela-js");

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
                <td><button class="btn bg-white" type="button" data-bs-toggle="modal" data-bs-target="#modalDel"><span class="material-symbols-outlined text-danger">
                delete
                </span></button> <button class="btn bg-white" type="button" data-bs-toggle="modal" data-bs-target="#modalEdit"><span class="material-symbols-outlined text-success">
                edit
                </span></button></td>
            </tr>
            `
        })
    }
