export async function verificarLicenca(numeroTelefone) {
  const spreadsheetId = "1UXDtX9yV9T6VFoubyD4Nn1XVwgTXXzJSz7oYF1Cbg2E";
  const apiKey = "AIzaSyCYClhZTenoQMXpRdIv5f6a0S22-0mppqQ";
  const range = "Clientes!A:D"; // nome da aba + intervalo de colunas

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length < 2) {
      return { autorizado: false, motivo: "Planilha sem dados válidos." };
    }

    const linhas = data.values.slice(1); // remove cabeçalho

    const cliente = linhas.find(linha => linha[0] === numeroTelefone);

    if (!cliente) {
      return { autorizado: false, motivo: "Telefone não encontrado." };
    }

    const [telefone, nome, dataVencimento, status] = cliente;
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);

    if (status.toLowerCase() !== "ativo") {
      return { autorizado: false, motivo: "Usuário inativo." };
    }

    if (hoje > vencimento) {
      return { autorizado: false, motivo: "Licença vencida." };
    }

    return { autorizado: true, nome };
  } catch (err) {
    console.error("Erro ao consultar a planilha:", err);
    return { autorizado: false, motivo: "Erro de comunicação com o servidor." };
  }
}
