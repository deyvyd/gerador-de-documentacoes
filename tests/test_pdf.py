"""Testes de geração de PDF (exigem LibreOffice instalado — pulados se ausente)."""
import io
import shutil

import pypdf
import pytest

from conftest import extrair_zip
from modules.document_processor.conversion import gerar_pdf_do_docx  # noqa: F401


def _tem_libreoffice():
    import glob
    import os
    import platform

    if platform.system() == "Windows":
        candidatos = glob.glob(r"C:\Program Files*\LibreOffice*\program\soffice.exe")
        return bool(candidatos)
    return shutil.which("libreoffice") is not None


requer_libreoffice = pytest.mark.skipif(
    not _tem_libreoffice(), reason="LibreOffice não instalado"
)


@requer_libreoffice
def test_tec_gera_pdfs_validos(client, form_tec):
    form_tec.update({"gerar_pdf": "true"})
    r = client.post("/gerar_documentos", data=form_tec)
    assert r.status_code == 200
    z = extrair_zip(r)
    pdfs = [n for n in z.namelist() if n.endswith(".pdf")]
    assert len(pdfs) == 3

    for nome in pdfs:
        reader = pypdf.PdfReader(io.BytesIO(z.read(nome)))  # falha se corrompido
        assert len(reader.pages) > 1, f"{nome} com poucas páginas"


@requer_libreoffice
def test_pdf_sumario_tem_links_internos_clicaveis(client, form_tec):
    """Regressão: links do índice devem existir no PDF e apontar pra páginas."""
    form_tec.update({"gerar_pdf": "true"})
    r = client.post("/gerar_documentos", data=form_tec)
    z = extrair_zip(r)

    for nome in (n for n in z.namelist() if n.endswith(".pdf")):
        reader = pypdf.PdfReader(io.BytesIO(z.read(nome)))
        links_internos = 0
        for page in reader.pages:
            for annot in page.get("/Annots") or []:
                obj = annot.get_object()
                if obj.get("/Subtype") != "/Link":
                    continue
                dest = obj.get("/Dest")
                action = obj.get("/A")
                if dest is not None or (action and action.get("/S") == "/GoTo"):
                    links_internos += 1
        assert links_internos > 0, f"{nome}: sumário sem links internos"
