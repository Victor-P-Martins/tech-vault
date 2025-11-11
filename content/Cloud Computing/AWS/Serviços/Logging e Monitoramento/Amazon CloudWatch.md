#logging

**Ferramenta de monitoramento** para seus recursos e aplicações na AWS.  
Exibe **métricas** e cria **alarmes** que observam essas métricas e enviam notificações ou fazem alterações automaticamente nos recursos monitorados quando um **limiar** é violado. 

O CloudWatch é basicamente um **repositório de métricas**. Um serviço da AWS, envia métricas para o repositório e você recupera estatísticas com base nessas métricas. Se você publicar **métricas personalizadas**, também poderá obter estatísticas sobre elas.

O CloudWatch **não agrega dados entre regiões**. Portanto, as métricas são totalmente **separadas por região**.

![[Pasted image 20251108231726.png]]

---

## Conceitos do CloudWatch

**Namespaces** – um contêiner para métricas do CloudWatch.

- **Não há namespace padrão.**
    
- Os namespaces da AWS usam a convenção: `AWS/service`.
    

**Metrics (Métricas)** – representam um conjunto de pontos de dados ordenados no tempo, publicados no CloudWatch.

- **Existem apenas na região** em que foram criadas.
    
- **Não podem ser excluídas**, mas expiram automaticamente após **15 meses** se nenhum dado novo for publicado.
    
- À medida que novos pontos chegam, dados mais antigos que 15 meses são descartados.
    
- Cada ponto de métrica deve ter um **timestamp**. O timestamp pode estar até **duas semanas no passado** e até **duas horas no futuro**. Se você não fornecer, o CloudWatch usa a hora de recebimento do ponto.
    
- Por padrão, vários serviços fornecem métricas gratuitas. Você também pode habilitar **detailed monitoring** ou **publicar métricas da sua aplicação**.
    
- **Metric math** permite consultar múltiplas métricas e usar **expressões matemáticas** para criar novas séries temporais.
    
- **Nota importante para métricas de EC2:** o CloudWatch **não coleta** métricas de **uso de memória** e **espaço em disco** automaticamente; é preciso instalar o **CloudWatch Agent** nas instâncias.
    

**Dimensions (Dimensões)** – par **nome/valor** que identifica exclusivamente uma métrica.

- Você pode atribuir **até 10 dimensões** a uma métrica.
    
- Ao adicionar uma dimensão única, você cria uma **variação nova** daquela métrica.
    

**Resolution (Resolução)** – classifica uma métrica personalizada como **padrão** ou **alta resolução**.

- **Standard Resolution:** granularidade de **1 minuto** (métricas padrão dos serviços da AWS).
    
- **High Resolution:** granularidade de **1 segundo**; fornece mais visibilidade de atividades **sub-minuto**.
    

**Statistics (Estatísticas)** – agregações de dados de métricas em períodos definidos.

- Cada estatística tem uma **unidade de medida**. Pontos com unidades diferentes são agregados separadamente.
    
- Você pode especificar a unidade ao criar uma métrica personalizada; caso contrário, a unidade é **None**.
    
- **Period** é o comprimento do tempo associado à estatística (padrão: **60 segundos**).
    
- O CloudWatch agrega estatísticas conforme o **period** solicitado na leitura.
    
- Para grandes volumes, você pode inserir um **statistic set** (pré-agregado).
    

**Estatísticas disponíveis (resumo):**

- **Minimum:** menor valor observado no período (bom para volumes baixos).
    
- **Maximum:** maior valor observado no período (bom para picos).
    
- **Sum:** soma de todos os valores no período (bom para volume total).
    
- **Average:** `Sum / SampleCount` no período (compare com Min/Max para entender amplitude).
    
- **SampleCount:** número de pontos usados no cálculo.
    
- **pNN.NN:** percentil especificado (ex.: `p95.45`). _Percentis não estão disponíveis para métricas que incluam valores negativos._
    

**Percentiles (Percentis)** – indicam a posição relativa de um valor no conjunto de dados, ajudando a entender a **distribuição**.

---

## Alarms (Alarmes)

Observam **uma única métrica** por um período e executam uma ou mais **ações** com base no valor da métrica em relação a um **limiar** ao longo do tempo.

- Úteis para monitorar **CPU**, **latência** de **load balancer**, **gerenciar instâncias** e **billing alarms**.
    
- Quando exibido em **dashboard**, o alarme fica **vermelho** no estado **ALARM**.
    
