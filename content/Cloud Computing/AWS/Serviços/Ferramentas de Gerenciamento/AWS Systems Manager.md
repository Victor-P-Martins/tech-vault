#Management 

O **AWS Systems Manager (SSM)** permite **centralizar dados operacionais** de múltiplos serviços AWS e **automatizar tarefas** em todos os seus recursos. Ele cria **grupos lógicos de recursos**, coleta **inventário de software**, aplica **patches em escala**, oferece **shell/CLI no navegador** sem portas de entrada, e integra-se diretamente ao **IAM** para controle de acesso detalhado. O **SSM Agent** processa solicitações do Systems Manager e deve estar instalado nas instâncias (em AMIs novas já vem por padrão; em versões antigas, instale manualmente).

---
## Funcionalidades

- Crie grupos lógicos de recursos, como aplicações, diferentes camadas de um _application stack_ ou ambientes de produção versus desenvolvimento.
    
- Você pode selecionar um **resource group** e ver sua atividade recente de API, alterações de configuração de recursos, notificações relacionadas, alertas operacionais, inventário de software e status de conformidade de patches.
    
- **Coleta informações** sobre suas instâncias e o software instalado nelas.
    
- Permite **automatizar com segurança** tarefas comuns e repetitivas de operações e gerenciamento de TI em recursos AWS.
    
- Fornece um **shell interativo e CLI baseados em navegador** para gerenciar instâncias Windows e Linux do EC2, sem a necessidade de abrir portas de entrada, gerenciar chaves SSH ou usar _bastion hosts_. Administradores podem **conceder e revogar acesso** às instâncias em um local central usando **políticas do IAM**.
    
- Ajuda a garantir que seu software esteja **atualizado** e atenda às suas **políticas de conformidade**.
    
- Permite **agendar janelas de tempo** para executar tarefas administrativas e de manutenção em suas instâncias.
    
- **SSM Agent** é a ferramenta que processa solicitações do Systems Manager e configura sua máquina conforme especificado na solicitação. O SSM Agent deve estar instalado em cada instância que você deseja usar com o Systems Manager. Em AMIs e tipos de instância mais novos, o SSM Agent é instalado por padrão. Em versões mais antigas, você deve instalá-lo manualmente.

## Capacidades
### Automação

- Permite **automatizar com segurança** tarefas comuns e repetitivas de operações e gerenciamento de TI em recursos AWS.
    
- Um **step** é definido como uma ação iniciada executada na _Automation_ por alvo. Você pode executar todo o **documento de automação** do Systems Manager em uma ação ou optar por executar **um passo por vez**.

	**Conceitos**
	
	- **Automation document** - Define o fluxo de trabalho de **Automation**.
	    
	- **Automation action** - O fluxo de trabalho de **Automation** inclui um ou mais **steps**. Cada step está associado a uma ação ou _plugin_. A ação determina as **entradas**, **comportamento** e **saídas** do step.
	    
	- **Automation queue** - Se você tentar executar **mais de 25 Automations simultaneamente**, o Systems Manager adiciona as execuções adicionais a uma fila e exibe o status **Pending**. Quando uma Automation atinge um estado terminal, a primeira execução na fila é iniciada.
	    
- Você pode **agendar** a execução de documentos de Automation do Systems Manager.
### Resource Groups

- Uma coleção de **recursos AWS na mesma região**, que correspondem aos critérios fornecidos em uma consulta.
    
- Use ferramentas do Systems Manager, como **Automation**, para **simplificar tarefas de gerenciamento** em seus grupos de recursos. Você também pode usar grupos como base para visualizar **monitoramento** e **insights de configuração** no Systems Manager.
### Built-in insights

- Mostram informações detalhadas sobre um **único resource group** selecionado.
    
- Incluem **chamadas de API recentes** via **CloudTrail**, **alterações de configuração recentes** via **Config**, listagens de **inventário de software** de instâncias, **visões de conformidade de patches** de instâncias e **visões de conformidade de configuração** de instâncias.

### System Manager Activation

- **Habilite gerenciamento híbrido e multicloud**. Você pode **registrar qualquer servidor**, seja físico ou virtual, para ser gerenciado pelo Systems Manager.

### Inventory Manager

- **Automatiza** o processo de **coletar inventário de software** de instâncias gerenciadas.
    
- Você **especifica o tipo de metadado** a coletar, **de quais instâncias** o metadado deve ser coletado e um **cronograma** para a coleta.

### Configuration Compliance

- Analisa sua frota de instâncias gerenciadas quanto à **conformidade de patches** e **inconsistências de configuração**.
    
- Veja **histórico de conformidade** e **rastreamento de alterações** para dados de _patching_ do **Patch Manager** e associações do **State Manager** usando o **AWS Config**.
    
- **Customize** o Systems Manager Compliance para **criar seus próprios tipos de conformidade**.

### Run Command

- **Gerencie remotamente e com segurança** a configuração de suas instâncias gerenciadas em escala.
    
