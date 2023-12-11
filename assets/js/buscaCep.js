function buscaCep(){

    const inputCep = document.getElementById('inputCep');
    const container = document.getElementById('principal');
    const retorno = document.getElementById('retorno');

    const cep = inputCep.value.replace(/\D/g, ''); // Remover caracteres não númericos

    if(cep.length !==8){
        alert('Digite um CEP válido (8 dígitos).')
        return;
    }

    const webCep = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(webCep)
        .then(response => response.json())
        .then(data => {
            if(data.erro){
                alert('CEP não encontrado. Tente novamente!');
            }else{
                retorno.classList.remove('hidden');
                retorno.classList.add('dados');
                container.classList.add('hidden');
                container.classList.remove('container');
                document.getElementById('cep').textContent = data.cep;
                document.getElementById('logradouro').textContent = data.logradouro;
                document.getElementById('bairro').textContent = data.bairro;
                document.getElementById('cidade').textContent = `${data.localidade}/${data.uf}`
                inputCep.value = ''
            }
        })
        .catch(error => {
            console.error('Errou ao buscar CEP', error);
            alert('Ocorreu um erro ao consultar o CEP. Tente novamente!')
        });

}

function voltar(){

    const container = document.getElementById('principal');
    container.classList.remove('hidden');
    container.classList.add('container');

    const retorno = document.getElementById('retorno');
    
    retorno.classList.remove('dados');
    retorno.classList.add('hidden');
}