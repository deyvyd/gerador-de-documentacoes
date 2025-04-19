# modules/document_processor/formatters.py
import logging
from copy import deepcopy
from docx.shared import Pt

# Configuração de logging
logger = logging.getLogger(__name__)

def configurar_fonte_padrao(run):
    """Configura a fonte como Calibri 12"""
    if hasattr(run, 'font'):
        run.font.name = 'Calibri'
        run.font.size = Pt(12)

def copiar_formatacao_run(run_destino, run_origem):
    """Copia a formatação de um run para outro"""
    try:
        if not hasattr(run_origem, '_element') or not hasattr(run_destino, '_element'):
            return
            
        # Copiar propriedades da fonte
        if hasattr(run_origem, 'font') and hasattr(run_destino, 'font'):
            fonte_origem = run_origem.font
            fonte_destino = run_destino.font
            
            # Copiar propriedades específicas
            if hasattr(fonte_origem, 'name'):
                fonte_destino.name = fonte_origem.name
            if hasattr(fonte_origem, 'size'):
                fonte_destino.size = fonte_origem.size
            if hasattr(fonte_origem, 'bold'):
                fonte_destino.bold = fonte_origem.bold
            if hasattr(fonte_origem, 'italic'):
                fonte_destino.italic = fonte_origem.italic
            if hasattr(fonte_origem, 'underline'):
                fonte_destino.underline = fonte_origem.underline
            if hasattr(fonte_origem, 'color') and fonte_origem.color:
                fonte_destino.color.rgb = fonte_origem.color.rgb

        # Copiar XML direto
        if hasattr(run_origem._element, 'rPr') and run_origem._element.rPr is not None:
            if not hasattr(run_destino._element, 'rPr'):
                run_destino._element.get_or_add_rPr()
            
            # Limpar propriedades existentes
            for child in list(run_destino._element.rPr):
                run_destino._element.rPr.remove(child)
                
            # Copiar todas as propriedades do original
            for prop in run_origem._element.rPr.xpath('*'):
                new_prop = deepcopy(prop)
                run_destino._element.rPr.append(new_prop)
    except Exception as e:
        # Tratamento básico de erro sem logging
        print(f"Erro ao copiar formatação: {e}")

def copiar_formatacao_bullets_completa(paragrafo_destino, paragrafo_origem):
    """
    Copia formatação completa de um parágrafo para outro, com verificações de segurança.
    """
    try:
        # Verificação inicial de segurança
        if not hasattr(paragrafo_destino, '_p') or not hasattr(paragrafo_origem, '_p'):
            logger.warning("Parágrafo de destino ou origem inválido")
            return

        # Copia o estilo do parágrafo, se existir
        try:
            if hasattr(paragrafo_origem, 'style'):
                paragrafo_destino.style = paragrafo_origem.style
        except Exception as style_error:
            logger.warning(f"Erro ao copiar estilo: {style_error}")

        # Copia as propriedades do parágrafo (pPr) com verificações extras
        try:
            # Obtém as propriedades do parágrafo original com verificação
            pPr_origem = paragrafo_origem._p.get_or_add_pPr()
            
            if pPr_origem is not None:
                # Remove propriedades existentes no parágrafo de destino
                pPr_destino = paragrafo_destino._p.get_or_add_pPr()
                
                # Limpa propriedades existentes
                for child in list(pPr_destino):
                    pPr_destino.remove(child)
                
                # Copia todas as propriedades XML do parágrafo original
                for prop in pPr_origem:
                    new_prop = deepcopy(prop)
                    pPr_destino.append(new_prop)

        except Exception as pPr_error:
            logger.warning(f"Erro ao copiar propriedades do parágrafo: {pPr_error}")

    except Exception as e:
        logger.error(f"Erro geral ao copiar formatação do parágrafo: {e}")