- **Managed Instances** – qualquer instância **EC2** ou **servidor/VM on-premises** em seu ambiente híbrido configurado para o Systems Manager.

### Session Manager

- Gerencie suas instâncias EC2 por meio de um **shell baseado em navegador com um clique** ou através da **AWS CLI**.
    
- Facilita o cumprimento de políticas corporativas que exigem **acesso controlado** às instâncias, **práticas de segurança rigorosas** e **logs totalmente auditáveis** com detalhes de acesso às instâncias, ao mesmo tempo em que oferece aos usuários finais um **acesso simples e multiplataforma** com um clique às suas instâncias Amazon EC2.
    
- Você pode usar o **AWS Systems Manager Session Manager** para **tunelar tráfego SSH e SCP** entre um cliente e um servidor.

### Distributor

- Permite **empacotar seu próprio software** ou encontrar **pacotes de agentes fornecidos pela AWS** para instalar em instâncias gerenciadas pelo Systems Manager.
    
- Depois de criar um pacote no **Distributor**, o que cria um **documento do Systems Manager**, você pode instalar o pacote de uma das seguintes maneiras:
    
    - **Uma vez**, usando o **Systems Manager Run Command**.
        
    - **Agendado**, usando o **Systems Manager State Manager**.

### Patch Manager

- **Automatiza** o processo de **aplicar patches** às suas instâncias gerenciadas.
    
- Permite **escaneamento** de instâncias em busca de patches ausentes e **aplicação** de patches ausentes individualmente ou para **grupos grandes** de instâncias usando **tags** de instância do EC2.
    
- Para patches de segurança, o Patch Manager usa **_patch baselines_** que incluem regras para **aprovação automática de patches** dentro de dias após seu lançamento, bem como uma lista de **patches aprovados e rejeitados**.
    
- Você pode usar o **AWS Systems Manager Patch Manager** para **selecionar e aplicar patches de aplicativos Microsoft automaticamente** em suas instâncias Amazon EC2 ou on-premises.
    
- O AWS Systems Manager Patch Manager inclui **identificadores comuns de vulnerabilidade (CVE ID)**. CVE IDs podem ajudar a **identificar vulnerabilidades de segurança** dentro da sua frota e **recomendar patches**.
    
- Você pode **configurar ações** a serem executadas em uma instância gerenciada **antes e depois** de instalar patches.

### Maintenance Window

- Configure **agendamentos recorrentes** para que instâncias gerenciadas **executem tarefas administrativas** como instalação de patches e atualizações **sem interromper operações críticas**.
    
- Suporta a execução de **quatro tipos de tarefas**:
    
    - **Comandos do Systems Manager Run Command**
        
    - **Workflows do Systems Manager Automation**
        
    - **Funções AWS Lambda**
        
    - **Tarefas do AWS Step Functions**
        
- Cada maintenance window contém um **cronograma**, **duração máxima**, **conjunto de alvos** e **tarefas**.

### Systems Manager Document (SSM)

Define as ações que o Systems Manager executa.

#### Types of SSM Documents

| Tipo                    | Usar com                   | Detalhes                                                                                                                                                                                                                                                                      |
| ----------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Command document**    | Run Command, State Manager | **Run Command** usa command documents para executar comandos. **State Manager** usa command documents para aplicar uma configuração. Essas ações podem ser executadas em um ou mais alvos em qualquer ponto do ciclo de vida de uma instância.                                |
| **Policy document**     | State Manager              | **Policy documents** aplicam uma política em seus alvos. Se o policy document for removido, a ação de política não ocorre mais.                                                                                                                                               |
| **Automation document** | Automation                 | Use **automation documents** ao realizar tarefas comuns de manutenção e implantação, como **criar ou atualizar uma AMI**.                                                                                                                                                     |
| **Package document**    | Distributor                | No **Distributor**, um **pacote** é representado por um documento do Systems Manager. Um **package document** inclui arquivos ZIP anexados que contêm software ou ativos para instalar em instâncias gerenciadas. Criar um pacote no Distributor cria o **package document**. |

- Pode estar em **JSON** ou **YAML**.
    
- Você pode **criar e salvar diferentes versões** de documentos. Em seguida, pode especificar uma **versão padrão** para cada documento.
    
- Se você deseja **customizar os steps e ações** em um documento, pode **criar o seu próprio**.
    
- Você pode **marcar (tag)** seus documentos para ajudar a identificar rapidamente um ou mais documentos com base nas **tags** atribuídas.

### State Manager

- Um serviço que **automatiza** o processo de manter sua infraestrutura **EC2 e híbrida** em um **estado que você define**.
    
- Uma **State Manager association** é uma configuração atribuída às suas instâncias gerenciadas. A associação define o **estado** que você deseja **manter** em suas instâncias. A associação também especifica **ações** a serem tomadas ao aplicar a configuração.

### Parameter Store

- Fornece **armazenamento seguro e hierárquico** para **dados de configuração** e **gerenciamento de segredos**.
    
- Você pode armazenar valores como **texto simples** ou **dados criptografados** com **SecureString**.
    