- Alarmes invocam ações **apenas para mudanças de estado sustentadas**.
    

**Estados do Alarme**

- **OK** — métrica/expressão dentro do limiar.
    
- **ALARM** — fora do limiar.
    
- **INSUFFICIENT_DATA** — recém-criado, métrica indisponível ou dados insuficientes.
    

Você também pode **monitorar custos estimados** da AWS com **CloudWatch Alarms**. Atenção: é possível rastrear **custos estimados**, não o uso real de recursos. _Cobertura de Reserved Instances_ deve ser configurada no **AWS Budgets** ou **Cost Explorer**, **não** no CloudWatch.  
_(amazon cloudwatch alarm)_

**Ao criar um alarme, você define:**

- **Period:** janela (em segundos) para avaliar a métrica/expressão e formar cada ponto do alarme.
    
- **Evaluation Period:** quantidade de períodos (pontos) recentes a avaliar para determinar o estado.
    
- **Datapoints to Alarm:** quantos pontos, dentro do Evaluation Period, precisam **estar em violação** para entrar em **ALARM** (não precisam ser consecutivos, apenas dentro da janela avaliada).
    

**Tratamento de dados ausentes (missing data):**

- **missing** — ignora dados ausentes (padrão).
    
- **notBreaching** — trata ausentes como **dentro** do limiar.
    
- **breaching** — trata ausentes como **em violação**.
    
- **ignore** — mantém o **estado atual** do alarme.
    

Agora é possível **criar tags** em alarmes do CloudWatch para definir **políticas** de controle em nível de recurso.

---

## CloudWatch Dashboard

Páginas iniciais **customizáveis** no console para monitorar recursos em uma única visão, inclusive **entre regiões**.

- **Sem limite** de quantidade de dashboards.
    
- **Dashboards são globais**, não específicos por região.
    
- Adicione, remova, redimensione, mova, edite ou renomeie gráficos. Você pode **incluir métricas manualmente** num gráfico.
    

**Compartilhamento de dashboards** (para quem não tem acesso direto à sua conta):

1. Compartilhar **um único dashboard** e definir **e-mails e senhas** dos visualizadores.
    
2. Compartilhar **publicamente** um único dashboard (qualquer pessoa com o link visualiza).
    
3. Compartilhar **todos** os dashboards usando um **provedor SSO de terceiros**. Integre o SSO ao **Amazon Cognito** para habilitar.
    

---

## CloudWatch Events ([[Amazon EventBridge]])

Entrega um fluxo **quase em tempo real** de eventos que descrevem **mudanças** nos recursos da AWS.  
Eventos respondem a essas mudanças e tomam **ações corretivas** conforme necessário: enviar mensagens, ativar funções, fazer alterações e **capturar estado**.

**Conceitos:**

- **Events** – indicam uma mudança no ambiente AWS.
    
- **Targets** – processam eventos.
    
- **Rules** – fazem o _match_ de eventos e roteiam para _targets_.
    

O [[Amazon EventBridge]] é um serviço que **evolui** a API do **CloudWatch Events**. Ambos usam a **mesma infraestrutura**. Você ainda pode gerenciar pelo CloudWatch Events, mas o recomendado é usar o **EventBridge**.  
O EventBridge amplia recursos permitindo **conectar dados** de **suas** aplicações e de **SaaS de terceiros**, facilitando integrações.

---

## CloudWatch Logs

**Recursos:**

- Consultar dados de logs.
    
- Monitorar logs de [[Elastic Compute Cloud (EC2)]] em tempo real.
    
- Monitorar eventos registrados pelo [[AWS CloudTrail]].
    
- Por padrão, os logs são mantidos **indefinidamente** e **nunca expiram**.
    
- Arquivar dados de log.
    
- Registrar **consultas DNS do Route 53**.
    

**CloudWatch Logs Insights** permite buscar/analisar logs de forma interativa com **queries**.  

**CloudWatch Vended Logs** são logs publicados nativamente por serviços AWS em nome do cliente. 

**VPC Flow Logs** é o primeiro tipo a se beneficiar do modelo com **camadas**.

Depois que o **Logs agent** começa a publicar dados, você pode **filtrar/pesquisar** criando **metric filters**: eles definem termos e padrões a procurar nos logs conforme são enviados.

- **Filtros não são retroativos**; apenas publicam métricas para eventos **após** a criação.
    
- Resultados filtrados retornam as **primeiras 50 linhas**, que **não** serão exibidas se o timestamp for **anterior** ao momento de criação da métrica.
    

