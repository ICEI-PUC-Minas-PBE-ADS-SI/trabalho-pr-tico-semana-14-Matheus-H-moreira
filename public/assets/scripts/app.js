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

const apiUrl = '/pratos'

function displayMessage(mensagem){
    const msg = document.getElementById('msg')
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>'
}

function readPratos(processaDados){
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

function criarPrato(prato, refreshFunction){
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
            if(refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao inserir prato via API JSONServer: ", error)
            displayMessage("Erro ao inserir prato")
        })
}

function updatePrato(id, prato, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language' : 'pt-br',
            'Accept': 'text/json',
        },
        body: JSON.stringify(prato)
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Prato alterado com sucesso")
            if(refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao atualizar prato via API JSONServer: ", error)
            displayMessage("Erro ao atualizar prato")
        })
}

function deletePrato(id, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Prato removido com sucesso")
            if(refreshFunction)
                refreshFunction()
        })
        .catch(error => {
            console.error("Erro ao deletar prato via API JSONServer: ", error)
            displayMessage("Erro ao deletar prato")
        })
}