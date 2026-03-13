## ConversorPDF API

API pública para conversão e manipulação de arquivos PDF.

Atualmente, a API oferece dois recursos principais:

- Converter imagem (`JPEG` ou `PNG`) para `PDF`.
- Unir múltiplos arquivos `PDF` em um único documento.

---

## O que esta API faz

### 1) Converter imagem para PDF

**Endpoint:** `POST /api/v1/convert`

Recebe uma imagem por `multipart/form-data`, converte para PDF e retorna o arquivo para download.

Regras:

- Aceita apenas `image/jpeg` e `image/png`.
- Tamanho máximo: **5MB**.
- Apenas **1 arquivo** por requisição.

### 2) Unir PDFs

**Endpoint:** `POST /api/v1/join-pdf`

Recebe múltiplos PDFs por `multipart/form-data`, junta todos na ordem de envio e retorna um PDF final (`merged.pdf`).

Regras:

- Aceita apenas `application/pdf`.
- Até **5 arquivos** por requisição.
- Tamanho máximo por arquivo: **10MB**.

### Healthcheck

**Endpoint:** `GET /api/v1/health`

Resposta esperada:

```json
{ "message": "ok" }
```

---

## Tecnologias usadas

- **Node.js 20**
- **Express 5**
- **busboy** (processamento de upload via stream)
- **file-type** (detecção real do tipo do arquivo)
- **pdf-lib** (geração e merge de PDFs)
- **dotenv** (configuração por variáveis de ambiente)
- **Docker**

---

## Como rodar com Docker (após `git clone`)

### Pré-requisitos

- Docker instalado e em execução.

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/Miguel-D3v/pdf-api.git
```

2. Entre na pasta do projeto:

```bash
cd ConversorPDF
```

3. Construa a imagem:

```bash
docker build -t conversorpdf-api .
```

4. Execute o container:

```bash
docker run --rm -p 3000:3000 --name conversorpdf conversorpdf-api
```

5. Teste o healthcheck:

```bash
curl http://localhost:3000/api/v1/health
```

---

## Exemplos de uso

### Converter imagem para PDF

```bash
curl -X POST http://localhost:3000/api/v1/convert \
	-F "file=@caminho/para/imagem.jpg" \
	--output convertido.pdf
```

### Unir PDFs

```bash
curl -X POST http://localhost:3000/api/v1/join-pdf \
	-F "file=@caminho/para/arquivo1.pdf" \
	-F "file=@caminho/para/arquivo2.pdf" \
	--output merged.pdf
```

---

### URLS 

API : https://pdf-api-n32o.onrender.com/api/v1/health 

DOCUMENTAÇÃO : em breve.