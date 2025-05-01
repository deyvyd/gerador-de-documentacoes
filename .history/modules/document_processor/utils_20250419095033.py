# modules/document_processor/utils.py
import logging
import re

# Configuração de logging
logger = logging.getLogger(__name__)

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
    """
    Encontra a página em um arquivo PDF que contém o texto especificado.
    
    Args:
        file: Caminho ou objeto do arquivo PDF
        text: Texto a ser procurado
        pag_min: Número mínimo da página para iniciar a busca (1-indexed)
    
    Returns:
        Número da página (0-indexed) ou None se não encontrado
    """
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
    """
    Atualiza a informação de página dos títulos com base no conteúdo real do PDF.
    
    Args:
        caminho_pdf: Caminho para o arquivo PDF
        titulos: Lista de dicionários contendo títulos com suas informações
        
    Returns:
        Lista de títulos atualizada com as páginas corretas
    """
    titulos_aux = []
    for titulo in titulos:
        pagina = encontrar_pagina_pdf(caminho_pdf, titulo["texto"], titulo["pagina"])
        if pagina is not None:
            titulo["pagina"] = pagina + 1
        titulos_aux.append(titulo)
    return titulos_aux