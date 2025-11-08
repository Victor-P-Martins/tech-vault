#Management #Performance

O **AWS Trusted Advisor** analisa seu ambiente AWS e fornece recomendações de **boas práticas** em cinco categorias: **Cost Optimization**, **Performance**, **Security**, **Fault Tolerance** e **Service Limits**. O acesso ao conjunto completo de checks está disponível nos planos **Business**, **Enterprise On-Ramp** e **Enterprise Support**.

---

### Funcionalidades

- **Cost Optimization** – identifica recursos não utilizados e oportunidades para **reduzir custos**.
    
- **Performance** – recomendações para **melhorar a velocidade e responsividade** das aplicações.
    
- **Security** – recomenda **configurações e controles** que elevam a postura de segurança na AWS.
    
- **Fault Tolerance** – destaca **lacunas de redundância**, limites atuais e recursos sobreutilizados.
    
- **Service Limits** – exibe **limites de uso vigentes** para serviços e recursos AWS, ajudando a evitar _throttling_.
    

**Status no dashboard (summary checks):**

- **Action recommended (vermelho)** – ação recomendada.
    
- **Investigation recommended (amarelo)** – potencial problema detectado.
    
- **No problems detected (verde)** – nenhum problema identificado.
    
- **Excluded items (cinza)** – itens excluídos do check por você.
    

**Acesso por plano:**

- **Business / Enterprise On-Ramp / Enterprise:** acesso a **todos os checks** via **AWS Support API** e **AWS CLI**.
    
- **Basic / Developer:** acesso, via **console**, aos checks **centrais de segurança** e de **service limits**.
    

---

### Como Funciona

- O Trusted Advisor executa **checks automatizados** nas cinco categorias e exibe um **dashboard** com o status por conta/região.
    
- Você pode operar os checks pelo **console** ou pela **AWS Support API** (endpoint: **[https://support.us-east-1.amazonaws.com](https://support.us-east-1.amazonaws.com)**).
    
- Com **organizational view**, é possível **agregar resultados** e **gerar relatórios** para **todas as contas-membro** da sua AWS Organization.
    

---

### Conceitos

- **AWS Support API** – expõe dois grupos de operações:
    
    - **Support case management** – criação, acompanhamento e resolução de **casos de suporte**.
        
    - **Trusted Advisor** – operações para **listar/atualizar/pollear/obter resultados** de checks.
        
- **Trusted Advisor check** – validação automatizada em uma categoria (ex.: **Underutilized Amazon EC2 Instances**, **Service Limits**, etc.).
    
- **Organizational view** – visão agregada dos checks em **todas as contas-membro**.
    
- **Excluded items** – **recursos ignorados** por um check específico.
    

---

### Acesso e Planos

- **Business, Enterprise On-Ramp, Enterprise:** acesso **completo** aos checks e à **AWS Support API/CLI**.
    
- **Basic e Developer:** acesso **limitado** no **console** (core security + service limits).
    

---

### Operações via API (Trusted Advisor)

Com as operações do **Trusted Advisor** na **AWS Support API**, você pode automatizar:

- **Listar** checks disponíveis.
    
- **Atualizar (refresh)** a lista de checks.
    
- **Poll** para **mudanças de status** dos checks.
    
- **Solicitar** o **resultado** de um check.
    
- **Imprimir/consultar detalhes** de um check específico.
    

> Endpoint da AWS Support API: **[https://support.us-east-1.amazonaws.com](https://support.us-east-1.amazonaws.com)**

---

### Organizational View e Dashboards

Para **relatórios centralizados** e **visualização**:

- **Amazon S3** – armazenamento do relatório **`resources.json`**.
    
- **AWS CloudFormation** – _template_ que cria os recursos para que serviços acessem o relatório no S3.
    
- **Amazon Athena** – **consulta e análise** dos resultados no bucket S3.
    
- **Amazon QuickSight** – **dashboard** para visualizar os resultados.
    

---

### Integrações e Recursos Relacionados

- **AWS Compute Optimizer** – exibe **as mesmas recomendações** de otimização de computação que você vê nos checks correspondentes do Trusted Advisor.
    
- **Trusted Advisor Priority** – sua **equipe da conta AWS** pode monitorar proativamente e **priorizar recomendações** quando surgirem oportunidades.
    
    - **Fontes de recomendações:**
        
        - **Serviços AWS** – [[AWS Trusted Advisor]], **[[AWS Security Hub]]**, **AWS Well-Architected** geram recomendações automaticamente.
            
        - **Sua account team** – cria recomendações **manuais** para riscos encontrados na conta.
            

---

### Segurança (Security)

- Controle de acesso via **IAM policies** (incluindo **organizational view** para múltiplas contas).
    
- Integração com **[[AWS Security Hub]]** para **ver status de checks**, **listar recursos afetados** e **seguir recomendações** para remediação.
    

---

### Monitoring

- **Amazon EventBridge** – detecta **mudanças de status** dos checks e aciona **alvos** conforme suas regras (requer **AWS Support plan**).
    
- **Amazon CloudWatch** – crie **alarms** para mudanças nas **métricas** do Trusted Advisor.
    
- **AWS CloudTrail** – registra um **subconjunto** de ações do console e da API do Trusted Advisor como **eventos**.
    

---

### Pricing

- O plano **Basic** já vem incluso na conta.
    
- Você **paga somente** se optar por **Developer**, **Business**, **Enterprise On-Ramp** ou **Enterprise Support**.
    

---

### Limitações

- Em **Basic/Developer**, o acesso é **apenas** aos **security core checks** e **service limits** no **console** (sem API completa).
    
- A **AWS Support API** para Trusted Advisor está disponível na região **us-east-1**.
    

---

### Casos de uso comuns

- **Triagem contínua** de postura de **custo, performance e segurança**.
    
- **Monitoramento** de **limites de serviço** para evitar interrupções por _throttling_.
    
- **Automação** de inventário e **relatórios organizacionais** (S3 + Athena + QuickSight).
    
- **Integração** com **EventBridge/CloudWatch** para **alertas** e **remediação**.