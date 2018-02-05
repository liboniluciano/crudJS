window.onload = function () {
    AtualizarPessoas(pessoas);
    get("divGrid").style.display = "none";
    get("divCadastroEdicao").style.display = "none";
    
}

var storagePessoa = localStorage.getItem("tbPessoas");

$("#txtValorPesq").maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});

var pessoas = !storagePessoa ? [] : JSON.parse(storagePessoa);
var salvarEditar = "";

function get(id) {
    return document.getElementById(id)
}

function adicionarPessoa() {
    get("divCadastroEdicao").style.display = "block";
    salvarEditar = "I"
    limpaCampos();
}

function salvarPessoa() {

    var pessoa = {
        CPF: get("txtCPFIns").value,
        Nome: get("txtNomeIns").value
    };

    if (salvarEditar != "E") {
        pessoas.push(pessoa);
        localStorage.setItem("tbPessoas", JSON.stringify(pessoas));
    }

    else {

        pessoas[indexUsuarioSelecionado].CPF = pessoa.CPF;
        pessoas[indexUsuarioSelecionado].Nome = pessoa.Nome;
        localStorage.setItem("tbPessoas", JSON.stringify(pessoas));
    }

    AtualizarPessoas(pessoas);
    get("divCadastroEdicao").style.display = "none";
}

function AtualizarPessoas(pessoas) {
    var table = get("tbGrid");
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = "";
    get("divGrid").style.display = "block";

    for (var i = 0; i < pessoas.length; i++) {
        var element = pessoas[i];

        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = element.CPF;
        cell2.innerHTML = element.Nome;

        //Cria botão excluir
        var btnExcluir = document.createElement("button");
        btnExcluir.setAttribute("type", "button");
        btnExcluir.name = "btnExcluir";
        btnExcluir.setAttribute("onclick", "excluir(" + i + ")");
        btnExcluir.appendChild(document.createTextNode('Excluir'));
        cell3.appendChild(btnExcluir);

        // " + element.CPF  + "
        //Cria botão editar
        var btnEditar = document.createElement("button");
        btnEditar.setAttribute("type", "button");
        btnEditar.setAttribute("onclick", "exibeUsuario(" + i + ")");
        btnEditar.name = "btnExcluir";
        btnEditar.appendChild(document.createTextNode('Editar'));
        cell4.appendChild(btnEditar);
    }

}

function excluir(index) {
    get("divCadastroEdicao").style.display = "none";
    if (!confirm("Deseja realmente excluir?"))
        return false;
    pessoas.splice(index, 1);
    localStorage.setItem("tbPessoas", JSON.stringify(pessoas));
    AtualizarPessoas(pessoas);
}

var indexUsuarioSelecionado;

function exibeUsuario(index) {
    indexUsuarioSelecionado = index;
    salvarEditar = "E";
    get("txtCPFIns").value = pessoas[index].CPF;
    get("txtNomeIns").value = pessoas[index].Nome;
    get("divCadastroEdicao").style.display = "block";
}

function buscar() {
    debugger;
    var cpf = get("txtCPFp").value;
    if (cpf.length == "") {
        AtualizarPessoas(pessoas);
        return;
    }
    get("divCadastroEdicao").style.display = "none";

    document.querySelectorAll("#tbGrid tbody tr").forEach(function (tr) {
       
        
        if (tr.childNodes[0].innerHTML != cpf)
            tr.style.display = "none";
        else
            tr.style.display = "table-row";

    });
    get("divGrid").style.display = "block";

}

function cancelar() {
    get("divCadastroEdicao").style.display = "none";
}

function limpaCampos() {
    get("txtCPFIns").value = "";
    get("txtNomeIns").value = "";
}

