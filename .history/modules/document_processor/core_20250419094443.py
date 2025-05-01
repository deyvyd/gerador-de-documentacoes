# modules/document_processor/core.py
import logging
from .text_handlers import substituir_texto_preservando_formatacao, remover_paragrafo_link_board
from .activity_handlers import processar_atividades_bullet_points, processar_atividades_tabela

# Configuração de logging
logger = logging.getLogger(__name__)

def processar_documento(doc, tipo_documento, substituicoes, atividades=None):
    """Função principal para processar o documento"""
    try:
        # Verifica se o link do board está vazio e, se estiver, remove os parágrafos relacionados
        if not substituicoes.get('[LINK_BOARD]') or substituicoes.get('[LINK_BOARD]').strip() == '':
            logger.info("Link do board não fornecido. Removendo parágrafos relacionados.")
            remover_paragrafo_link_board(doc)
        
         # Lista de marcadores para verificação rápida
        marcadores = set(substituicoes.keys())

        # Processa parágrafos no corpo do documento
        for paragraph in doc.paragraphs:
            try:
                # Verificação prévia se o parágrafo contém algum marcador
                texto_paragrafo = ''.join(run.text for run in paragraph.runs)
                
                # Só processa se contiver pelo menos um marcador ou o link do board
                if any(marcador in texto_paragrafo for marcador in marcadores):
                    substituir_texto_preservando_formatacao(paragraph, substituicoes)
            except Exception as e:
                logger.error(f"Erro ao processar parágrafo: {str(e)}")
        
        # Processa parágrafos nas tabelas
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        try:
                            # Verificação prévia se o parágrafo contém algum marcador
                            texto_paragrafo = ''.join(run.text for run in paragraph.runs)
                            
                            # Só processa se contiver pelo menos um marcador
                            if any(marcador in texto_paragrafo for marcador in marcadores):
                                substituir_texto_preservando_formatacao(paragraph, substituicoes)
                        except Exception as e:
                            logger.error(f"Erro ao processar parágrafo na tabela: {str(e)}")
        
        # Processa atividades se existirem
        if atividades:            
            if tipo_documento == 'estimativa':
                processar_atividades_tabela(doc, atividades)
            elif tipo_documento == 'estrategia':
                processar_atividades_bullet_points(doc, atividades)
            else:
                logger.info("O documento não tem atividades a serem processadas.")

    except Exception as e:
        logger.error(f"Erro ao processar documento: {str(e)}")
        raise