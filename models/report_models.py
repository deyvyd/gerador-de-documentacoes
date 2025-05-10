# models/report_models.py - Classes de modelos de relatórios
from datetime import date, datetime

class DocumentacaoTecnica:
    def __init__(self, numero_ss, ano_ss, iniciais_autor, titulo_ss, descricao,
                 data_inicio, data_fim, total_horas, link_board, atividades=None):
        self.numero_ss = numero_ss
        self.ano_ss = ano_ss
        self.iniciais_autor = iniciais_autor
        self.titulo_ss = titulo_ss
        self.descricao = descricao
        self.data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d').date()
        self.data_fim = datetime.strptime(data_fim, '%Y-%m-%d').date()
        self.total_horas = int(total_horas)
        self.link_board = link_board 
        self.atividades = atividades or []
        
        # Calcular valores derivados
        self.dias_uteis = self._calcular_dias_uteis()
        self.n_pf = self._calcular_pontos_funcao()
        
    def _calcular_dias_uteis(self):
        dias = (self.data_fim - self.data_inicio).days + 1
        dias_uteis = sum(1 for day in range(dias) 
                        if (self.data_inicio + date.resolution * day).weekday() < 5)
        return dias_uteis
    
    def _calcular_pontos_funcao(self):
        """
        Calcula os pontos de função baseado no total de horas
        Fórmula: (total_horas / 10) * (250 / 100)
        """
        try:
            return round((self.total_horas / 10) * (250 / 100), 2)
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"Erro ao calcular pontos de função: {e}")
            return 0

    def _formatar_numero_pf(self, valor):
        """
        Formata um número decimal seguindo as regras específicas:
        - Se for inteiro, exibe sem casas decimais
        - Se tiver 1 casa decimal significativa, exibe com 1 casa decimal
        - Se tiver 2 casas decimais significativas, exibe com 2 casas decimais
        - Usa vírgula como separador decimal
        """
        # Converte para string removendo zeros à direita desnecessários
        # valor_str = f"{valor:.10f}".rstrip('0').rstrip('.') if '.' in f"{valor:.10f}" else f"{valor:.0f}"
        valor_str = f"{valor:.2f}"
        
        # Substitui ponto por vírgula para o formato brasileiro
        return valor_str.replace('.', ',')

    def get_substituicoes(self):
        """Retorna o dicionário de substituições para o documento"""
        data_atual = datetime.now().strftime('%d/%m/%Y')
        
        return {
            '[NNN]': str(self.numero_ss).zfill(3),
            '[AAAA]': str(self.ano_ss),
            '[INICIAIS_AUTOR]': str(self.iniciais_autor),
            '[TITULO]': str(self.titulo_ss),
            '[DESCRICAO]': str(self.descricao),
            '[DATA_ATUAL]': data_atual,
            '[DATA_INICIO]': self.data_inicio.strftime('%d/%m/%Y'),
            '[DATA_FIM]': self.data_fim.strftime('%d/%m/%Y'),
            '[TOTAL_HORAS]': str(self.total_horas),
            '[DIAS_UTEIS]': str(self.dias_uteis),
            '[N_PF]': self._formatar_numero_pf(self.n_pf),
            '[LINK_BOARD]': str(self.link_board)
        }

# Outras classes de relatórios podem ser adicionadas aqui