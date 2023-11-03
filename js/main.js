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
        
        const index = document.getElementById('nome').dataset.index;
        if(index == 'new') {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
            criaElemento(itemAtual); 
            itens.push(itemAtual);
        } else {
            editaElemento(index, itemAtual);
            atualizaElemento(itemAtual);
        }
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

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += 'Nome: ' + item.nome + ', '; 
    novoItem.innerHTML += 'Sobrenome: ' + item.sobrenome + ', '; 
    novoItem.innerHTML += 'CPF: ' + item.cpf + ' ';

    novoItem.appendChild(botaoDelete(item.id));
    novoItem.appendChild(botaoEdit(item.id));
    
    lista.appendChild(novoItem);

};

function atualizaElemento(item) {
    const elemento = document.querySelector("[data-id='" + item.id + "']");
    if (elemento) {
        elemento.innerHTML = 'Nome: ' + item.nome + ', Sobrenome: ' + item.sobrenome + ', CPF: ' + item.cpf;
    }
}


function botaoDelete(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.classList.add('botaoDeleta');
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

function botaoEdit(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.classList.add('botaoAltera');
    elementoBotao.innerText = "Editar";

    elementoBotao.addEventListener('click', function () {
        edita(id);
    });

    return elementoBotao;
}

function edita(id) {
    const pessoa = itens.find(elemento => elemento.id === id);
    preencherCampos(pessoa);
    form.dataset.index = id; // Defina um identificador para o formulário
}

function editaElemento(id, dados) {
    const dadosSalvos = JSON.parse(localStorage.getItem('itens'));

    dadosSalvos[id] = dados;

    localStorage.setItem('itens', JSON.stringify(dadosSalvos));
}

function preencherCampos(pessoa) {
    const nomeInput = document.querySelector('#nome');
    const sobrenomeInput = document.querySelector('#sobrenome');
    const cpfInput = document.querySelector('#cpf');

    nomeInput.value = pessoa.nome;
    sobrenomeInput.value = pessoa.sobrenome;
    cpfInput.value = pessoa.cpf;
}

function atualizaItemNaLista(item) {
    const elemento = document.querySelector("[data-id='" + item.id + "']");
    if (elemento) {
        elemento.innerHTML = 'Nome: ' + item.nome + ', Sobrenome: ' + item.sobrenome + ', CPF: ' + item.cpf;
    }
}

function limpaCamposDoFormulario() {
    const nomeInput = document.querySelector('#nome');
    const sobrenomeInput = document.querySelector('#sobrenome');
    const cpfInput = document.querySelector('#cpf');

    nomeInput.value = '';
    sobrenomeInput.value = '';
    cpfInput.value = '';
}