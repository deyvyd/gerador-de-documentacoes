# modules/document_processor/conversion.py
import os
import platform
import subprocess
import glob
import logging

# Configuração de logging
logger = logging.getLogger(__name__)

def gerar_pdf_do_docx(caminho_arquivo):
    """
    Gera um arquivo PDF a partir de um documento DOCX usando LibreOffice.
    Detecta automaticamente o caminho de instalação do LibreOffice no Windows.
    """
    logger.info(f"Iniciando geração de PDF: {caminho_arquivo}")
    
    # Define o caminho do PDF a ser gerado
    pdf_path = os.path.splitext(caminho_arquivo)[0] + '.pdf'
    diretorio = os.path.dirname(os.path.abspath(caminho_arquivo))
    
    try:
        soffice_path = None
        
        # No Windows, precisamos encontrar o caminho do soffice.exe
        if platform.system() == 'Windows':
            # Locais comuns de instalação do LibreOffice
            possible_locations = [
                r"C:\Program Files\LibreOffice\program\soffice.exe",
                r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
            ]
            
            # Procura em locais comuns
            for location in possible_locations:
                if os.path.exists(location):
                    soffice_path = location
                    break
            
            # Busca por instalações em locais não padrão
            if not soffice_path:
                # Procura em Program Files
                program_files_dirs = [
                    os.environ.get('ProgramFiles', r'C:\Program Files'),
                    os.environ.get('ProgramFiles(x86)', r'C:\Program Files (x86)')
                ]
                
                for program_dir in program_files_dirs:
                    if os.path.exists(program_dir):
                        # Procura por pastas que começam com LibreOffice
                        libreoffice_dirs = glob.glob(os.path.join(program_dir, 'LibreOffice*'))
                        for libre_dir in libreoffice_dirs:
                            soffice_path_candidate = os.path.join(libre_dir, 'program', 'soffice.exe')
                            if os.path.exists(soffice_path_candidate):
                                soffice_path = soffice_path_candidate
                                break
            
            # Se ainda não encontrou, tenta através do registro do Windows
            if not soffice_path:
                try:
                    import winreg
                    with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r'SOFTWARE\LibreOffice\Layers') as key:
                        install_path, _ = winreg.QueryValueEx(key, 'BRAND')
                        soffice_path = os.path.join(install_path, 'program', 'soffice.exe')
                        if not os.path.exists(soffice_path):
                            soffice_path = None
                except:
                    # Se falhar a busca no registro, continua com outras alternativas
                    pass
                    
            # Se não encontrou o LibreOffice, loga o erro e retorna
            if not soffice_path:
                logger.error("LibreOffice (soffice.exe) não encontrado. Verifique se está instalado.")
                return None
            
            logger.info(f"Usando LibreOffice em: {soffice_path}")
            
            # Comando para converter usando o LibreOffice no Windows
            cmd = [
                soffice_path, 
                '--headless', 
                '--convert-to', 'pdf',
                '--outdir', diretorio, 
                caminho_arquivo
            ]
        else:
            # Linux/Docker - mais simples
            cmd = [
                'libreoffice', 
                '--headless', 
                '--convert-to', 'pdf',
                '--outdir', diretorio, 
                caminho_arquivo
            ]
        
        logger.debug(f"Executando comando: {' '.join(cmd)}")
        
        # Executa o comando com shell=True para Windows
        process = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=60,  # Timeout de 60 segundos
            check=False,  # Não levanta exceção se o comando falhar
            shell=(platform.system() == 'Windows')  # Usa shell no Windows
        )
        
        # Verifica se o processo foi bem-sucedido
        if process.returncode != 0:
            logger.error(f"Erro ao gerar PDF: {process.stderr}")
            return None
        
        # Verifica se o arquivo foi realmente criado
        if os.path.exists(pdf_path):
            logger.info(f"PDF gerado com sucesso: {pdf_path}")
            return pdf_path
        else:
            logger.error(f"Arquivo PDF não foi criado: {pdf_path}")
            return None
        
    except subprocess.TimeoutExpired:
        logger.error("Timeout ao converter para PDF")
        return None
        
    except Exception as e:
        logger.error(f"Erro durante geração do PDF: {str(e)}")
        logger.exception("Detalhes do erro:")
        return None