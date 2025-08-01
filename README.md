# 📘 UsersSystem API

Projeto de backend desenvolvido com NestJS, utilizando PostgreSQL, Prisma, Redis e Docker, como parte do desafio técnico de desenvolvimento fullstack.

---

## 🧱 Tecnologias Utilizadas

- **NestJS** – Framework modular com decorators, injeção de dependência e tipagem forte.
- **Prisma ORM** – Acesso a dados tipado e com migrations seguras.
- **PostgreSQL** – Banco relacional robusto, usado com Docker.
- **Redis** – Cache de listagens com ioredis.
- **Docker + Docker Compose** – Facilita o setup local e empacotamento.
- **JWT** – Autenticação segura via tokens Bearer.
- **Jest** – Testes unitários e de cobertura.
- **Swagger** – Documentação automática da API.

---

## ▶️ Como Executar com Docker

### 1. Pré-requisitos

- Docker & Docker Compose instalados
- (Opcional) Node.js 20+ para execução fora do container

### 2. Clone o repositório

```bash
git clone <repo-url>
cd UsersSystem.API
```

### 3. Executar o Docker Compose

```bash
docker-compose up --build
```