# modules/app_tec.py - Funcionalidades para relatórios técnicos
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

def gerar_documentos_tecnico():
    """
    Função para gerar relatórios técnicos.
    """
    logger.info("Iniciando geração de relatórios técnicos")
    
    # Listas para controle de arquivos temporários e arquivos de saída
    temp_files = []    # Arquivos temporários que serão deletados ao final
    output_files = []  # Arquivos que serão incluídos no ZIP final
    zip_path = None    # Caminho do arquivo ZIP que será gerado
    
    try:
        # Obtém os dados do formulário
        dados = request.form
        
        # Obtém o tipo de formulário (sempre tecnica neste caso)
        tipo_formulario = 'tecnica'
        
        # Processa as opções de formato selecionadas pelo usuário
        gerar_json = request.form.get('gerar_json', 'true').lower() == 'true'  # Por padrão, sempre gera JSON
        gerar_docx = request.form.get('gerar_docx', 'false').lower() == 'true'
        gerar_pdf = request.form.get('gerar_pdf', 'false').lower() == 'true'
        apenas_json = request.form.get('apenas_json', 'false').lower() == 'true'

        # Dados específicos do formulário técnico
        atividades = json.loads(dados.get('atividades', '[]'))
        total_horas = dados.get('totalHoras', 0)

        if apenas_json:
            try:
                # Criamos um dicionário com os dados disponíveis
                dados_json = {
                    'tipo': tipo_formulario,  # Adiciona o tipo
                    'info': {
                        'numeroSS': dados.get('numeroSS', ''),
                        'anoSS': dados.get('anoSS', ''), 
                        'tituloSS': dados.get('tituloSS', ''),
                        'descricao': dados.get('descricao', ''),
                        'dataInicio': dados.get('dataInicio', ''),
                        'dataFim': dados.get('dataFim', ''),
                        'linkBoard': dados.get('linkBoard', ''),
                        'iniciaisAutor': dados.get('iniciaisAutor', ''),
                        'totalHoras': total_horas
                    },
                    'atividades': atividades
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

        json_path = None
        try:
            # Criamos um dicionário com todos os dados
            dados_json = {
                'tipo': tipo_formulario,  # Adiciona o tipo
                'info': {
                    'numeroSS': dados['numeroSS'],
                    'anoSS': dados['anoSS'], 
                    'tituloSS': dados['tituloSS'],
                    'descricao': dados['descricao'],
                    'dataInicio': dados['dataInicio'],
                    'dataFim': dados['dataFim'],
                    'totalHoras': dados.get('totalHoras', 0),
                    'linkBoard': dados['linkBoard'],
                    'iniciaisAutor': dados['iniciaisAutor']
                },
                'atividades': atividades
            }
            
            # Caminho do arquivo JSON
            json_path = os.path.join(tempfile.gettempdir(), f"SS {dados['numeroSS'].zfill(3)}-{dados['anoSS']}.json")
            
            # Salvar arquivo JSON
            with open(json_path, 'w', encoding='utf-8') as json_file:
                json.dump(dados_json, json_file, ensure_ascii=False, indent=2)
            
            # Adicionar à lista de arquivos temporários e de saída
            temp_files.append(json_path)
            output_files.append({
                'path': json_path,
                'filename': os.path.basename(json_path)
            })
            
        except Exception as e:
            logger.error(f"Erro ao gerar arquivo JSON: {str(e)}")

        # Cria instância do relatório com os dados fornecidos
        documentacao = DocumentacaoTecnica(
            numero_ss=dados['numeroSS'],
            ano_ss=dados['anoSS'],
            iniciais_autor=dados['iniciaisAutor'],
            titulo_ss=dados['tituloSS'],
            descricao=dados['descricao'],
            data_inicio=dados['dataInicio'],
            data_fim=dados['dataFim'],
            total_horas=dados.get('totalHoras', 0),
            link_board=dados['linkBoard'],
            atividades=atividades
        )

        # Define o caminho dos modelos de documento - ajustado para funcionar no módulo
        app_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        modelos_path = os.path.join(app_root, 'modelos', 'tecnica')
        modelos = [
            os.path.join(modelos_path, "ModeloTec - Estimativa de Esforço e Cronograma.docx"),
            os.path.join(modelos_path, "ModeloTec - Estratégia de solução.docx"),
            os.path.join(modelos_path, "ModeloTec - Relatório de Acompanhamento de Projeto.docx")
        ]
        
        # Verifica se todos os modelos existem
        for modelo in modelos:
            if not os.path.exists(modelo):
                return {"error": f"Modelo não encontrado: {os.path.basename(modelo)}"}, 404

        # Obtém as substituições que serão feitas nos documentos
        substituicoes = documentacao.get_substituicoes()
        
        # Processa cada modelo de documento
        for modelo_path in modelos:
            # Cria uma cópia temporária do modelo
            temp_output = None
            with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as temp_file:
                temp_output = temp_file.name
                temp_files.append(temp_output)
                shutil.copy2(modelo_path, temp_output)
            
            try:
                # Processa o documento em um contexto controlado
                with open(temp_output, 'rb') as doc_file:
                    doc = Document(doc_file)
                    doc.core_properties.title = os.path.basename(modelo_path)
                    
                    # Identifica o tipo de documento e gera o nome do arquivo
                    tipo_documento = identificar_tipo_documento(doc)
                    nome_arquivo = gerar_nome_arquivo(
                        tipo_documento,
                        dados['numeroSS'].zfill(3),
                        dados['anoSS']
                    )

                    # Define o título do documento sem a extensão
                    titulo_documento = os.path.splitext(nome_arquivo)[0]
                    logger.debug(f"Título definido no DOCX: {titulo_documento}")
                    
                    # Define as propriedades do documento DOCX
                    doc.core_properties.title = titulo_documento

                    # Processa o documento substituindo os marcadores
                    processar_documento(doc, tipo_documento, substituicoes, atividades)
                    
                    # Define o caminho do arquivo temporário final
                    temp_final = os.path.join(tempfile.gettempdir(), nome_arquivo)

                    # Salvamos o documento com as substituições
                    doc.save(temp_final)
                    pdf_pre_sumario = gerar_pdf_do_docx(temp_final)
                    titulos_sumario = obter_titulos_sumario(temp_final)
                    titulos_atualizados = obter_paginas_pdf(pdf_pre_sumario, titulos_sumario)

                    temp_files.append(temp_final)
                    
                    # Atualizamos o sumário - SEMPRE, independente se vai gerar PDF ou não
                    atualizar_sumario_com_python_docx(temp_final, titulo_documento, titulos_atualizados)
                        
                    # Adiciona o DOCX aos arquivos de saída se solicitado
                    if gerar_docx:
                        output_files.append({
                            'path': temp_final,
                            'filename': nome_arquivo
                        })
                    
                    # Gera PDF se solicitado
                    if gerar_pdf:
                        pdf_path = gerar_pdf_do_docx(temp_final)
                        if pdf_path:
                            temp_files.append(pdf_path)
                            output_files.append({
                                'path': pdf_path,
                                'filename': os.path.splitext(nome_arquivo)[0] + '.pdf'
                            })
                        else:
                            # Se falhou ao gerar PDF mas o usuário quer só PDF, adiciona mensagem de erro
                            if not gerar_docx:
                                return {"error": "Falha ao gerar PDF"}, 500
                
            except Exception as e:
                logger.error(f"Erro ao processar documento {modelo_path}: {str(e)}")
                raise
        
        # Verifica se temos arquivos para incluir no ZIP
        if not output_files:
            return {"error": "Nenhum arquivo foi gerado com sucesso"}, 500
        
        # Cria nome do arquivo ZIP
        zip_filename = f"SS {dados['numeroSS'].zfill(3)}-{dados['anoSS']}.zip"
        zip_path = os.path.join(tempfile.gettempdir(), zip_filename)
        
        # Cria o arquivo ZIP com os documentos gerados
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for output in output_files:
                if os.path.exists(output['path']):
                    zipf.write(output['path'], output['filename'])

        # Configura e retorna a resposta com o arquivo ZIP
        response = send_file(
            zip_path,
            as_attachment=True,
            download_name=zip_filename,
            mimetype='application/zip'
        )

        # Garante que o Content-Disposition esteja correto para caracteres especiais
        encoded_filename = quote(zip_filename)
        response.headers["Content-Disposition"] = (
            f"attachment; filename=\"{zip_filename}\"; "
            f"filename*=UTF-8''{encoded_filename}"
        )

        # Função para limpeza dos arquivos temporários após envio da resposta
        @response.call_on_close
        def cleanup():
            for temp_file in temp_files:
                try:
                    if os.path.exists(temp_file):
                        os.unlink(temp_file)
                except Exception as e:
                    logger.error(f"Erro ao limpar arquivo temporário: {e}")
            
            try:
                if os.path.exists(zip_path):
                    os.unlink(zip_path)
            except Exception as e:
                logger.error(f"Erro ao limpar arquivo ZIP: {e}")

        return response

    except Exception as e:
        logger.exception("Erro durante a geração dos relatórios")
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

def init_app_tec(app):
    """
    Função para inicializar as rotas específicas de relatórios técnicos.
    """
    # Registra a rota para relatórios técnicos
    @app.route('/gerar_documentos', methods=['POST'])
    def gerar_documentos_route():
        return gerar_documentos_tecnico()