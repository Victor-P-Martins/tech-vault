# O que é o AWS Glue?
#Analytics

O Amazon Glue é um serviço de integração de dados **sem servidor** que ajuda a preparar, limpar e transformar dados para análise e aprendizado de máquina. Ele automatiza as tarefas de **ETL (Extrair, Transformar, Carregar)**, oferece suporte a várias fontes de dados e se integra perfeitamente aos serviços da AWS, como **[[S3 (Amazon Simple Storage Service)]], Redshift e Athena**.

Descoberta sem servidor e definição de tabelas e esquemas
- Data Lakes no S3
- RDS
- Redshift
- E a maioria dos outros bancos SQL
- Trabalhos de ETL personalizados
    - Baseados em gatilho, agendados ou sob demanda
    - Totalmente gerenciado
    - Processamento Spark por baixo dos panos

---
## Rastreador Glue / Catálogo de Dados

- O Glue Crawler examina os dados no S3 e cria o esquema
- Pode ser executado periodicamente
- Preenche o Glue Data Catalog
    - Armazena apenas a definição da tabela
    - Os dados originais permanecem no S3
    
- Depois de catalogados, você pode tratar dados não estruturados como estruturados usando:
    - Redshift Spectrum
    - Amazon Athena
    - Amazon EMR
    - Amazon QuickSight

---

## Partições do Glue e S3

- O Crawler extrai partições com base na organização dos dados no S3
- É importante planejar a organização pensando nas consultas futuras
- Exemplo: dispositivos enviam dados de sensores a cada hora
    - Consultas por intervalo de tempo?
        - Organize como `aaaa/mm/dd/dispositivo`

    - Consultas por dispositivo?
        - Organize como `dispositivo/aaaa/mm/dd`

---

## Glue + Hive

- O Hive permite consultas do tipo SQL a partir do EMR
- O Glue Data Catalog pode servir como metastore do Hive
- É possível importar um metastore Hive existente para o Glue

---

## ETL no Glue

- Geração automática de código
- Suporte a **Scala ou Python**
- Criptografia:
    - No lado do servidor (em repouso)
    - SSL (em trânsito)

- Pode ser orientado por eventos
- Permite provisionar **DPUs (Data Processing Units)** extras para melhorar a performance dos jobs Spark
    - Métricas ajudam a dimensionar a capacidade de DPU necessária

- Erros reportados ao **CloudWatch**
    - Pode acionar notificações via SNS
        
- Transformação, limpeza e enriquecimento dos dados antes da análise
    - Gera código ETL em Python/Scala (modificável)
    - Aceita scripts Spark/PySpark próprios        
    - Destinos: S3, JDBC (RDS, Redshift), Glue Data Catalog

- Totalmente gerenciado, econômico, paga apenas pelo consumo
- Jobs executados em Spark sem servidor
- **Glue Scheduler** para agendar jobs
- **Glue Triggers** para automatizar execuções por eventos

---

## DynamicFrame

- Um **DynamicFrame** é uma coleção de **DynamicRecords**
    - Autodescritivos, possuem esquema
    - Parecidos com DataFrames Spark, mas com recursos extras de ETL
    - APIs em Scala e Python

---

## Transformações

- **Transformações prontas**
    - DropFields, DropNullFields (remoção de campos nulos)
    - Filter (filtragem de registros)
    - Join (enriquecimento de dados)
    - Map (adição/remoção de campos, lookups externos)

- **Transformações de Machine Learning**
    - **FindMatches ML**: identifica registros duplicados ou semelhantes mesmo sem chave única comum
        
- **Conversões de formato**: CSV, JSON, Avro, Parquet, ORC, XML
- **Transformações Spark** (exemplo: K-Means)

---

## ResolveChoice

- Lida com ambiguidades em DynamicFrames
- Exemplos:
    - **make_cols**: cria nova coluna para cada tipo (`price_double`, `price_string`)
    - **cast**: converte todos os valores para um tipo específico
    - **make_struct**: cria estrutura com múltiplos tipos de dados
    - **project**: projeta todos os tipos para um específico (`string`, por exemplo)


---

## Modificação do Data Catalog

- Scripts ETL podem atualizar esquema e partições
- **Adicionar partições**:
    - Reexecutar crawler ou
    - Usar `enableUpdateCatalog` e `partitionKeys`

- **Atualizar esquema da tabela**:
    - Reexecutar crawler ou
    - Usar `enableUpdateCatalog` / `updateBehavior`

- **Criar novas tabelas**:
    - Usar `setCatalogInfo` com `enableUpdateCatalog`

- **Restrições**:
    - Somente S3
    - Apenas JSON, CSV, Avro e Parquet
    - Parquet requer código especial
    - Esquemas aninhados não suportados


---

## Execução de Jobs Glue

- **Agendamento cron**
- **Bookmarks de job**
    - Mantém estado da execução
    - Evita reprocessamento de dados antigos
    - Permite processar apenas novos dados
    - Suporta fontes S3 (vários formatos)
    - Suporta JDBC (desde que PKs sejam sequenciais)
        - Apenas novas linhas, não atualizações

- **Eventos do CloudWatch**
    - Disparam Lambda ou SNS em sucesso/falha
    - Podem invocar EC2, enviar para Kinesis, ativar Step Functions

---

## Modelo de Custo do Glue

- Cobrança por segundo para crawlers e jobs ETL
- **Primeiro milhão de objetos** no Data Catalog é gratuito
- Endpoints de desenvolvimento cobrados por minuto

---

## Anti-patterns do Glue

- O ETL do Glue é baseado em Spark
- Para outros engines (Hive, Pig, etc.), use Data Pipeline/EMR
- **Não é mais anti-pattern: Streaming**
    - Desde abril/2020 o Glue suporta ETL de streaming sem servidor
        - Consome de Kinesis ou Kafka
        - Limpa e transforma em tempo real
        - Grava resultados no S3 ou outros repositórios
    - Executa em **Spark Structured Streaming**

---

## Glue Studio

Interface visual para ET
- **Editor visual**
    - Criação de DAGs para fluxos complexos
    - Fontes: S3, Kinesis, Kafka (MSK), JDBC
    - Transformações, amostragem, joins
    - Destinos: S3 ou Glue Data Catalog
    - Suporte a particionamento
    
- **Dashboard visual**
    - Visão geral, status, tempos de execução

---

## Qualidade de Dados no Glue

- Regras de qualidade criadas manualmente ou sugeridas automaticamente
- Integração com Glue Jobs
- Usa **DQDL (Data Quality Definition Language)**
- Resultados podem reprovar o job ou apenas serem reportados no CloudWatch