**Metric Filter – Conceitos:**

- **filter pattern** – padrão a procurar no arquivo de log.
    
- **metric name** – nome da métrica do CloudWatch a publicar.
    
- **metric namespace** – namespace de destino da nova métrica.
    
- **metric value** – valor numérico publicado a cada _match_.
    
- **default value** – valor relatado quando **não** há _matches_ no período (usar **0** garante dados em todos os períodos).
    
- **dimensions** – pares chave/valor que definem uma métrica.
    

Você pode criar **dois subscription filters** com **padrões diferentes** em um único **log group**. 

**CloudWatch Contributor Insights** cria regras para analisar **logs estruturados**.  

**CloudWatch Metric Insights** oferece **queries flexíveis** para agregar/agrupar métricas em tempo real e identificar problemas rapidamente.  

Você pode usar **CloudWatch Evidently** para **testar features** com uma parcela dos usuários e **monitorar desempenho** antes do lançamento completo. 

**Real User Monitoring (CloudWatch RUM)** coleta/mostra dados **client-side** de desempenho de apps web a partir de sessões reais, **quase em tempo real**.

---

## CloudWatch Agent

- Coleta **mais logs** e **métricas de sistema** de instâncias **EC2** e **servidores on-premises**.
    
- **Precisa ser instalado.**
    
- Namespace padrão das métricas coletadas: **CWAgent**.
    
- Suporta métricas customizadas via **StatsD** e **collectd**.
    

---

## CloudWatch Metric Streams

Permite criar um **stream contínuo, quase em tempo real** de métricas para um **destino à sua escolha**.

- Envie métricas para **Datadog, New Relic, Splunk, Dynatrace, Sumo Logic** e **S3**.


---

## CloudWatch Application Insights

Facilita **observabilidade** para suas aplicações e recursos AWS subjacentes.  
Ajuda a configurar os **melhores monitores** para analisar continuamente sinais de problemas.

- **Descoberta e configuração:** Na primeira adição, faz _scan_ dos componentes e recomenda **métricas**, **logs** e outras fontes para monitorar. 

- **Pré-processamento de dados:** Analisa continuamente fontes monitoradas para descobrir **anomalias em métricas** e **erros de log** (_observations_).  

- **Detecção inteligente de problemas:** Correlaciona observações com **algoritmos de classificação** e **regras incorporadas**.  

- **Alerta e ação:** Ao detectar um problema, gera **CloudWatch Events** para notificar.

**Retenção de dados:**

- **Problems** por **55 dias** e **observations** por **60 dias**.


**Recursos:**

- Dashboards automáticos que mostram **problemas potenciais**, ajudando a isolar rapidamente.

- Recomenda e configura métricas e logs no CloudWatch ao adicionar aplicações.

- Analisa padrões históricos para **detectar anomalias** e identifica **erros/exceções** em logs da aplicação, SO e infraestrutura.

- **Correlaciona** observações com algoritmos e regras embutidas.

- Cria dashboards com observações relevantes e **severidade**, priorizando ações.

- Para problemas comuns em **.NET** e **SQL** (latência, falha de backup, _memory leaks_, grandes requisições HTTP, I/O cancelado), fornece **insights** com possível causa raiz e **passos de resolução**.

- Integração nativa com [[AWS Systems Manager]] OpsCenter para resolver executando **Automation documents**.


---

## CloudWatch Container Insights

**Coleta e agregação**

- Coleta, agrega e resume **métricas e logs** de aplicações **containerizadas** e **microservices**.

- Disponível para [[Amazon ECS]], [[Amazon EKS]] e **Kubernetes** no **EC2**.

- Suporta clusters em [[AWS Fargate]] (ECS e EKS).


**Informações de diagnóstico**

- Fornece dados como **falhas de reinício** de containers para isolar e resolver rapidamente.

- Permite definir **alarmes** nas métricas coletadas.


**Métricas e logs**

- Coleta dados como **eventos de log de performance** usando **embedded metric format**.

- Métricas ficam disponíveis em **dashboards automáticos** do CloudWatch.

- Cria automaticamente um **log group** para esses eventos.


**Cobrança**

- Versão original: métricas cobradas como **custom metrics**.

- **Enhanced observability para EKS:** cobrança **por observação**, não por métrica armazenada ou log ingerido.


**Coleta de performance**

