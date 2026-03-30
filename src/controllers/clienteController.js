// src/controllers/clienteController.js
exports.detalhesCliente = (req, res) => {
    // Mock de dados da TechNova Solutions
    res.json({
        nome: "TechNova Solutions",
        responsavel: "Helena Ferreira",
        financeiro: {
            totalRecebido: 42850.00,
            pendente: 12400.00,
            crescimento: 12
        },
        nfe_historico: [
            { numero: "20240901", data: "2024-09-01", status: "Emitida" },
            { numero: "20240815", data: "2024-08-15", status: "Emitida" }
        ]
    });
};