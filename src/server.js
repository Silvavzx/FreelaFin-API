const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importação de Rotas
const projetoRoutes = require('./routes/projetoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use('/projetos', projetoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/tarefas', tarefaRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));