- Em **EKS/Kubernetes**, usa uma versão **containerizada do CloudWatch Agent** para descobrir containers em execução e coletar dados **em todas as camadas** da pilha de performance.


**Criptografia**

- Suporta **KMS** para logs e métricas coletados (apenas **chaves simétricas**).


---

## Autenticação e Controle de Acesso

- Use **IAM users/roles** para autenticação.

- Gerencie acesso com **Dashboard Permissions**, **políticas IAM (identity-based)** e **service-linked roles**.

- **Identity-Based Policies** e **Resource-Based Policies**.

- **Não há ARNs** de CloudWatch para usar diretamente em políticas IAM (para ações do CloudWatch). Use **`*` (asterisco)** como **resource** ao escrever políticas que controlem ações do CloudWatch.

---
## Políticas Gerenciadas do Amazon CloudWatch

Uma **managed policy** é uma política **criada e predefinida pela AWS** para diferentes serviços. Esse tipo de política é voltado a **casos de uso comuns**, para que você **não precise escrever do zero**. Você **não pode modificar** as declarações dentro de uma managed policy. Se as managed policies **não atenderem** às demandas da sua aplicação, você pode criar uma **customer-managed policy** (que você mesmo administra e escreve).

O Amazon CloudWatch possui várias managed policies, mas você **não precisa saber todas**. Abaixo estão as mais relevantes para o exame [[AWS Security Specialty - SCS-C02]]:

## Tipos

- **CloudWatchFullAccess** — Permite o uso de **todas** as operações do CloudWatch. Deve ser concedida **apenas a administradores**. **Não é ideal** se você estiver implementando **privilégio mínimo** em produção.
    
- **CloudWatchReadOnlyAccess** — Permite **operações de leitura** apenas, como **obter métricas** ou **listar detalhes** de um dashboard. Qualquer operação que **não modifique** configurações ou dados se enquadra nesta política.
    
- **CloudWatchActionsEC2Access** — Concede **acesso somente leitura** a **CloudWatch alarms** e **métricas**. Também permite **visualizar metadados do EC2** e **executar** ações em instâncias EC2: **stop**, **reboot** e **terminate**.

---

## Logging em tempo real com[[ Amazon Data Firehose]] e [[Amazon OpenSearch]] Service

**Amazon Data Firehose** é um serviço totalmente gerenciado que permite **carregar dados de streaming** em **data stores** e **ferramentas de análise**. Ele pode **agrupar (batch)**, **comprimir** e **transformar** os dados antes de enviá-los ao destino.

## Segurança (Data Firehose)

- Oferece opção de **criptografar automaticamente** seus dados após o upload no destino.
    
- **Gerencie acesso a recursos** com **IAM**.
    

**Amazon OpenSearch Service** permite **pesquisar, analisar e visualizar** seus dados em **tempo real**. O serviço gerencia **capacidade, escalabilidade, patching e administração** dos seus **clusters OpenSearch**, mantendo **acesso direto às APIs** do OpenSearch.

## Segurança (OpenSearch Service)

- **Elegível para HIPAA** e **conforme** com **PCI DSS**, **NOC** e **padrões ISO**.
    
- Conecte aplicações com segurança ao ambiente gerenciado via **VPC** ou **Internet pública**, configurando acesso de rede com **Security Groups** da VPC ou **políticas por IP**.
    
- **Autentique usuários** e **controle acesso** com **Amazon Cognito** e **AWS IAM**.
    
- **Criptografia** embutida **em repouso** e **em trânsito**, protegendo dados no **domínio** (e snapshots) e entre **nós** do cluster.
    

Logs de servidor web, como **Apache**, geram dados **não estruturados (raw)**, dificultando a extração de informações valiosas. Frequentemente, esses logs **schemaless** precisam ser **convertidos** para um formato **estruturado** (ex.: **JSON**, **CSV**) para **melhor indexação e busca**, essenciais à **análise de logs**.

Se você precisa de **logging em tempo real**, **Amazon Data Firehose** e **Amazon OpenSearch** são uma ótima combinação. Ambos são **totalmente gerenciados**, ou seja, a AWS **abstrai as tarefas operacionais** de servidor, permitindo que você **foque** no que é necessário para sua aplicação.

A arquitetura abaixo ilustra o **fluxo de dados** do **Amazon Data Firehose** até o **OpenSearch**.
![[Pasted image 20251109170020.png]]

