# app.py (versão atualizada para usar a estrutura modularizada)
import logging
import os
from flask import Flask, render_template, send_from_directory, request
from flask_cors import CORS

# Configuração de logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Inicialização da aplicação Flask
app = Flask(__name__, 
            static_folder='static',  # Pasta onde o Vite gera os arquivos
            static_url_path='')

CORS(app)
# Importar funções de módulos
from models.report_models import DocumentacaoTecnica
from modules.utils import gerar_nome_arquivo, obter_paginas_pdf, identificar_quebras_pagina
from modules.document_processor import (
    identificar_tipo_documento, 
    processar_documento,
    processar_atividades_bullet_points,
    processar_atividades_tabela,
    obter_titulos_sumario,
    atualizar_sumario_com_python_docx,
    gerar_pdf_do_docx,
    copiar_formatacao_bullets_completa,
    copiar_formatacao_run,
    tab_copiar_estilo_celula,
    tab_mapear_formatacao_paragrafo,
    tab_processar_formatacao_paragrafo,
    substituir_texto_preservando_formatacao,
    remover_paragrafo_link_board,
    criar_hyperlink
)
from modules.app_tec import gerar_documentos_tec, init_app_tec
from modules.app_dev import gerar_documentos_dev, init_app_dev

# Inicializar os módulos com a aplicação
init_app_tec(app)
init_app_dev(app)

# Rotas básicas
@app.route('/')
def serve_vue_app():
    return send_from_directory('static', 'index.html')

@app.route('/dev')
def dev_index():
    return render_template('index-dev.html')

@app.route('/<path:path>')
def catch_all(path):
    try:
        # Tenta servir o arquivo estático
        return send_from_directory('static', path)
    except:
        # Se o arquivo não existir, retorna o index.html (para SPA)
        return send_from_directory('static', 'index.html')

@app.route('/gerar_documentos', methods=['POST'])
def gerar_documentos():
    """
    Rota compatível com a versão original que detecta o tipo de requisição
    e encaminha para o módulo apropriado.
    """

    # Verificar o tipo de formulário
    tipo_formulario = request.form.get('tipo', 'tecnica')
    
    if tipo_formulario == 'desenvolvimento':
        logger.info(f"Redirecionando requisição para módulo de desenvolvimento")
        return gerar_documentos_dev()
    else:
        logger.info(f"Redirecionando requisição para módulo técnico")
        return gerar_documentos_tec()

# Ponto de entrada principal
if __name__ == '__main__':
    app.run(debug=False)