- **Parâmetros** funcionam com recursos do Systems Manager como **Run Command**, **State Manager** e **Automation**.

### OpsCenter

- O **OpsCenter** ajuda você a **visualizar, investigar e resolver** problemas operacionais relacionados ao seu ambiente de um **local central**.
    
- O OpsCenter **complementa** sistemas existentes de gerenciamento de casos, habilitando integrações via **Amazon SNS** e **SDKs públicos da AWS**. Ao **agregar informações** do **AWS Config**, **logs do AWS CloudTrail**, **descrições de recursos** e **Amazon CloudWatch Events**, o OpsCenter ajuda a **reduzir o MTTR** de incidentes, alarmes e tarefas operacionais.

### Change Manager

- Um **framework de gerenciamento de mudanças** corporativo para **solicitar, aprovar, implementar e reportar** mudanças operacionais na **configuração da aplicação** e **infraestrutura**.
    
- A partir de uma **conta de administrador delegado**, se você usar **AWS Organizations**, é possível **gerenciar mudanças** em **múltiplas contas AWS** e em **Regiões AWS**. Alternativamente, usando uma **conta local**, você pode gerenciar mudanças para **uma única conta AWS**.
    
- Pode ser usado para **recursos AWS e on-premises**.
    
- Para cada **change template**, você pode adicionar **até cinco níveis de aprovadores**. Quando é hora de implementar uma mudança aprovada, o **Change Manager** executa o **runbook de Automation** especificado na **change request** associada.

### Incident Manager

- **Mitigue e recupere** de incidentes que afetam suas aplicações hospedadas na AWS.
    
- **Fases do ciclo de vida do incidente**:
    - **Alerting and engagement**
    - **Triage**
    - **Investigation and mitigation**
    - **Post-incident analysis**

### Explorer

- Um **dashboard de operações customizável** para exibir as seguintes informações:
    
    - **Operations data (OpsData)**
        
    - **Operational work items (OpsItems)**
        
- Suporta a exibição de **múltiplas contas** ou **regiões**.
    
- Relatórios podem ser **exportados** para um **bucket Amazon S3**.

### AppConfig

- **Crie, gerencie e faça o deploy** de configurações de aplicação rapidamente.
    
- Suporta **deployments controlados** para aplicações, incluindo **validações embutidas** e **monitoramento**.

### Application Manager

- Ajuda a **investigar e remediar** problemas com recursos AWS.
    
- Exibe muitos tipos de **informações de operações** no **contexto de uma aplicação**.

### Fleet Manager

- **Gerencie remotamente** nós executando na **AWS** ou **on-premises**.
    
- **Node fleet** e **clusters Amazon ECS**.
    
- **Monitore** a saúde e o desempenho de **toda a sua frota de servidores**.

### Compliance

- Faça _scan_ de uma frota de **nós gerenciados** para **conformidade de patches** e **inconsistências de configuração**.
    
- Fornece **dados atuais de conformidade** sobre _patching_ no **Patch Manager** e **associações** no **State Manager**.
    
- **Gere relatórios** de toda a frota exportando dados para **Amazon Athena** e **QuickSight**.

### AWS Systems Manager Monitoring

- O **SSM Agent** grava informações sobre **execuções**, **ações agendadas**, **erros** e **status de saúde** em **arquivos de log** em cada instância. Para monitoramento mais eficiente da instância, você pode **configurar** o próprio **SSM Agent** ou o **CloudWatch Agent** para enviar esses **logs** ao **CloudWatch Logs**.
    
- Usando o **CloudWatch Logs**, você pode **monitorar logs em tempo real**, **pesquisar e filtrar** dados de log criando um ou mais **metric filters**, e **arquivar/recuperar** dados históricos quando necessário.
    
- **Registre** chamadas da **API do Systems Manager** com **CloudTrail**.
    
- Você pode usar o **Amazon EventBridge** para **executar um alvo** quando quaisquer alterações ou outras condições ocorrerem.
    
- Você pode usar o **Amazon SNS** para fornecer **notificações** sobre o **status de comandos** enviados via **Run Command** ou **Maintenance Windows**.

### AWS Systems Manager Security

- O **Systems Manager** é **vinculado diretamente ao IAM** para **controles de acesso**.

### AWS Systems Manager Pricing

- Para **seus próprios pacotes**, você **paga apenas pelo que usar**. Ao **transferir um pacote** para o **Distributor**, você será cobrado com base no **tamanho** e **duração de armazenamento** desse pacote, no **número de chamadas de API Get e Describe** realizadas e na **quantidade de transferência de dados** **_out-of-Region_** e **on-premises** de saída do Distributor para esses pacotes.
    
- Você é cobrado com base no seguinte:
    
    - **Número e tipo de Automation steps**.
        
    - **Número de OpsItems**, **change requests** e **API requests**.
        
    - **OpsItems criados** e **runbook steps executados**.
        
    - **Número de configuration requests enviadas e recebidas**.
        
    - **Número de advanced parameters armazenados** e **instâncias ativadas**.