Uma **fonte de dados** pode ser um **servidor web**, **dispositivo móvel** ou **dispositivo IoT**. A fonte **envia continuamente logs não estruturados** para o **Amazon Data Firehose**. Os logs ingeridos pelo Firehose são **processados e transformados** para um formato **estruturado** (ex.: **JSON**, **CSV**) por uma **AWS Lambda Function**. Após a **transformação bem-sucedida**, o **novo log estruturado** é **entregue ao OpenSearch**. Se algo der errado no processo de entrega, o **Amazon Data Firehose** enviará os dados para um **bucket S3 de backup** para **evitar perda de dados**.

---
## Service logs (VPC, ELB, API Gateway, S3, CloudFront)

Um conjunto de **recursos de log de serviços** da AWS que capturam tráfego e requisições em camadas de rede e aplicação, permitindo auditoria, troubleshooting, métricas e detecção de anomalias. Inclui **VPC Flow Logs**, **ELB/ALB logs**, **API Gateway execution/access logs**, **S3 server access & CloudTrail data events**, e **CloudFront standard & real-time logs**.

---

#### VPC Flow Logs

- **O que são**: capturam informações sobre o tráfego IP que entra/sai de **ENIs** em **VPC/Subnets/ENIs**.
- **Destino**: **CloudWatch Logs**, **S3** ou **Kinesis Data Firehose** (_delivery path/“subscription”_).
- **Formato/Exemplos**: registros agregados por intervalo com campos como `srcaddr`, `dstaddr`, `action`, `bytes` e marcadores como `NODATA`.
- **Automação**: habilitação em larga escala via **SSM Automation** (`AWSSupport-EnableVPCFlowLogs`).
- **Consulta**: query direta no **Athena** quando salvos em S3 (GZIP).

---

#### Elastic Load Balancing (ALB/CLB/NLB)

- **Access logs (ALB/CLB)**: detalham **hora, IP do cliente, latências, path, status, backend**; úteis para análise de tráfego e troubleshooting. **Gravação em S3** (requer bucket policy permitindo ELB escrever).
- **Connection logs (ALB)**: capturam **protocolo/cipher TLS, latência de handshake, status de conexão, detalhes de certificado do cliente**; ajudam a depurar **TLS/mTLS**.
- **Gateway Load Balancer**: recomenda uso de **VPC Flow Logs** nos ENIs do GWLB para visibilidade de tráfego.

---

#### Amazon API Gateway

- **Tipos de logs (REST APIs)**:
    - **Execution logging**: gerenciado pelo API Gateway, cria **CloudWatch Log Groups/Streams** e registra **requisições e respostas** da API.
    - **Access logging**: formato customizável por estágio, focado em **acessos** (método, path, status, latências, IP).
- **HTTP APIs**: criar **CloudWatch Log Group**, informar **ARN** e habilitar **access logging** no console/CLI.
- **Visualização**: logs acessíveis no **CloudWatch Console**.

---

#### Amazon S3

- **Opções de logging**:
    - **Server access logging**: registros detalhados de **requisições ao bucket** (úteis para auditoria, análise de uso, billing).
    - **CloudTrail logging**: **bucket-level** e **object-level (data events)** para rastrear **chamadas da API S3** (quem fez o quê/quando). **Recomendado** para ações no S3; _data events_ trazem mais contexto que server access.

---

#### Amazon CloudFront

- **Standard logs**: arquivos **W3C-like** com **33 campos** (ex.: `date`, `time`, `c-ip`, `cs(Host)`, `sc-status`, `sc-bytes`), entregues em **S3** (quase em tempo real).
- **Real-time logs**: entrega **em tempo real** para **Kinesis Data Streams** (seleção de **campos**, suporte a **CMCD**); **custos adicionais** além de Kinesis. Pode encadear com **Firehose** para S3/Redshift/OpenSearch.

---

#### Boas Práticas e Considerações

- **Destino adequado**: use **S3** para retenção barata e integração com **Athena/Glue**; use **CloudWatch Logs** para **alertas** e **pesquisa rápida**.
- **Permissões**: buckets de logs precisam de **bucket policy** permitindo escrita pelo serviço (ex.: ELB).
- **Custos**:
    - **VPC Flow Logs**: cobrança por **ingestão/armazenamento** em destino (CW Logs/S3).
    - **ELB Access/Connection logs**: sem custo do serviço, mas há **armazenamento/requests** do S3.
    - **API Gateway**: **CloudWatch Logs** cobrado por ingestão/armazenamento/queries.
    - **S3**: **server access logs** geram **requests adicionais** e ocupam **storage**; **CloudTrail data events** têm **cobrança por evento**.
    - **CloudFront**: **standard logs (S3)** cobram apenas S3; **real-time logs** têm **custo CloudFront** + **Kinesis**.
