# modules/app_dev.py - Funcionalidades para relatórios de desenvolvimento
import json
import logging
import os
import shutil
import tempfile
import zipfile
from urllib.parse import quote

from flask import request, send_file, jsonify
from docx import Document

# Importações dos módulos compartilhados
from models.report_models import DocumentacaoTecnica
from modules.utils import gerar_nome_arquivo, obter_paginas_pdf
from modules.document_processor import (
    identificar_tipo_documento, 
    processar_documento, 
    processar_atividades_bullet_points,
    processar_atividades_tabela,
    obter_titulos_sumario,
    atualizar_sumario_com_python_docx,
    gerar_pdf_do_docx
)

# Configuração do logger
logger = logging.getLogger(__name__)

def gerar_documentos_dev():
    """
    Função para gerar relatórios de desenvolvimento.
    """
    logger.info("Iniciando geração de relatórios de desenvolvimento")
    
    # Listas para controle de arquivos temporários e arquivos de saída
    temp_files = []    # Arquivos temporários que serão deletados ao final
    output_files = []  # Arquivos que serão incluídos no ZIP final
    zip_path = None    # Caminho do arquivo ZIP que será gerado
    
    try:
        # Obtém os dados do formulário
        dados = request.form
        
        # Obtém o tipo de formulário (sempre desenvolvimento neste caso)
        tipo_formulario = 'desenvolvimento'
        
        # Processa as opções de formato selecionadas pelo usuário
        gerar_json = request.form.get('gerar_json', 'true').lower() == 'true'
        gerar_docx = request.form.get('gerar_docx', 'false').lower() == 'true'
        gerar_pdf = request.form.get('gerar_pdf', 'false').lower() == 'true'
        apenas_json = request.form.get('apenas_json', 'false').lower() == 'true'

        # Dados específicos do formulário de desenvolvimento
        requisitos = json.loads(dados.get('requisitos', '[]'))
        requisitos_nao_funcionais = json.loads(dados.get('requisitosNaoFuncionais', '[]'))
        total_pontos_funcao = dados.get('totalPontosFuncao', 0)

        if apenas_json:
            try:
                # Criamos um dicionário com os dados disponíveis
                dados_json = {
                    'tipo': tipo_formulario,
                    'info': {
                        'numeroSS': dados.get('numeroSS', ''),
                        'anoSS': dados.get('anoSS', ''), 
                        'tituloSS': dados.get('tituloSS', ''),
                        'descricao': dados.get('descricao', ''),
                        'dataInicio': dados.get('dataInicio', ''),
                        'dataFim': dados.get('dataFim', ''),
                        'linkBoard': dados.get('linkBoard', ''),
                        'iniciaisAutor': dados.get('iniciaisAutor', '')
                    },
                    'requisitos': requisitos,
                    'requisitosNaoFuncionais': requisitos_nao_funcionais,
                    'totalPontosFuncao': total_pontos_funcao
                }
                
                # Caminho e nome do arquivo JSON
                json_filename = f"SS {dados.get('numeroSS', '').zfill(3)}-{dados.get('anoSS', '')}.json"
                json_path = os.path.join(tempfile.gettempdir(), json_filename)
                
                # Salvar arquivo JSON
                with open(json_path, 'w', encoding='utf-8') as json_file:
                    json.dump(dados_json, json_file, ensure_ascii=False, indent=2)
                
                # Retornar resposta JSON com confirmação
                return send_file(
                    json_path,
                    as_attachment=True,
                    download_name=json_filename,
                    mimetype='application/json'
                )
                
            except Exception as e:
                logger.error(f"Erro ao gerar arquivo JSON: {str(e)}")
                return jsonify({"error": f"Erro ao gerar JSON: {str(e)}"}), 500

        # Para futuras implementações de geração de documentos de desenvolvimento
        # Aqui viria a lógica para gerar os documentos específicos de desenvolvimento

        return jsonify({"message": "Geração de documentos de desenvolvimento ainda não implementada"}), 501

    except Exception as e:
        logger.exception("Erro durante a geração dos relatórios de desenvolvimento")
        return {"error": str(e)}, 500
        
    finally:
        # Limpeza final de segurança dos arquivos temporários
        for temp_file in temp_files:
            try:
                if os.path.exists(temp_file):
                    os.unlink(temp_file)
            except:
                pass
            
        try:
            if zip_path and os.path.exists(zip_path):
                os.unlink(zip_path)
        except:
            pass

def init_app_dev(app):
    """
    Função para inicializar as rotas específicas de relatórios de desenvolvimento.
    """
    # Registra a rota para relatórios de desenvolvimento
    @app.route('/gerar_documentos_dev', methods=['POST'])
    def gerar_documentos_dev_route():
        return gerar_documentos_dev()