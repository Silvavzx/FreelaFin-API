// src/controllers/projetoController.js
const projetos = [
    { id: 1, nome: "Redesign E-commerce Zen", cliente: "Zenith Digital Ltd", valor: 8500, pago: 4250, status: "Em Execução" },
    { id: 2, nome: "App Mobile HealthTrack", cliente: "BioSystems Global", valor: 15000, pago: 4500, status: "Em Execução" }
];

exports.getProjetos = (req, res) => {
    const totalAReceber = projetos.reduce((acc, p) => acc + (p.valor - p.pago), 0);
    res.json({
        resumo: {
            totalAReceber: totalAReceber,
            ativos: projetos.length,
            concluidosMes: 3
        },
        lista: projetos
    });
};

exports.criarProjeto = (req, res) => {
    const novoProjeto = req.body;
    // Aqui entraria a lógica de salvar no banco de dados
    res.status(201).json({ message: "Projeto criado com sucesso!", projeto: novoProjeto });
};