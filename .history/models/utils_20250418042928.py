# modules/utils.py - Funções auxiliares genéricas
import logging
import os
import re
from urllib.parse import quote

logger = logging.getLogger(__name__)

def gerar_nome_arquivo(tipo_documento, numero_ss, ano_ss):
    """Gera o nome do arquivo baseado no tipo de documento"""
    base_codigo = "CTNI-0534-2021.00"
    
    if tipo_documento == 'relatorio':
        prefixo = "AP"
        sufixo = "Relatório de Acompanhamento de Projeto"
    elif tipo_documento == 'estimativa':
        prefixo = "ES"
        sufixo = "Estimativa de Esforço e Cronograma"
    elif tipo_documento == 'estrategia':
        prefixo = "ES"
        sufixo = "Estratégia de solução"
    else:
        prefixo = "DOC"
        sufixo = "Documento"

    nome_final_arquivo = f"{prefixo}-{base_codigo}-{numero_ss}-{ano_ss} - {sufixo}.docx"
    logger.info(f"Nome final arquivo: {nome_final_arquivo}")
    
    return nome_final_arquivo

def identificar_quebras_pagina(doc):
    """
    Identifica parágrafos que contêm quebras de página no documento.
    """
    quebras_pagina = []
    
    for i, p in enumerate(doc.paragraphs):
        # Verifica se há quebras de página explícitas
        for run in p.runs:
            if "lastRenderedPageBreak" in str(run._element.xml) or "w:br w:type=\"page\"" in str(run._element.xml):
                quebras_pagina.append(i)
                break
        
        # Verifica configurações do parágrafo que forçam quebras de página
        if hasattr(p._p, 'pPr') and p._p.pPr is not None:
            if p._p.pPr.xpath('.//w:pageBreakBefore'):
                quebras_pagina.append(i)
    
    return quebras_pagina

def encontrar_pagina_pdf(file, text, pag_min):
    import re
    import PyPDF2

    pdf = PyPDF2.PdfReader(file)

    num_pages = len(pdf.pages)
    for i in range(0, num_pages):
        page = pdf.pages[i]
        page_text = page.extract_text()
        if re.search(text, page_text) and i >= pag_min - 1:
            return i
    return None

def obter_paginas_pdf(caminho_pdf, titulos):
    titulos_aux = []
    for titulo in titulos:
        pagina = encontrar_pagina_pdf(caminho_pdf, titulo["texto"], titulo["pagina"])
        if pagina is not None:
            titulo["pagina"] = pagina + 1
        titulos_aux.append(titulo)
    return titulos_aux

# Função para configurar as funções auxiliares no app
def setup_utils(app):
    # Não precisa fazer nada aqui por enquanto, mas no futuro pode adicionar
    # configurações ou registrar funções auxiliares como filtros de template, etc.
    pass