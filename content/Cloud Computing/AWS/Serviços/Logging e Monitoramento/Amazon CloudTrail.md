O **AWS CloudTrail** é o serviço de auditoria de APIs da AWS que registra ações feitas via Console, CLI, SDKs e serviços. Por padrão, mantém até 90 dias no Event History e, com **trails**, envia logs para [[S3 (Amazon Simple Storage Service)]] (com opção de [[AWS KMS]], [[Amazon SNS]] e integração com **[[Amazon CloudWatch]] Logs**). Registra **Management events** (padrão), **Data events** (opt-in) e **Insights** (anomalias). O **CloudTrail Lake** agrega, armazena de forma imutável e permite consultas aos logs. É essencial para compliance, investigações forenses e detecção de atividade incomum.

- Ações feitas por um **usuário**, **role** ou **serviço AWS** no **AWS Management Console**, **AWS CLI**, **SDKs** e **APIs** são registradas como **events**.
- O **CloudTrail** é **habilitado** na sua conta AWS **ao criá-la**.
- O CloudTrail foca em **auditoria de atividade de APIs**.
- Veja **Event History** para **visualizar, pesquisar e baixar** os **últimos 90 dias** de atividade da sua conta.
- O **CloudTrail Lake** permite **agregar**, **armazenar de forma imutável** e **consultar** seus **activity logs** (pode ser habilitado via **SDKs** e **CLI**).
- **CloudTrail Insights** ajuda a identificar **atividade incomum** (picos de provisionamento, rajadas de ações do **AWS IAM**).  

---

## Trails

Crie um **CloudTrail trail** para **arquivar**, **analisar** e **responder** a mudanças nos seus recursos AWS.

**Tipos**

- **Trail que se aplica a todas as regiões** _(padrão no console)_ – o CloudTrail registra eventos em **cada região** e entrega os arquivos de log em um **bucket S3** que você especificar.
    
- **Trail que se aplica a uma única região** _(padrão no CLI/API)_ – o CloudTrail registra eventos **apenas** na região especificada.
    
- **Organization trail** – registra eventos de **todas as contas** de uma **AWS Organization**; deve ser criado na **management account**.
    

**Criptografia e retenção**

- Por padrão, os arquivos de log do CloudTrail são criptografados com **[[SSE-S3 Encryption]]**. Você pode optar por **KMS (AWS Key Management Service)**.
    
- Armazene logs no seu **S3** pelo tempo que quiser e defina **S3 lifecycle rules** para **arquivar** ou **excluir** automaticamente.
    
- Para notificações sobre **entrega** e **validação** de arquivos de log, configure **Amazon SNS**.
    
- O CloudTrail publica arquivos de log **aproximadamente a cada 5 minutos**.
    

---

## Events

Registro de uma atividade em uma conta AWS (ação de **usuário**, **role** ou **serviço**) monitorável pelo CloudTrail.

**Tipos**

- **Management events** _(logados por padrão)_ – operações de **plano de controle** (gestão de recursos).
    
- **Data events** _(não logados por padrão)_ – operações de **plano de dados** realizadas **em** ou **dentro** de um recurso; costumam ser **alto volume**.
    
- **Insights events** _(não logados por padrão)_ – capturam **atividade incomum**; quando habilitado, o CloudTrail detecta e **loga no S3** com dados como **API associada**, **hora do incidente** e **estatísticas**. São gerados **apenas** quando o uso de API **difere significativamente** do padrão da conta.
    

**Serviços globais**

- Para serviços globais (por exemplo,[[AWS IAM Identity Center]], [[AWS Security Token Service]], [[Amazon Cloudfront]], [[Amazon Route 53]]), eventos são entregues a trails que **incluem global services**, e são registrados como ocorrendo em **US East (N. Virginia)**.
    

**Filtragem**

- Filtre por **Time range** e atributos como **Event name**, **User name**, **Resource name**, **Event source**, **Event ID** e **Resource type**.
    

---

## AWS CloudTrail Monitoring

- Use **Logs** para **monitorar** dados de log. **Eventos do CloudTrail** enviados ao CloudWatch Logs podem **disparar alarmes** com base em **metric filters**.
    
- Para verificar se um arquivo de log foi **modificado**, **excluído** ou **permanece íntegro** após a entrega, utilize a **log file integrity validation** do CloudTrail.
    

---

## Preços (AWS CloudTrail Price)

- A **primeira cópia** de **management events** em cada região é **gratuita**; **cópias adicionais** são cobradas.
    
- **Data events** são registrados e cobrados **apenas** para as **Lambda functions**, **DynamoDB tables** e **S3 buckets** que você **especificar**.
    
- Após configurar um **trail**, aplicam-se cobranças do [[S3 (Amazon Simple Storage Service)]] conforme o uso, já que o CloudTrail entrega logs em um **bucket S3**.

|Recurso|Limite padrão|Comentários|
|---|--:|---|
|**Trails por região**|5|Um trail **all-regions** conta como **um** trail em **cada região**. Não pode ser aumentado.|
|**APIs Get/Describe/List**|10 TPS|Máximo de requisições por segundo sem throttling. Não pode ser aumentado.|
|**LookupEvents API**|2 TPS|Máximo de requisições por segundo sem throttling. Não pode ser aumentado.|
|**Demais APIs**|1 TPS|Máximo de requisições por segundo sem throttling. Não pode ser aumentado.|
|**Event data stores (CloudTrail Lake)**|5 por região|Não pode ser aumentado.|
|**Event selectors**|5 por trail|Não pode ser aumentado.|
|**Advanced event selectors**|500 condições (total)|Soma das condições em todos os advanced selectors. Não pode ser aumentado.|
|**Data resources em event selectors**|250 (total por trail)|Total **across all event selectors** ≤ **250**. O limite por **event selector individual** é configurável até **250**, **desde que** o total no trail **não exceda 250**. Não pode ser aumentado.|