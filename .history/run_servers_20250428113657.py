import subprocess
import os
import signal
import sys
import time

def main():
    # Inicia o servidor Flask
    flask_process = subprocess.Popen(
        ['python', 'app.py'],  # Ajuste o comando conforme necessário
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT
    )
    
    # Inicia o servidor Vite
    vite_process = subprocess.Popen(
        ['npm', 'run', 'dev'],  # Ajuste o comando conforme necessário
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT
    )
    
    print("Servidores iniciados!")
    print("Flask na porta 5000")
    print("Vite na porta 5173")
    print("Pressione Ctrl+C para encerrar ambos os servidores")
    
    try:
        # Mantém o script rodando até que seja interrompido
        while True:
            # Exibe a saída do Flask
            output = flask_process.stdout.readline()
            if output:
                print(f"[Flask] {output.decode().strip()}")
            
            # Exibe a saída do Vite
            output = vite_process.stdout.readline()
            if output:
                print(f"[Vite] {output.decode().strip()}")
            
            # Verifica se algum processo terminou
            if flask_process.poll() is not None:
                print("Servidor Flask encerrado!")
                break
            
            if vite_process.poll() is not None:
                print("Servidor Vite encerrado!")
                break
            
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\nEncerrando servidores...")
    finally:
        # Garante que ambos os processos sejam encerrados
        for process in [flask_process, vite_process]:
            try:
                if process.poll() is None:  # Se o processo ainda estiver em execução
                    os.kill(process.pid, signal.SIGTERM)
            except:
                pass
    
    print("Servidores encerrados!")

if __name__ == "__main__":
    main()