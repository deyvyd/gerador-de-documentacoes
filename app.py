import logging
import os
import re
from flask import Flask, send_from_directory, request, make_response

# Configuração de logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Inicialização da aplicação Flask
app = Flask(__name__, static_folder='static')
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024
app.config['MAX_FORM_PARTS'] = None
app.config['MAX_FORM_MEMORY_SIZE'] = None

# Dicionário de tipos MIME
MIME_TYPES = {
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
}

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

# Função para encontrar o arquivo JS mais recente
def find_latest_main_js():
    assets_dir = os.path.join(app.static_folder, 'assets')
    if not os.path.exists(assets_dir):
        logger.error(f"Diretório de assets não encontrado: {assets_dir}")
        return None
    
    # Encontra todos os arquivos main-*.js
    js_files = [f for f in os.listdir(assets_dir) if re.match(r'main-.*\.js$', f)]
    
    if not js_files:
        logger.error("Nenhum arquivo main-*.js encontrado")
        return None
    
    # Ordena por data de modificação (mais recente primeiro)
    js_files.sort(key=lambda f: os.path.getmtime(os.path.join(assets_dir, f)), reverse=True)
    
    logger.info(f"Arquivo JS mais recente: {js_files[0]}")
    return js_files[0]

# Função para encontrar o arquivo CSS mais recente
def find_latest_css():
    assets_dir = os.path.join(app.static_folder, 'assets')
    if not os.path.exists(assets_dir):
        return None
    
    # Encontra todos os arquivos main-*.css ou input-*.css
    css_files = [f for f in os.listdir(assets_dir) if re.match(r'(main|input)-.*\.css$', f)]
    
    if not css_files:
        return None
    
    # Ordena por data de modificação (mais recente primeiro)
    css_files.sort(key=lambda f: os.path.getmtime(os.path.join(assets_dir, f)), reverse=True)
    
    return css_files[0] if css_files else None

# Função auxiliar para determinar o MIME type
def get_mimetype(filename):
    ext = os.path.splitext(filename)[1].lower()
    return MIME_TYPES.get(ext, 'application/octet-stream')

# Rota para arquivos estáticos
@app.route('/static/<path:filename>')
def static_files(filename):
    response = make_response(send_from_directory(app.static_folder, filename))
    response.headers['Content-Type'] = get_mimetype(filename)
    response.headers['Cache-Control'] = 'no-cache'
    return response

# Rota para a raiz
@app.route('/')
def serve_index():
    try:
        with open('index.html', 'r') as file:
            content = file.read()
        
        # Encontra os arquivos mais recentes
        main_js = find_latest_main_js()
        css_file = find_latest_css()
        
        # Substitui o caminho do script
        if main_js:
            content = content.replace(
                '<script type="module" src="/src/main.js"></script>',
                f'<script type="module" src="/static/assets/{main_js}"></script>'
            )
            
        # Adiciona o CSS se encontrado
        if css_file:
            css_link = f'<link rel="stylesheet" href="/static/assets/{css_file}">'
            content = content.replace('</head>', f'{css_link}\n</head>')
        
        # Adiciona um script para ajudar a encontrar a logo
        script = '''
        <script>
        // Ajuda a encontrar a logo correta
        window.appConfig = {
            logoPath: "/static/dark-logo.svg"
        };
        </script>
        '''
        content = content.replace('</head>', f'{script}\n</head>')
        
        response = make_response(content)
        response.headers['Content-Type'] = 'text/html'
        response.headers['Cache-Control'] = 'no-cache'
        return response
    except Exception as e:
        logger.error(f"Erro ao servir index.html: {e}")
        return f"Erro ao carregar a aplicação: {str(e)}", 500

# Rota para API de geração de documentos
@app.route('/gerar_documentos', methods=['POST'])
def gerar_documentos():
    tipo_formulario = request.form.get('tipo', 'tecnica')
    
    if tipo_formulario == 'desenvolvimento':
        logger.info("Redirecionando requisição para módulo de desenvolvimento")
        return gerar_documentos_dev()
    else:
        logger.info("Redirecionando requisição para módulo técnico")
        return gerar_documentos_tec()

# Rota para servir o favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/x-icon')

# Rota para capturar todas as outras rotas
@app.route('/<path:path>')
def catch_all(path):
    # Se for uma rota para assets
    if path.startswith('static/'):
        return static_files(path[7:])
    
    # Para todas as outras rotas (SPA)
    return serve_index()

# Manipulador de erros 404
@app.errorhandler(404)
def page_not_found(e):
    return serve_index()

# Ponto de entrada principal
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)