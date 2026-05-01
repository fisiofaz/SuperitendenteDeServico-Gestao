import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const gerarPDF_S13 = (territorio, historico) => {
  const doc = new jsPDF();
  const dataGeracao = new Date().toLocaleDateString();

  // Cabeçalho Profissional
  doc.setFontSize(10);
  doc.text("REGISTRO DE TERRITÓRIO DA CONGREGAÇÃO", 14, 15);
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 138); // Azul Marinho
  doc.text(`CARTÃO Nº ${territorio.numero || territorio.id}`, 14, 25);
  
  doc.setDrawColor(200);
  doc.line(14, 30, 196, 30);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Localidade: ${territorio.nome}`, 14, 38);
  doc.text(`Data do Relatório: ${dataGeracao}`, 160, 38);

  // Tabela S-13
  const colunas = ["Publicador", "Designado em", "Devolvido em", "Observações"];
  const corpo = historico.map(reg => [
    reg.publicadorNome,
    reg.dataSaida,
    reg.dataRetorno || 'Em mãos',
    reg.notas || '-'
  ]);

  doc.autoTable({
    startY: 45,
    head: [colunas],
    body: corpo,
    theme: 'grid',
    headStyles: { fillColor: [30, 58, 138], fontSize: 10, halign: 'center' },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold' } }
  });

  doc.save(`S13_Cartao_${territorio.numero}.pdf`);
};

export const gerarPDF_Estoque = (movimentacoes) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text("Relatório Mensal de Movimentação de Publicações", 14, 20);
  doc.setFontSize(10);
  doc.text(`Congregação Tropical - Registro para o Superintendente`, 14, 28);

  const colunas = ["Data", "Publicação", "Tipo", "Qtd", "Responsável"];
  const corpo = movimentacoes.map(m => [
    m.data,
    m.itemNome,
    m.tipo === 'entrada' ? 'ENTRADA' : 'SAÍDA',
    m.quantidade,
    m.publicador || 'Balcão'
  ]);

  doc.autoTable({
    startY: 35,
    head: [colunas],
    body: corpo,
    headStyles: { fillColor: [20, 83, 45] }, // Verde para estoque
  });

  doc.save(`Relatorio_Estoque_${new Date().getMonth() + 1}.pdf`);
};