// src/controllers/tarefaController.js

const tarefas = [
    { id: 1, categoria: "Fiscal", titulo: "Pagar Guia DAS-MEI", status: "Atrasado", risco: "Alto" },
    { id: 2, categoria: "Pagamentos", titulo: "Cobrar Cliente Nexus", valor: 4500.00 },
    { id: 3, categoria: "Projetos", titulo: "Finalizar wireframes", status: "Ativo" }
];

exports.getTarefas = (req, res) => {
    const criticas = tarefas.filter(t => t.status === "Atrasado").length;
    // Retorna os dados que a tela "Centro de Tarefas" (Imagem 5) precisa
    res.json({ 
        alerta: `Você tem ${criticas} tarefas críticas que expiram hoje`, 
        tarefas 
    });
};