# modules/document_processor/hyperlink_handlers.py
import logging
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import docx.opc.constants
from copy import deepcopy

# Configuração de logging
logger = logging.getLogger(__name__)

def criar_hyperlink(paragraph, url, text, run_modelo=None):
    """
    Cria um hyperlink em um parágrafo do documento Word mantendo a formatação original.
    """
    # Cria o relacionamento da URL
    part = paragraph.part
    r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    
    # Cria o elemento hyperlink
    hyperlink = OxmlElement('w:hyperlink')
    hyperlink.set(qn('r:id'), r_id)
    
    # Cria um novo run
    new_run = OxmlElement('w:r')
    
    # Adiciona as propriedades do run
    rPr = OxmlElement('w:rPr')
    
    # Se temos um run modelo, copiamos suas propriedades de fonte
    if run_modelo and hasattr(run_modelo, '_element') and hasattr(run_modelo._element, 'rPr'):
        modelo_rPr = run_modelo._element.rPr
        
        # Copia o nome da fonte
        if modelo_rPr.xpath('.//w:rFonts'):
            for rFonts in modelo_rPr.xpath('.//w:rFonts'):
                new_rFonts = deepcopy(rFonts)
                rPr.append(new_rFonts)
        
        # Copia o tamanho da fonte
        if modelo_rPr.xpath('.//w:sz'):
            for sz in modelo_rPr.xpath('.//w:sz'):
                new_sz = deepcopy(sz)
                rPr.append(new_sz)
    
    # Adiciona o estilo de hyperlink
    rStyle = OxmlElement('w:rStyle')
    rStyle.set(qn('w:val'), 'Hyperlink')
    rPr.append(rStyle)
    
    # Adiciona a cor azul
    color = OxmlElement('w:color')
    color.set(qn('w:val'), '0000FF')
    rPr.append(color)
    
    # Adiciona o sublinhado
    u = OxmlElement('w:u')
    u.set(qn('w:val'), 'single')
    rPr.append(u)
    
    new_run.append(rPr)
    
    # Adiciona o texto
    t = OxmlElement('w:t')
    t.text = text
    new_run.append(t)
    
    hyperlink.append(new_run)
    return hyperlink

def criar_hyperlink_marcador(paragrafo, texto, marcador, cor_rgb=(51, 70, 130), tamanho_fonte=None, negrito=False):
    """
    Cria um hyperlink no parágrafo que aponta para um marcador interno.
    """
    from docx.shared import Pt

    if tamanho_fonte is None:
        from docx.shared import Pt
        tamanho_fonte = Pt(12)
        
    # Cria o elemento hyperlink
    hyperlink = OxmlElement('w:hyperlink')
    hyperlink.set(qn('w:anchor'), marcador)
    
    # Cria um novo run
    new_run = OxmlElement('w:r')
    
    # Adiciona as propriedades do run
    rPr = OxmlElement('w:rPr')
    
    # Adiciona o nome da fonte
    font = OxmlElement('w:rFonts')
    font.set(qn('w:ascii'), "Calibri")
    font.set(qn('w:hAnsi'), "Calibri")
    rPr.append(font)
    
    # Adiciona o tamanho da fonte
    sz = OxmlElement('w:sz')
    sz.set(qn('w:val'), str(int(tamanho_fonte.pt * 2)))  # Word armazena o tamanho em 1/2 pts
    rPr.append(sz)
    
    # Adiciona o negrito, se necessário
    if negrito:
        b = OxmlElement('w:b')
        b.set(qn('w:val'), '1')
        rPr.append(b)
    
    # Adiciona a cor
    color = OxmlElement('w:color')
    r, g, b = cor_rgb
    color.set(qn('w:val'), f"{r:02X}{g:02X}{b:02X}")
    rPr.append(color)
    
    new_run.append(rPr)
    
    # Adiciona o texto
    t = OxmlElement('w:t')
    t.text = texto
    new_run.append(t)
    
    hyperlink.append(new_run)
    paragrafo._p.append(hyperlink)
    
    return hyperlink