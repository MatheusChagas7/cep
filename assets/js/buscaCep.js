function buscaCep(){
    const inputCep = document.getElementById('inputCep');
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
                document.getElementById('cep').textContent = data.cep;
                document.getElementById('logradouro').textContent = data.logradouro;
                document.getElementById('bairro').textContent = data.bairro;
                document.getElementById('cidade').textContent = `${data.localidade}/${data.uf}`
            }
        })
        .catch(error => {
            console.error('Errou ao buscar CEP', error);
            alert('Ocorreu um erro ao consultar o CEP. Tente novamente!')
        });
}