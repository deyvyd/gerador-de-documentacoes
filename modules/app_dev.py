# modules/app_dev.py - Funcionalidades para relatórios de desenvolvimento
import json
import logging
import os
import shutil
import tempfile
import zipfile
from urllib.parse import quote
from datetime import datetime

from flask import request, send_file, jsonify
from docx import Document

# Importações dos módulos compartilhados
from models.report_models import DocumentacaoTecnica
from modules.utils import gerar_nome_arquivo, obter_paginas_pdf
from modules.document_processor import (
    identificar_tipo_documento, 
    processar_documento, 
    processar_requisitos_funcionais,
    processar_requisitos_nao_funcionais,
    obter_titulos_sumario,
    atualizar_sumario_com_python_docx,
    gerar_pdf_do_docx
)

# Configuração do logger
logger = logging.getLogger(__name__)

# Implementação para o arquivo app-dev.py
def gerar_documentos_dev():
    """
    Função para gerar relatórios de desenvolvimento.
    """
    logger.info("Iniciando geração de relatórios de desenvolvimento")

    # Verificar valor do tipo recebido
    tipo_formulario = request.form.get('tipo', 'não especificado')
    logger.info(f"Tipo de formulário recebido: {tipo_formulario}")
    
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

        # Se apenas JSON foi solicitado, retorna diretamente sem processar os documentos
        if apenas_json:
            try:
                # Criamos um dicionário com os dados disponíveis

                # Se o total de pontos de função for maior que zero, incluir campos adicionais
                if float(total_pontos_funcao) > 0:
                    from datetime import datetime
                    data_atual = datetime.now().strftime('%d/%m/%Y')
                    # Garantir que temos iniciaisAutorCriacao
                    iniciais_autor_criacao = dados.get('iniciaisAutorCriacao') or dados.get('iniciaisAutor')
                    # Converter para o formato brasileiro antes de salvar no JSON
                    data_inicio_formatada = datetime.strptime(dados['dataInicio'], '%Y-%m-%d').strftime('%d/%m/%Y')
                    data_fim_formatada = datetime.strptime(dados['dataFim'], '%Y-%m-%d').strftime('%d/%m/%Y')

                    dados_json = {
                        'tipo': tipo_formulario,
                        'info': {
                            'numeroSS': dados['numeroSS'],
                            'anoSS': dados['anoSS'], 
                            'sistema': dados.get('sistema', ''),
                            'tituloSS': dados['tituloSS'],
                            'descricao': dados['descricao'],
                            'dataInicio': data_inicio_formatada,
                            'dataFim': data_fim_formatada,
                            'linkBoard': dados['linkBoard'],
                            'iniciaisAutorCriacao': iniciais_autor_criacao,
                            'iniciaisAutorModificacao': dados['iniciaisAutor'],
                            'dataCriacao': dados.get('dataCriacao', data_atual),
                            'dataModificacao': data_atual,
                        },
                        'requisitos': requisitos,
                        'requisitosNaoFuncionais': requisitos_nao_funcionais,
                        'totalPontosFuncao': total_pontos_funcao
                    }
                else:
                    from datetime import datetime
                    data_atual = datetime.now().strftime('%d/%m/%Y')
                    # Converter para o formato brasileiro antes de salvar no JSON
                    data_inicio_formatada = datetime.strptime(dados['dataInicio'], '%Y-%m-%d').strftime('%d/%m/%Y')
                    data_fim_formatada = datetime.strptime(dados['dataFim'], '%Y-%m-%d').strftime('%d/%m/%Y')
                    dados_json = {
                        'tipo': tipo_formulario,
                        'info': {
                            'numeroSS': dados['numeroSS'],
                            'anoSS': dados['anoSS'], 
                            'sistema': dados.get('sistema', ''),
                            'tituloSS': dados['tituloSS'],
                            'descricao': dados['descricao'],
                            'dataInicio': data_inicio_formatada,
                            'dataFim': data_fim_formatada,
                            'linkBoard': dados['linkBoard'],
                            'iniciaisAutorCriacao': dados['iniciaisAutor'],
                            'dataCriacao': data_atual,
                        },
                        'requisitos': requisitos,
                        'requisitosNaoFuncionais': requisitos_nao_funcionais,
                        'totalPontosFuncao': total_pontos_funcao
                    }
                
                # Caminho e nome do arquivo JSON
                sistema_prefix = f"[{dados.get('sistema')}] " if dados.get('sistema') else ""
                json_filename = f"{sistema_prefix}SS {dados['numeroSS'].zfill(3)}-{dados['anoSS']}.json"
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

            # Se o total de pontos de função for maior que zero, incluir campos adicionais
            if float(total_pontos_funcao) > 0:
                from datetime import datetime
                data_atual = datetime.now().strftime('%d/%m/%Y')
                iniciais_autor_criacao = dados.get('iniciaisAutorCriacao') or dados.get('iniciaisAutor')
                # Converter para o formato brasileiro antes de salvar no JSON
                data_inicio_formatada = datetime.strptime(dados['dataInicio'], '%Y-%m-%d').strftime('%d/%m/%Y')
                data_fim_formatada = datetime.strptime(dados['dataFim'], '%Y-%m-%d').strftime('%d/%m/%Y')

                dados_json = {
                    'tipo': tipo_formulario,
                    'info': {
                        'numeroSS': dados['numeroSS'],
                        'anoSS': dados['anoSS'], 
                        'sistema': dados.get('sistema', ''),
                        'tituloSS': dados['tituloSS'],
                        'descricao': dados['descricao'],
                        'dataInicio': data_inicio_formatada,
                        'dataFim': data_fim_formatada,
                        'linkBoard': dados['linkBoard'],
                        'iniciaisAutorCriacao': iniciais_autor_criacao,
                        'iniciaisAutorModificacao': dados['iniciaisAutor'],
                        'dataCriacao': dados.get('dataCriacao', data_atual),
                        'dataMoficacao': data_atual,
                    },
                    'requisitos': requisitos,
                    'requisitosNaoFuncionais': requisitos_nao_funcionais,
                    'totalPontosFuncao': total_pontos_funcao
                }
            else:
                from datetime import datetime
                # Converter para o formato brasileiro antes de salvar no JSON
                data_inicio_formatada = datetime.strptime(dados['dataInicio'], '%Y-%m-%d').strftime('%d/%m/%Y')
                data_fim_formatada = datetime.strptime(dados['dataFim'], '%Y-%m-%d').strftime('%d/%m/%Y')
                dados_json = {
                    'tipo': tipo_formulario,
                    'info': {
                        'numeroSS': dados['numeroSS'],
                        'anoSS': dados['anoSS'], 
                        'sistema': dados.get('sistema', ''),
                        'tituloSS': dados['tituloSS'],
                        'descricao': dados['descricao'],
                        'dataInicio': data_inicio_formatada,
                        'dataFim': data_fim_formatada,
                        'linkBoard': dados['linkBoard'],
                        'iniciaisAutorCriacao': dados['iniciaisAutor'],
                        'dataCriacao': datetime.now().strftime('%d/%m/%Y'),
                    },
                    'requisitos': requisitos,
                    'requisitosNaoFuncionais': requisitos_nao_funcionais,
                    'totalPontosFuncao': total_pontos_funcao
                }
            
            # Caminho do arquivo JSON
            sistema_prefix = f"[{dados.get('sistema')}] " if dados.get('sistema') else ""
            json_path = os.path.join(tempfile.gettempdir(), f"{sistema_prefix}SS {dados['numeroSS'].zfill(3)}-{dados['anoSS']}.json")
            
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
        
        class DocumentacaoDesenvolvimento(DocumentacaoTecnica):
            """Extensão da classe DocumentacaoTecnica com campos específicos de desenvolvimento"""
            def __init__(self, numero_ss, ano_ss, sistema, iniciais_autor, titulo_ss, descricao, 
                        data_inicio, data_fim, link_board, requisitos=None, 
                        requisitos_nao_funcionais=None, total_pontos_funcao=0,
                        data_criacao=None, data_modificacao=None, 
                        iniciais_autor_criacao=None, iniciais_autor_modificacao=None):
                
                # Chama o construtor da classe pai
                super().__init__(numero_ss, ano_ss, sistema, iniciais_autor, titulo_ss, descricao,
                                data_inicio, data_fim, 0, link_board)  # Total horas 0
                
                # Campos específicos de desenvolvimento
                self.requisitos = requisitos or []
                self.requisitos_nao_funcionais = requisitos_nao_funcionais or []
                self.total_pontos_funcao = float(total_pontos_funcao)

                # Campos adicionais
                self.data_criacao = data_criacao
                self.data_modificacao = data_modificacao
                self.iniciais_autor_criacao = iniciais_autor_criacao
                self.iniciais_autor_modificacao = iniciais_autor_modificacao
                
            def _formatar_numero_pf(self, valor):
                """
                Formata um número decimal seguindo as regras específicas:
                - Se for inteiro, exibe sem casas decimais
                - Se tiver 1 casa decimal significativa, exibe com 1 casa decimal
                - Se tiver 2 casas decimais significativas, exibe com 2 casas decimais
                - Usa vírgula como separador decimal
                """
                # Converte para string removendo zeros à direita desnecessários
                valor_str = f"{valor:.10f}".rstrip('0').rstrip('.') if '.' in f"{valor:.10f}" else f"{valor:.0f}"
                
                # Substitui ponto por vírgula para o formato brasileiro
                return valor_str.replace('.', ',')

            def get_substituicoes(self):
                """Retorna o dicionário de substituições para o documento"""
                # Obtém as substituições básicas da classe pai
                substituicoes = super().get_substituicoes()
                
                from datetime import datetime
                data_atual = datetime.now().strftime('%d/%m/%Y')
                
                # Lógica para DATA_CRIACAO e INICIAIS_AUTOR_CRIACAO
                # Usados quando pontos de função é zero ou quando foram carregados do JSON
                if hasattr(self, 'data_criacao') and self.data_criacao:
                    substituicoes['[DATA_CRIACAO]'] = self.data_criacao
                else:
                    substituicoes['[DATA_CRIACAO]'] = data_atual
                        
                if hasattr(self, 'iniciais_autor_criacao') and self.iniciais_autor_criacao:
                    substituicoes['[INICIAIS_AUTOR_CRIACAO]'] = self.iniciais_autor_criacao
                else:
                    substituicoes['[INICIAIS_AUTOR_CRIACAO]'] = substituicoes['[INICIAIS_AUTOR]']
                        
                # Lógica para DATA_MODIFICACAO e INICIAIS_AUTOR_MODIFICACAO
                # Sempre substituir, mesmo que seja com texto vazio
                if hasattr(self, 'data_modificacao') and self.data_modificacao:
                    substituicoes['[DATA_MODIFICACAO]'] = self.data_modificacao
                elif self.total_pontos_funcao > 0:
                    substituicoes['[DATA_MODIFICACAO]'] = data_atual
                else:
                    substituicoes['[DATA_MODIFICACAO]'] = ""  # Texto vazio quando não definido
                        
                if hasattr(self, 'iniciais_autor_modificacao') and self.iniciais_autor_modificacao:
                    substituicoes['[INICIAIS_AUTOR_MODIFICACAO]'] = self.iniciais_autor_modificacao
                elif self.total_pontos_funcao > 0:
                    substituicoes['[INICIAIS_AUTOR_MODIFICACAO]'] = substituicoes['[INICIAIS_AUTOR]']
                else:
                    substituicoes['[INICIAIS_AUTOR_MODIFICACAO]'] = ""  # Texto vazio quando não definido
                
                # Adiciona o número de pontos de função formatado
                substituicoes['[N_PF]'] = f"{self.total_pontos_funcao:.2f}".replace('.', ',')
                
                return substituicoes
                
        # Converter para o formato brasileiro antes de salvar no JSON
        data_inicio_formatada = datetime.strptime(dados['dataInicio'], '%Y-%m-%d').strftime('%d/%m/%Y')
        data_fim_formatada = datetime.strptime(dados['dataFim'], '%Y-%m-%d').strftime('%d/%m/%Y')

        # Cria a instância de documentação de desenvolvimento
        documentacao = DocumentacaoDesenvolvimento(
            numero_ss=dados['numeroSS'],
            ano_ss=dados['anoSS'],
            sistema=dados.get('sistema', ''), 
            iniciais_autor=dados['iniciaisAutor'],
            titulo_ss=dados['tituloSS'],
            descricao=dados['descricao'],
            data_inicio=data_inicio_formatada,
            data_fim=data_fim_formatada,
            link_board=dados['linkBoard'],
            requisitos=requisitos,
            requisitos_nao_funcionais=requisitos_nao_funcionais,
            total_pontos_funcao=total_pontos_funcao,
            data_criacao=dados.get('dataCriacao'),
            data_modificacao=dados.get('dataModificacao'),
            iniciais_autor_criacao=dados.get('iniciaisAutorCriacao'),
            iniciais_autor_modificacao=dados.get('iniciaisAutorModificacao')
        )

        # Define o caminho dos modelos de documento
        app_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        modelos_path = os.path.join(app_root, 'modelos', 'desenvolvimento')
        modelos = [
            os.path.join(modelos_path, "ModeloDev - Estimativa de Esforço e Cronograma.docx"),
            os.path.join(modelos_path, "ModeloDev - Estratégia de solução.docx"),
            os.path.join(modelos_path, "ModeloDev - Relatório de Acompanhamento de Projeto.docx")
        ]
        
        # Verifica se todos os modelos existem
        for modelo in modelos:
            if os.path.exists(modelo):
                logger.info(f"Modelo encontrado: {modelo}")
            else:
                logger.error(f"Modelo não encontrado: {modelo}")
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
                    processar_documento(doc, tipo_documento, substituicoes)
                    
                    if tipo_documento == 'estrategia':
                        # Processa os requisitos funcionais
                        posicao_insercao_final = processar_requisitos_funcionais(doc, documentacao.requisitos)

                        # Processa os requisitos não funcionais
                        processar_requisitos_nao_funcionais(doc, documentacao.requisitos_nao_funcionais, posicao_insercao_final)
                    
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
        sistema_prefix = f"[{dados.get('sistema')}] " if dados.get('sistema') else ""
        zip_filename = f"{sistema_prefix}SS {dados['numeroSS'].zfill(3)}-{dados['anoSS']}.zip"
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
    Função para inicializar funções específicas de relatórios de desenvolvimento.
    Não registra rotas adicionais.
    """
    # Pode adicionar outras inicializações aqui, mas sem registrar rotas
