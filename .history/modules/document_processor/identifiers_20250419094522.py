# modules/document_processor/identifiers.py
import logging

# Configuração de logging
logger = logging.getLogger(__name__)

def identificar_tipo_documento(nome_arquivo):
    """Identifica o tipo de documento baseado no nome"""
    from docx.document import Document as DocxDocument
    from unidecode import unidecode

    if isinstance(nome_arquivo, DocxDocument):
        try:
            nome_arquivo = nome_arquivo.core_properties.title or ""
        except:
            nome_arquivo = ""
    
    nome_normalizado = unidecode(str(nome_arquivo).lower())
    logger.debug(f"Nome original: {nome_arquivo}")
    logger.debug(f"Nome normalizado: {nome_normalizado}")
    
    tipo = None
    if "estimativa" in nome_normalizado:
        tipo = 'estimativa'
        logger.info(f"Documento identificado como Estimativa de Esforço e Cronograma: {nome_arquivo}")
    elif "estrategia" in nome_normalizado or "solucao" in nome_normalizado:
        tipo = 'estrategia'
        logger.info(f"Documento identificado como Estratégia da Solução: {nome_arquivo}")
    elif "relatorio" in nome_normalizado:
        tipo = 'relatorio'
        logger.info(f"Documento identificado como Relatório de Acompanhamento de Projeto: {nome_arquivo}")
    else:
        logger.warning(f"Tipo de documento não identificado para o arquivo: {nome_arquivo}")
    
    return tipo