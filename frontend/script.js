// URL base do back-end
const BASE_URL = "http://localhost:8080/api";

if (window.location.pathname.endsWith("login.html")) {
  const etapa = localStorage.getItem('etapa');

  if (etapa === "ofertas") {
    window.location.href = "ofertas.html";
  } else if (etapa === "contratar") {
    window.location.href = "contratar.html";
  }
}


// Página 1: Envia os dados do cliente
if (document.getElementById('form-analise')) {
  document.getElementById('form-analise').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const renda = parseFloat(document.getElementById('renda').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Salva local para usar nas outras páginas
    localStorage.setItem('cpf', cpf);


    const response = await fetch(`${BASE_URL}/analise`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, renda, valorDesejado: valor })
    });

    const status = await response.text();
    if (status === "PRE_APROVADO") {
      localStorage.setItem('etapa', 'carregando');    
      window.location.href = "carregando.html";
    }
  });
}

// Página 2: Carrega ofertas disponíveis
if (document.getElementById('ofertas-container')) {
  fetch(`${BASE_URL}/ofertas`)
    .then(res => res.json())
    .then(ofertas => {
      const container = document.getElementById('ofertas-container');
      ofertas.forEach((oferta, index) => {
        const div = document.createElement('div');
        div.className = "border border-red-300 rounded-xl p-4 shadow-sm";
        div.innerHTML = `
          <strong class="text-red-700 text-lg">${oferta.banco}</strong><br>
          Valor: R$ ${oferta.valor} <br>
          Parcelas: ${oferta.parcelas} <br>
          Juros: ${oferta.jurosMensal}% ao mês<br>
          <button onclick="selecionarOferta(${index})" class="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow">
            Selecionar
          </button>
        `;
        container.appendChild(div);
      });      
      localStorage.setItem('etapa', 'ofertas');
      localStorage.setItem('ofertas', JSON.stringify(ofertas));
    });
}

function selecionarOferta(index) {
  const ofertas = JSON.parse(localStorage.getItem('ofertas'));
  const oferta = ofertas[index];
  localStorage.setItem('ofertaSelecionada', JSON.stringify(oferta));
  localStorage.setItem('etapa', 'contratar');
  window.location.href = "contratar.html";
}

// Página 3: Contratar oferta
if (document.getElementById('form-contratar')) {
  document.getElementById('form-contratar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dadosBancarios = document.getElementById('dadosBancarios').value;
    const file = document.getElementById('documento').files[0];

    const reader = new FileReader();
    reader.onload = async function () {
      const documentoBase64 = reader.result.split(',')[1]; // remove metadata
      const oferta = JSON.parse(localStorage.getItem('ofertaSelecionada'));
      const cpf = localStorage.getItem('cpf');

      if (!oferta) {
        alert("Erro: Nenhuma oferta foi selecionada.");
        return;
      }


      const response = await fetch(`${BASE_URL}/contratar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf,
          banco: oferta.banco,
          valor: oferta.valor,
          parcelas: oferta.parcelas,
          documentoBase64,
          dadosBancarios
        })
      });

      const result = await response.text();
      if (result === "CONTRATO_REALIZADO") {
        localStorage.clear();
        window.location.href = "finalizacao.html";
      }
    };

    reader.readAsDataURL(file);
  });
}
