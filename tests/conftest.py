import io
import json
import sys
import zipfile
from pathlib import Path

import pytest

# Garante que a raiz do projeto está no path ao rodar de qualquer diretório
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import app as app_module  # noqa: E402


@pytest.fixture(scope="session")
def client():
    app_module.app.config["TESTING"] = True
    return app_module.app.test_client()


@pytest.fixture()
def form_tec():
    """Payload mínimo válido do formulário técnico."""
    return {
        "tipo": "tecnica",
        "gerar_json": "false",
        "gerar_docx": "false",
        "gerar_pdf": "false",
        "apenas_json": "false",
        "numeroSS": "10",
        "anoSS": "2026",
        "sistema": ".Net",
        "tituloSS": "SS de teste",
        "descricao": "Descrição de teste",
        "dataInicio": "2026-07-01",
        "dataFim": "2026-07-10",
        "linkBoard": "",
        "iniciaisAutor": "TST",
        "totalHoras": "8",
        "atividades": json.dumps(
            [
                {"nome": "Análise", "descricao": "Analisar requisitos", "horas": "3"},
                {"nome": "Desenvolvimento", "descricao": "Codificar", "horas": "5"},
            ]
        ),
    }


@pytest.fixture()
def form_dev():
    """Payload mínimo válido do formulário de desenvolvimento."""
    return {
        "tipo": "desenvolvimento",
        "gerar_json": "false",
        "gerar_docx": "false",
        "gerar_pdf": "false",
        "apenas_json": "false",
        "numeroSS": "11",
        "anoSS": "2026",
        "sistema": ".Net",
        "tituloSS": "SS dev de teste",
        "descricao": "Descrição dev",
        "dataInicio": "2026-07-01",
        "dataFim": "2026-07-10",
        "linkBoard": "",
        "iniciaisAutor": "TST",
        "requisitos": json.dumps([]),
        "requisitosNaoFuncionais": json.dumps([]),
    }


def extrair_zip(response):
    assert response.content_type == "application/zip", (
        f"esperava zip, veio {response.content_type}: "
        f"{response.get_data(as_text=True)[:200]}"
    )
    return zipfile.ZipFile(io.BytesIO(response.data))
