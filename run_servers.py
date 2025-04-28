import subprocess
import sys
import time
import os

def run_command(command, name):
    """Executa um comando e retorna o processo"""
    print(f"Iniciando {name}...")
    
    # Detecta o sistema operacional
    if os.name == 'nt':  # Windows
        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding='utf-8'
        )
    else:  # Linux/Mac
        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
    
    return process

def main():
    # Ajuste os comandos conforme necessário
    flask_cmd = "python app.py"
    vite_cmd = "npm run dev"
    
    # Inicia os processos
    flask_process = run_command(flask_cmd, "Flask")
    time.sleep(2)  # Pequeno delay para garantir que o Flask inicie primeiro
    vite_process = run_command(vite_cmd, "Vite")
    
    print("\n=== Servidores iniciados! ===")
    print("Flask na porta 5000")
    print("Vite na porta 5173")
    print("Acesse o aplicativo em: http://localhost:5173")
    print("Pressione Ctrl+C para encerrar ambos os servidores\n")
    
    processes = [
        {"process": flask_process, "name": "Flask"},
        {"process": vite_process, "name": "Vite"}
    ]
    
    try:
        while all(p["process"].poll() is None for p in processes):
            for p in processes:
                line = p["process"].stdout.readline().strip()
                if line:
                    print(f"[{p['name']}] {line}")
            time.sleep(0.1)
    
    except KeyboardInterrupt:
        print("\nEncerrando servidores...")
    
    finally:
        for p in processes:
            if p["process"].poll() is None:
                p["process"].terminate()
                print(f"{p['name']} encerrado.")
    
    print("Todos os servidores encerrados!")

if __name__ == "__main__":
    main()