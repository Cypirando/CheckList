const addItems = document.querySelector('#novoItem');
const itemList = document.querySelector('#lista');
const items = JSON.parse(localStorage.getItem('items')) || [];

function adicionaItem(elemento) {
    // para de enviar arquivos para a pagina
    elemento.preventDefault();
    const texto = (this.querySelector('[name=item]')).value;
    const itemAtual = {
        texto,
        status: "checando",
        
    };
    items.push(itemAtual);
    preencherLista(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function preencherLista(tarefas = [], condicao) {
    condicao.innerHTML = tarefas.map((tarefa, i) => {
        
        return `                   
                    <div class="row" id="pai${i}">
                    <div class="col-md-5 py-2 item6">
                        
                        <label for="item${i}" id="value${i}">${tarefa.texto}</label>
                        
                    </div>
                    <div class="col-md-2 py-2 item7 text-center id="div1" ">
                        
                        <input type="checkbox" data-index=${i} id="checando:${i}"  ${tarefa.status === "checando" ? 'checked' : ''} >
                    
                    </div> 
                    <div class="col-md-2 py-2 item8 text-center ">
                    
                        <input type="checkbox" data-index=${i} id="andamento:${i}" ${tarefa.status === "andamento" ? 'checked' : ''} >
                    
                    </div> 
                    <div class="col-md-2 py-2 item9 text-center ">

                        <input type="checkbox" data-index=${i} id="feito:${i}" ${tarefa.status === "feito" ? 'checked' : ''} >
                    
                    </div> 
                    <div class="col-md-1 item0">
                        
                        <div class="text-center py-2 btnDelet" data-index=${i} onclick="deletar(document.getElementById('pai${i}'), '${tarefa.texto}')">X</div>
                    
                    </div>  
                    </div>          
		        `;
    }).join('');
}

function alternar(e) {
    if (!e.target.matches('input')) return;
    const index = e.target.dataset.index;
    items[index].status = e.target.id.split(":")[0];
    localStorage.setItem('items', JSON.stringify(items));
    preencherLista(items, itemList);
}

addItems.addEventListener('submit', adicionaItem);
itemList.addEventListener('click', alternar);
preencherLista(items, itemList);

function deletar(id, value){
    let items = JSON.parse(localStorage.getItem('items'))
    for(let i = 0; i < items.length; i++) {
        console.log(items)
        if(items[i].texto === value) {
            items.splice(i, 1); 
        }
    }
    localStorage.setItem('items', JSON.stringify(items));
    id.remove()
}

