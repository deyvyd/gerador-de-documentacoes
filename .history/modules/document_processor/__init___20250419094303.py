# modules/document_processor/__init__.py

from .core import processar_documento
from .formatters import (
    copiar_formatacao_run,
    copiar_formatacao_bullets_completa,
    configurar_fonte_padrao
)
from .identifiers import identificar_tipo_documento
from .activity_handlers import (
    processar_atividades_bullet_points,
    processar_atividades_tabela
)
from .table_handlers import (
    tab_copiar_estilo_celula,
    tab_mapear_formatacao_paragrafo,
    tab_processar_formatacao_paragrafo
)
from .text_handlers import (
    substituir_texto_preservando_formatacao,
    remover_paragrafo_link_board
)
from .summary_handlers import (
    obter_titulos_sumario,
    atualizar_sumario_com_python_docx
)
from .hyperlink_handlers import criar_hyperlink
from .conversion import gerar_pdf_do_docx

# Exportar todas as funções que o módulo precisa disponibilizar
__all__ = [
    'processar_documento',
    'identificar_tipo_documento',
    'processar_atividades_bullet_points',
    'processar_atividades_tabela',
    'copiar_formatacao_bullets_completa',
    'copiar_formatacao_run',
    'tab_copiar_estilo_celula',
    'tab_mapear_formatacao_paragrafo',
    'tab_processar_formatacao_paragrafo',
    'substituir_texto_preservando_formatacao',
    'remover_paragrafo_link_board',
    'obter_titulos_sumario',
    'atualizar_sumario_com_python_docx',
    'criar_hyperlink',
    'gerar_pdf_do_docx',
    'configurar_fonte_padrao'
]