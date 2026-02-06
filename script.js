const horariosOcupados = [];

const duracaoServico = {
  "Escova": 60,
  "Selagem": 180,
  "Mechas": 240,
  "Cílios": 120,
  "Sobrancelhas": 60,
  "Micropigmentação": 120,
  "Penteado": 90
};

function agendar() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const inicio = new Date(`${data}T${hora}`);
  const fim = new Date(inicio.getTime() + duracaoServico[servico] * 60000);

  for (let h of horariosOcupados) {
    if (inicio < h.fim && fim > h.inicio) {
      alert("Horário indisponível");
      return;
    }
  }

  horariosOcupados.push({ inicio, fim });
  atualizarAgenda(inicio, fim, servico);

  const formatar = d => d.toISOString().replace(/-|:|\.\d+/g, "");

  window.open(
    `https://www.google.com/calendar/render?action=TEMPLATE&text=Studio+Amanda+-+${servico}&dates=${formatar(inicio)}/${formatar(fim)}`,
    "_blank"
  );

  window.open(
    `https://wa.me/5583996503562?text=Olá,+me+chamo+${nome}+e+quero+agendar+${servico}+em+${data}+às+${hora}`,
    "_blank"
  );
}

function atualizarAgenda(inicio, fim, servico) {
  const li = document.createElement("li");
  li.textContent = `${servico} | ${inicio.toLocaleString()} - ${fim.toLocaleTimeString()}`;
  document.getElementById("agendaLista").appendChild(li);
}