- **Escopo/limitações**: **DNS logs** do GuardDuty exigem uso do **resolver AWS**; para **CloudFront**, logs são **por distribuição** e **em UTC**. **API Gateway** REST vs HTTP tem **configurações de logging** distintas.

---

#### Casos de Uso

- **Segurança e Forense**: correlacionar **VPC Flow Logs** + **ALB Connection Logs** para investigar problemas de **TLS** e **origem de tráfego**; **S3 data events** para trilha de auditoria de objetos sensíveis.
- **Observabilidade de API**: **API Gateway access logs** para **latência por rota** e códigos de resposta; acione **métricas/alertas** no CloudWatch.
- **Análise quase em tempo real**: **CloudFront real-time logs → Kinesis → Firehose** para **S3/Redshift/OpenSearch** e criação de **dashboards** de performance/abuso.

---
## Preços do Amazon CloudWatch

- Cobrança pelo **número de métricas/mês**.

- Cobrança por **1.000 chamadas de API** do CloudWatch.

- Cobrança por **dashboard/mês**.

- Cobrança por **alarme por métrica** (Standard e High Resolution).

- Cobrança por **GB de logs** coletados, arquivados e analisados.

- **Sem cobrança de Data Transfer IN**, apenas **Data Transfer Out**.

- Cobrança por **milhão de eventos personalizados** e por **milhão de eventos cross-account**.

- Cobrança por **rule** e por **log events** que dão _match_ com sua regra.

- **Evidently**: cobrança por **1 milhão de eventos**.

- **RUM**: cobrança por **100k eventos**.

- **Logs Insights**: cobrado **por query**, com base na **quantidade de dados ingeridos** escaneados pela consulta.

## **Troubleshooting (Solução de Problemas)**

- Se sua instância **EC2** não estiver enviando ou parar de enviar **logs**, acesse essa instância e verifique se o **agent** ainda está em execução.

- Por padrão, o **CloudWatch agent** envia dados para o **CloudWatch Logs** pela **Internet pública**. Ao usar o CloudWatch agent, verifique se sua instância **EC2** tem **rota** para o **Internet Gateway/NAT Gateway**.

- Garanta que as **permissões IAM** usadas pelo **CloudWatch Logs agent** permitam **enviar eventos de log** (_put log events_) e **criar log groups e log streams** no **CloudWatch**.

- Se você não vir **CloudWatch logs** após executar uma **Lambda Function**, confirme que a **execution role** dela tem permissão para **gravar dados de log** no **CloudWatch Logs**.

### Misconfiguration

- Abra o arquivo de log do **awslogs** em **/var/log/awslogs.log**. Verifique os seguintes erros:
    
    - **NocredentialsError**
        
        - Certifique-se de **anexar uma IAM role** à sua instância EC2.
            
        - Como alternativa, atualize as **credenciais do usuário IAM** no arquivo **/etc/awslogs/awscli.conf**.
            
    - **AccessDeniedError**
        
        - Garanta que você tenha as **permissões corretas** para o **CloudWatch Logs**.
            
- Verifique se as **regras de rotação de logs do seu SO** são suportadas.
    
- Verifique **duplicidades** na seção logstream do **arquivo de configuração do agente**.
    

---

### Insufficient Permissions

- Verifique se a **IAM role da instância** possui as permissões necessárias:
    
    - **logs:CreateLogGroup** – cria um **log group** que contém o **log stream**.
        
    - **logs:CreateLogStream** – cria um **log stream** (a **sequência de eventos de log** gerados por um recurso).
        
    - **logs:PutLogEvents** – envia (**upload**) um **lote de eventos de log** para o log stream.
        
    - **logs:DescribeLogStreams** – lista **todos os log streams** de um **log group** específico.
        

---

### Connection Problems

- Verifique a configuração do seu **security group** e da **network ACL** e confirme se há **acesso à Internet pública**.

> [[AWS Security Specialty - SCS-C02]]: Ao fazer a prova, a maioria questões de **(troubleshooting)** que você encontrará envolve três coisas: **configuração incorreta**, **permissões insuficientes** e **problemas de conexão**. Portanto, mesmo que você não consiga identificar exatamente a resposta de um item, ainda poderá eliminar algumas alternativas  se lembrar desses três pontos.