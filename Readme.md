# 📄 PDF Converter API

API REST construída em **Node.js** para conversão de arquivos (imagens e documentos) para PDF.
Suporta upload múltiplo, compactação automática em `.zip`, proteção básica de segurança e execução em container Docker.

---

## 🚀 Visão Geral

Esta API permite:

* Upload de imagens ou documentos
* Conversão automática para PDF
* Download direto do arquivo convertido
* Compactação ZIP quando múltiplos arquivos são enviados
* Limpeza automática de arquivos temporários
* Camada básica de segurança e rate limiting
* Execução containerizada com Docker

---

## 🧰 Tecnologias Utilizadas

### Backend

* Node.js
* Express

### Upload / Arquivos

* Multer — upload multipart
* Archiver — geração de arquivos `.zip`
* Sharp — conversão de imagens

### Conversão de Documentos

* LibreOffice (modo headless)

### Segurança

* Helmet — headers HTTP seguros
* CORS — controle de acesso
* HPP — proteção contra HTTP Parameter Pollution
* express-rate-limit — limitação de requisições
* Morgan — logging de requisições

### Containerização

* Docker

---

## 📦 Estrutura do Projeto

```
src/
│
├── controllers/
├── services/
├── middlewares/
├── utils/
├── routes/
│
├── app.js
└── server.js
```

---

## 📡 Endpoints

### Converter Imagens

```
POST /convert
```

#### Form Data

```
files: [image1, image2...]
```

#### Resposta

* 1 arquivo → download direto
* múltiplos → ZIP

---

### Converter Documentos

```
POST /convert-docs
```

#### Suporta

* txt
* doc
* docx
* odt
* outros compatíveis com LibreOffice

#### Comportamento

* 1 arquivo → download PDF
* múltiplos → ZIP

---

## 🔐 Segurança Implementada

* Headers seguros com Helmet
* CORS configurável
* Rate limit global
* Validação de tipo de arquivo
* Limite de tamanho upload
* Limite de quantidade de arquivos
* Sanitização de parâmetros HTTP
* Logs de requisição

---

## 🧹 Gestão de Arquivos

A API remove automaticamente:

* uploads temporários
* PDFs gerados
* arquivos intermediários

Evita acúmulo de dados no servidor.

---

## 🧪 Testes

Pode ser testado com:

* Postman
* curl
* Thunder Client

## 👨‍💻 Autor MIGUEL MODESTO

Projeto desenvolvido para estudo de arquitetura backend, segurança de APIs e containerização.

---

## 📜 Licença

MIT
