"""Testes das rotas de frontend/estáticos."""


def test_index_responde_html(client):
    r = client.get("/")
    assert r.status_code == 200
    assert r.content_type.startswith("text/html")
    assert b"<html" in r.data.lower()


def test_rotas_spa_servem_index(client):
    for rota in ("/tec", "/dev", "/sobre", "/manual"):
        r = client.get(rota)
        assert r.status_code == 200, rota
        assert r.content_type.startswith("text/html"), rota


def test_404_serve_spa(client):
    r = client.get("/rota-que-nao-existe")
    assert r.status_code == 200  # SPA catch-all


def test_favicon(client):
    r = client.get("/favicon.ico")
    assert r.status_code == 200


def test_modelos_docx_integros():
    """Regressão: modelos nunca podem estar corrompidos (já aconteceu via
    normalização de line-endings do git)."""
    import glob
    import zipfile

    modelos = glob.glob("modelos/**/*.docx", recursive=True)
    assert len(modelos) >= 6
    for m in modelos:
        with zipfile.ZipFile(m) as z:
            assert z.testzip() is None, f"corrompido: {m}"
            assert "word/document.xml" in z.namelist(), f"sem document.xml: {m}"
