# O que é Amazon Simple Storage Service?
#Storage

Amazon Simple Storage Service (AWS S3) é um serviço de **object storage** escalável projetado para uma ampla gama de necessidades de armazenamento de dados, incluindo armazenar, recuperar e gerenciar dados de qualquer lugar na web. É um dos serviços centrais da Amazon Web Services (AWS) e é usado mundialmente por indivíduos e organizações por sua durabilidade, escalabilidade e segurança.

---
## Casos de Uso

- Backup e Storage
- Disaster Recovery
- Archive
- Hybrid Cloud Storage
- Application Hosting
- Media Hosting
- Data Lakes & Big Data Analytics
- Software Delivery
- Static Website

---
## Objects

- **Object values** são o conteúdo do corpo
- Tamanho máximo de um object: **5TB**
- Se fizer upload maior que 5GB, deve usar _multi-part upload_
- **Metadata**: lista de pares chave/valor (sistema ou usuário)
- **Tags**: pares chave/valor Unicode (até 10) – útil para segurança e lifecycle
- **Version ID**: se versioning estiver habilitado

---

## Segurança

### User Based

- **IAM Policies** – quais chamadas de API são permitidas para um usuário específico
### Resource-Based

- **Bucket Policies** – regras aplicadas ao bucket inteiro, permite cross-account
- **Object ACL** – controle de acesso por objeto (pode ser desabilitado)
- **Bucket ACL** – menos comum (pode ser desabilitado)
- Objetos podem ser criptografados usando chaves de criptografia

> **Nota**: Um usuário IAM pode acessar um objeto S3 se as permissões IAM permitirem **OU** se a resource policy permitir **E** não houver um _explicit DENY_.

---
## Versionamento

- Versionamento pode ser habilitado em nível de bucket
- Substituir pelo mesmo key gera novas versões (1,2,3...)
- Boa prática: habilitar versioning (permite restauração)
- Facilita rollback
- Arquivos existentes antes do versioning terão versão “null”
- Suspender versioning não deleta versões anteriores

---

## Replicação

- Necessário habilitar versioning no bucket fonte e destino
- Buckets podem estar em contas AWS diferentes
- Cópia é assíncrona
- Precisa permissões adequadas IAM
- Só objetos novos são replicados (a não ser que use **S3 Batch Replication**)
- Pode replicar delete markers (opcional)
- Deletes com version ID **não** são replicados (evita deletes maliciosos)
- Não existe _chaining_ de replication (bucket1 → bucket2 → bucket3 não replica direto do 1 para 3)

### CRR (Cross-Region Replication)

- Casos: Compliance, baixa latência, replicação entre contas

### SRR (Same-Region Replication)

- Casos: Log Aggregation, replicação entre ambientes Prod e Test

---

## Storage Classes

### Durabilidade

- **11 9’s (99.99999999999%)** em todas as classes
- Ex.: 10 milhões de objetos → perda média de 1 objeto a cada 10.000 anos

### Disponibilidade

- Varia por classe de armazenamento
- Ex.: S3 Standard → 99.99% (indisponível 53 min/ano)

### Classes principais

- **S3 Standard**: dados acessados frequentemente
- **S3 Standard-IA**: menos acesso, mas rápido quando necessário
- **S3 One Zone-IA**: durabilidade em uma única AZ, menor custo, risco de perda se AZ for destruída
- **S3 Glacier**: arquivamento, baixo custo
    - Glacier Instant Retrieval
    - Glacier Flexible Retrieval (Expedited, Standard, Bulk)
    - Glacier Deep Archive (mais barato, retenção 180 dias+)

- **S3 Intelligent-Tiering**: auto-move objetos entre tiers baseado em uso

---

## Regras de Lifecycle

- **Transition Actions**: mover objects para classes mais baratas após X dias
- **Expiration Actions**: expirar (deletar) objects após período definido
- Baseado em prefix ou tags

---

## Analytics

- Ajuda a decidir quando mover objects entre classes
- Funciona para Standard e Standard-IA
- Relatório diário, atraso inicial de 24–48h

---

## Notificação de eventos

- Notificações para **SNS, SQS, Lambda**
- Eventos: ObjectCreated, ObjectRemoved, etc
- Pode usar **EventBridge** para filtros avançados e múltiplos destinos

---

## Performance

- Escala automaticamente
- 3.500 PUT/DELETE ou 5.500 GET/HEAD por segundo por prefix
- Pode chegar a 22.000 req/s distribuindo prefixos

---

## Multi-Part Upload

- Recomendado para arquivos >100MB
- Obrigatório para >5GB
- Permite paralelismo

---

## Transfer Acceleration

- Usa edge locations para acelerar upload/download

---

## Byte-Range Fetches

- Paraleliza GETs pedindo intervalos de bytes
- Útil para downloads parciais e resilientes
---

## Select & Glacier Select

- Permite queries SQL simples no server-side
- Reduz tráfego de rede e custo de CPU no cliente

---

## Object Encryption

### Server-Side Encryption (SSE)

- **SSE-S3** (default) – chaves gerenciadas pela AWS
- **SSE-KMS** – chaves no AWS KMS (controle + auditoria via CloudTrail)
- **SSE-C** – chaves fornecidas pelo cliente

### Client-Side Encryption

- Cliente criptografa/descriptografa antes/depois de enviar para o S3

### In Transit (SSL/TLS)

- Endpoints HTTP (não seguro) e HTTPS (seguro)
- HTTPS é recomendado e obrigatório para SSE-C

---

## Object Lambda

- Usa Lambda Functions para modificar objects na hora da leitura
- Casos:
    - Remover PII em ambientes não-prod
    - Converter formatos (XML → JSON)
    - Redimensionar/imagem com watermark dinâmico