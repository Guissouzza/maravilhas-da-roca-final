# Configuração e Acesso ao Banco de Dados

Este documento contém as credenciais necessárias para a avaliação da persistência de dados em nuvem.

## Informações de Conexão
* **Provedor do banco:** Aiven Cloud (MySQL 8)
* **Host/URL:** `maravilhadaroca-maravilhasdaroca.d.aivencloud.com`
* **Porta:** `27794`
* **Nome do banco:** `defaultdb`
* **Usuário para avaliação:** `avaliador`
* **Senha:** AVNS_t7z2JvZfYx7h0opA-ct

## Observações necessárias para conexão
* O banco exige conexão segura (SSL). No driver `mysql2` do Node.js, é obrigatório passar a configuração `ssl: { rejectUnauthorized: false }`.
* O usuário `avaliador` possui permissões de leitura, escrita e criação de tabelas (`ALL PRIVILEGES`) neste schema para permitir o funcionamento do setup automático. Após o período de correção por pares, este acesso será revogado.