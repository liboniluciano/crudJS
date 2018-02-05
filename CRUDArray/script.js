window.onload = function () {

    document.getElementById("divGrid").style.display = "none";
    document.getElementById("divCadastroEdicao").style.display = "none";
}

var pessoas = [];
var salvarEditar = "";

function get(id){
    return document.getElementById(id)
}

function adicionarPessoa() {
    get("divCadastroEdicao").style.display = "block";
    limpaCampos();
}

function salvarPessoa() {
    var cpf = get("txtCPFIns").value;
    var nome = get("txtNomeIns").value;

    if (salvarEditar != "E") 
        pessoas.push({ CPF: cpf, Nome: nome });
     else {
        pessoas[indexUsuarioSelecionado].CPF = cpf;
        pessoas[indexUsuarioSelecionado].Nome = nome;
    }

    AtualizarPessoas(pessoas);
    get("divCadastroEdicao").style.display = "none";
}

function AtualizarPessoas(pessoas) {
    var table = get("tbGrid");
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = "";

    for (var i = 0; i < pessoas.length; i++) {
        var element = pessoas[i];
        get("divGrid").style.display = "block";
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
    if (!confirm("Deseja realmente excluir?"))
        return false;

    pessoas.splice(index, 1);
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
    var cpf = get("txtCPFp").value;
    if (cpf.length == "") {
        AtualizarPessoas(pessoas);
        return;        
    }

    document.querySelectorAll("#tbGrid tbody tr").forEach(function(tr){
        
        if(tr.childNodes[0].innerHTML != cpf)
            tr.style.display = "none";
        else
            tr.style.display = "table-row";
        
    })
    get("divGrid").style.display = "block";

}
function cancelar(){
    get("divCadastroEdicao").style.display = "none";
}

function limpaCampos() {
    get("txtCPFIns").value = "";
    get("txtNomeIns").value = "";
}

