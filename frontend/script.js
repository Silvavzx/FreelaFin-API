// Estado da aplicação
const state = {
    abaAtual: 'home',
    faturamentoSimulado: 5000
};

// Função para mudar de aba (Menu Inferior)
async function changeTab(tab) {
    state.abaAtual = tab;
    
    // Atualiza visual do menu
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="loader">Carregando...</div>';

    switch(tab) {
        case 'home': renderHome(); break;
        case 'projetos': renderProjetos(); break;
        case 'simulador': renderSimulador(); break;
        case 'tarefas': renderTarefas(); break;
    }
}

// --- FUNCIONALIDADE: SIMULADOR (Imagem 7) ---
function renderSimulador() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="view-container">
            <h2 class="page-title">Simulador de Impostos</h2>
            <div class="card">
                <label>Faturamento Mensal: <b>R$ <span id="valDisplay">5000</span></b></label>
                <input type="range" min="0" max="6750" value="${state.faturamentoSimulado}" 
                    class="slider" id="fatSlider" oninput="calcMEI(this.value)">
                
                <div class="results-grid">
                    <div class="res-item"><span>Guia DAS</span> <strong>R$ 71,00</strong></div>
                    <div class="res-item"><span>IRPF Estimado</span> <strong id="irpfVal">R$ 0,00</strong></div>
                    <hr>
                    <div class="res-item total"><span>Líquido na Conta</span> <strong id="liqiudoVal">R$ 4.929,00</strong></div>
                </div>
            </div>
            <div class="info-box">🚀 Dica: Você está 100% isento de IRPF nesta faixa!</div>
        </div>
    `;
}

function calcMEI(valor) {
    state.faturamentoSimulado = valor;
    document.getElementById('valDisplay').innerText = valor;
    
    const das = 71;
    const isencao = valor * 0.32; // 32% para serviços
    const baseCalculo = valor - das - isencao;
    
    let irpf = 0;
    if (baseCalculo > 2259) irpf = (baseCalculo - 2259) * 0.075; // Alíquota mínima exemplo

    const liquido = valor - das - irpf;

    document.getElementById('irpfVal').innerText = `R$ ${irpf.toFixed(2)}`;
    document.getElementById('liqiudoVal').innerText = `R$ ${liquido.toFixed(2)}`;
}

// --- FUNCIONALIDADE: BUSCA DE TAREFAS (Imagem 5) ---
async function renderTarefas() {
    const res = await fetch('http://localhost:3000/tarefas');
    const data = await res.json();
    
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="view-container">
            <h2 class="page-title">Centro de Tarefas</h2>
            <div class="chip-alert">${data.alerta}</div>
            <div id="task-list">
                ${data.tarefas.map(t => `
                    <div class="task-card ${t.status === 'Atrasado' ? 'critical' : ''}">
                        <div class="task-info">
                            <span class="tag">${t.categoria}</span>
                            <strong>${t.titulo}</strong>
                            ${t.valor ? `<p class="price">R$ ${t.valor}</p>` : ''}
                        </div>
                        <button class="check-btn" onclick="this.parentElement.style.opacity=0.5">✓</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// --- FUNCIONALIDADE: PROJETOS (Imagem 2) ---
async function renderProjetos() {
    const res = await fetch('http://localhost:3000/projetos');
    const data = await res.json();
    
    document.getElementById('content-area').innerHTML = `
        <div class="view-container">
            <div class="stats-row">
                <div class="mini-card"><span>Ativos</span><strong>${data.resumo.ativos}</strong></div>
                <div class="mini-card"><span>A Receber</span><strong>R$ 14.2k</strong></div>
            </div>
            ${data.lista.map(p => `
                <div class="project-card">
                    <div class="proj-header">
                        <strong>${p.nome}</strong>
                        <span class="status-badge">${p.status}</span>
                    </div>
                    <p>${p.cliente}</p>
                    <div class="progress-bar"><div class="fill" style="width: 50%"></div></div>
                </div>
            `).join('')}
        </div>
    `;
}