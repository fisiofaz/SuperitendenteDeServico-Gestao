import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const gerarPDF_S13 = (territorio, historico) => {
  const doc = new jsPDF();
  const dataGeracao = new Date().toLocaleDateString('pt-BR');

  // Configuração de Estilo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("REGISTRO DE TERRITÓRIO (S-13)", 14, 15);
  
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138); // Azul Marinho Profissional
  doc.text(`CARTÃO Nº ${territorio.numero || territorio.id}`, 14, 28);
  
  // Linha divisória
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(1);
  doc.line(14, 32, 196, 32);

  // Informações do Cabeçalho
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Localidade: ${territorio.nome}`, 14, 40);
  doc.text(`Congregação: Tropical`, 14, 46);
  doc.text(`Relatório extraído em: ${dataGeracao}`, 140, 46);

  // Tabela de Histórico
  const colunas = ["Publicador", "Data de Saída", "Data de Retorno", "Notas"];
  const corpo = historico.map(reg => [
    reg.publicadorNome,
    reg.dataSaida,
    reg.dataRetorno || 'Em posse do publicador',
    reg.notas || '-'
  ]);

  doc.autoTable({
    startY: 55,
    head: [colunas],
    body: corpo,
    theme: 'grid',
    headStyles: { 
      fillColor: [30, 58, 138], 
      fontSize: 10, 
      halign: 'center',
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 9, 
      cellPadding: 4,
      valign: 'middle'
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { halign: 'center' },
      2: { halign: 'center' }
    }
  });

  // Salva o arquivo
  doc.save(`S13_Cartao_${territorio.numero || territorio.id}.pdf`);
};

export const gerarPDF_Estoque = (movimentacoes) => {
  const doc = new jsPDF();
  const dataGeracao = new Date().toLocaleDateString('pt-BR');

  // Cabeçalho
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("RELATÓRIO DE MOVIMENTAÇÃO DE ESTOQUE", 14, 15);
  
  doc.setFontSize(20);
  doc.setTextColor(20, 83, 45); // Verde Escuro Profissional
  doc.text("Extrato de Publicações", 14, 28);
  
  doc.setDrawColor(20, 83, 45);
  doc.setLineWidth(1);
  doc.line(14, 32, 196, 32);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Congregação: Tropical`, 14, 40);
  doc.text(`Gerado em: ${dataGeracao}`, 140, 40);

  // Tabela de Movimentações
  const colunas = ["Data", "Publicação", "Tipo", "Qtd", "Responsável/Obs"];
  const corpo = movimentacoes.map(m => [
    m.data?.split('-').reverse().join('/') || '-',
    m.itemNome || m.publicacao || 'Item não identificado',
    m.tipo === 'entrada' ? 'ENTRADA (+)' : 'SAÍDA (-)',
    m.quantidade,
    m.publicador || m.notas || 'Geral'
  ]);

  doc.autoTable({
    startY: 50,
    head: [colunas],
    body: corpo,
    theme: 'striped', // Estilo zebrado para facilitar leitura de números
    headStyles: { 
      fillColor: [20, 83, 45], 
      fontSize: 10,
      halign: 'center'
    },
    styles: { fontSize: 9 },
    columnStyles: {
      3: { halign: 'center', fontStyle: 'bold' }, // Quantidade em negrito
    }
  });

  doc.save(`Relatorio_Estoque_Tropical_${dataGeracao.replace(/\//g, '-')}.pdf`);
};