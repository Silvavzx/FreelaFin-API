// src/controllers/financeiroController.js
exports.simularImposto = (req, res) => {
    const { faturamento } = req.body; // Ex: 5000
    
    const DAS_FIXO = 71.00;
    const isencaoPresumida = faturamento * 0.32; // 32% para serviços
    
    // Cálculo simplificado de IRPF
    let irpf = 0;
    const baseCalculavel = faturamento - DAS_FIXO - isencaoPresumida;
    if (baseCalculavel > 2259) irpf = baseCalculavel * 0.075; // Exemplo de alíquota

    res.json({
        faturamentoBruto: faturamento,
        das: DAS_FIXO,
        isencao: isencaoPresumida,
        irpf: irpf.toFixed(2),
        liquido: (faturamento - DAS_FIXO - irpf).toFixed(2)
    });
};