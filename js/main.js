const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento); 
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const sobrenome = evento.target.elements['sobrenome'];
    const cpf = evento.target.elements['cpf'];

    const existe = itens.find(elemento => elemento.nome === nome.value);
    
    const itemAtual = {
        "nome": nome.value,
        "sobrenome": sobrenome.value,
        "cpf": cpf.value
    }

    if(existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        
        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));
    console.log(localStorage.getItem('itens'));

    nome.value = '';
    sobrenome.value = '';
    cpf.value = '';

});

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.dataset.id = item.id;
    // numeroItem.innerHTML = item.sobrenome;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += 'Nome: ' + item.nome + ', '; 
    novoItem.innerHTML += 'Sobrenome: ' + item.sobrenome + ', '; 
    novoItem.innerHTML += 'CPF: ' + item.cpf + ' ';

    novoItem.appendChild(botaoDelete(item.id));
    
    lista.appendChild(novoItem);

};

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.sobrenome;
}

function botaoDelete(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}