//Parte da página detalhes.html
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card')

    cards.forEach((card) => {
        card.style.cursor = 'pointer'
        card.addEventListener('click', () => {
            const id = card.getAttribute('id')
            window.location.href = `detalhes.html?id=${id}`

        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const imagensCarrossel = document.querySelectorAll('#carouselExampleIndicators .carousel-item img')

    imagensCarrossel.forEach((img) => {
        img.style.cursor = 'pointer'
        img.addEventListener('click', function () {
            const id = img.id;
            window.location.href = `detalhes.html?id=${id}`
        });
    });
});


//Parte da página cadastro.html
const apiUrl = '/pratos'

document.getElementById('botaoMostrar').addEventListener('click', handleMostrar)
function handleMostrar() {
    readPratos((dados) => {
        const resultado = document.getElementById('resultadoPesquisa')
        resultado.style.display = 'block'
        resultado.innerHTML = '<h3>Pratos cadastrados: </h3>'
        dados.forEach(p => {
            resultado.innerHTML += `<p><strong>ID:</strong> ${p.id} | <strong>Título:</strong> ${p.titulo}</p>`
        })
    })
}

function readPratos(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data)
        })
        .catch(error => {
            console.error('Erro ao ler pratos via API JSONServer: ', error)
            displayMessage("Erro ao ler pratos")
        })
}

document.getElementById('botaoInserir').addEventListener('click', handleInserir)
function handleInserir() {
    const prato = {
        id: document.getElementById('cadastroID').value,
        titulo: document.getElementById('cadastroTitulo').value,
        descricao: document.getElementById('cadastroDescricao').value,
        ingredientes: document.getElementById('cadastroIngredientes').value.split(',').map(i => i.trim()),
        categoria: document.getElementById('cadastroCategoria').value,
        autor: document.getElementById('cadastroAutor').value,
        data: document.getElementById('cadastroData').value,
        tempoPreparo: document.getElementById('cadastroTempoPreparo').value,
        imagem: 'assets/imagens/default.jpg'
    }
    criarPrato(prato)
}

function criarPrato(prato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prato)
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Prato inserido com sucesso")
            if (refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao inserir prato via API JSONServer: ", error)
            displayMessage("Erro ao inserir prato")
        })
}

document.getElementById('botaoAlterar').addEventListener('click', handleAlterar)
function handleAlterar() {
    const id = document.getElementById('cadastroID').value
    const prato = {
        id: document.getElementById('cadastroID').value,
        titulo: document.getElementById('cadastroTitulo').value,
        descricao: document.getElementById('cadastroDescricao').value,
        ingredientes: document.getElementById('cadastroIngredientes').value.split(',').map(i => i.trim()),
        categoria: document.getElementById('cadastroCategoria').value,
        autor: document.getElementById('cadastroAutor').value,
        data: document.getElementById('cadastroData').value,
        tempoPreparo: document.getElementById('cadastroTempoPreparo').value,
        imagem: 'assets/imagens/default.jpg'
    }
    updatePrato(id, prato)
}

function updatePrato(id, prato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'pt-br',
            'Accept': 'text/json',
        },
        body: JSON.stringify(prato)
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Prato alterado com sucesso")
            if (refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao atualizar prato via API JSONServer: ", error)
            displayMessage("Erro ao atualizar prato")
        })
}

document.getElementById('botaoDelete').addEventListener('click', handleExcluir)
function handleExcluir() {
    const id = document.getElementById('cadastroID').value
    if (!id) {
        displayMessage("Informe o ID para excluir")
        return
    }
    deletePrato(id)
}

function deletePrato(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Prato removido com sucesso")
            if (refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao deletar prato via API JSONServer: ", error)
            displayMessage("Erro ao deletar prato")
        })
}

document.getElementById('botaoLimpar').addEventListener('click', limparFormulario)
function limparFormulario() {
    document.getElementById('cadastroID').value = ''
    document.getElementById('cadastroTitulo').value = ''
    document.getElementById('cadastroDescricao').value = ''
    document.getElementById('cadastroIngredientes').value = ''
    document.getElementById('cadastroCategoria').value = ''
    document.getElementById('cadastroAutor').value = ''
    document.getElementById('cadastroData').value = ''
    document.getElementById('cadastroTempoPreparo').value = ''
    document.getElementById('imagem').value = ''
}

function displayMessage(mensagem) {
    const msg = document.getElementById('msg')
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>'
}


