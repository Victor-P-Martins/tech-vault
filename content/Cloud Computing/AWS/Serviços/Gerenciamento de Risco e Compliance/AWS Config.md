# O que é AWS Config?

Um serviço totalmente gerenciado que fornece a você um inventário de recursos AWS, histórico de configurações e notificações de alterações de configuração para habilitar segurança e governança.

---

### Funcionalidades

- **Agregação de dados multi-conta e multi-região** dá a você uma visão em nível corporativo do status de conformidade das regras do Config, e você pode associar sua organização AWS para adicionar rapidamente suas contas.

- Fornece **regras pré-construídas** para avaliar as configurações dos seus recursos AWS e mudanças de configuração, ou criar suas próprias **regras customizadas** em AWS Lambda que definem suas melhores práticas e diretrizes internas para configuração de recursos.

- O Config registra detalhes de alterações nos seus recursos AWS para fornecer um histórico de configuração e os entrega automaticamente em um bucket [[S3 (Amazon Simple Storage Service)]] que você especificar.

- Receba uma **notificação** sempre que um recurso for criado, modificado ou deletado.

- O Config permite gravar mudanças de configuração de software dentro das suas instâncias [[Elastic Compute Cloud (EC2)]] e servidores on-premises, bem como servidores e Máquinas Virtuais em ambientes de outros provedores de nuvem. Você ganha visibilidade em:
    - Configurações do sistema operacional
    - Atualizações de sistema
    - Aplicativos instalados
    - Configuração de rede

- O Config pode fornecer a você um **snapshot de configuração** – uma captura pontual de todos os seus recursos e suas configurações.

- O Config descobre, mapeia e acompanha os **relacionamentos de recursos AWS** na sua conta.
    - Ex.: instâncias EC2 e Security Groups associados.

---

### Conceitos

- **Histórico de Configuração (Configuration History)**
    
    Uma coleção de _configuration items_ (itens de configuração) para um dado recurso em qualquer período de tempo, contendo informações como quando o recurso foi criado pela primeira vez, como foi configurado no último mês, etc.
    
    - O Config entrega automaticamente um arquivo de histórico de configuração para cada tipo de recurso gravado em um bucket S3 que você especificar.
    - Um arquivo de histórico é enviado a cada **seis horas** para cada tipo de recurso que o Config grava.

- **Configuration Item (Item de Configuração)**
    
    Um registro da configuração de um recurso na sua conta AWS.    
	O Config cria um _configuration item_ sempre que detecta uma mudança em um tipo de recurso que está gravando.
	
	Os componentes de um _configuration item_ incluem: metadados, atributos, relacionamentos, configuração atual e eventos relacionados.
    
- **Configuration Recorder (Gravador de Configuração)**
    
	Armazena as configurações dos recursos suportados em sua conta como _configuration items_.
    
    - Por padrão, grava todos os recursos suportados na região em que o Config está rodando.
    - Você pode criar um gravador customizado para registrar apenas os tipos de recursos que especificar.
    - Também pode gravar recursos globais suportados, como usuários IAM, grupos, roles e policies gerenciadas pelo cliente.

- **Configuration Snapshot (Snapshot de Configuração)**
    
    Uma visão completa dos recursos que estão sendo gravados e suas configurações.
    
    Armazenado em um bucket S3 que você especificar.
    
- **Configuration Stream (Fluxo de Configuração)**
    
    Uma lista atualizada automaticamente de todos os _configuration items_ dos recursos gravados pelo Config.
    
    Útil para observar alterações conforme acontecem, detectar problemas potenciais, gerar notificações se certos recursos forem alterados ou atualizar sistemas externos que precisam refletir a configuração dos seus recursos AWS.
    
- **Configuration Item (Item de Configuração)**
    
    A configuração de um recurso em um ponto específico no tempo.
    
    Um _CI_ consiste em 5 seções:
    
    - Informações básicas sobre o recurso comuns entre diferentes tipos de recurso
    - Dados de configuração específicos do recurso
    - Mapa de relacionamentos com outros recursos
    - IDs de eventos do CloudTrail relacionados a este estado
    - Metadados que ajudam a identificar informações sobre o CI (como versão e momento em que foi capturado)

- **Relacionamento de Recursos (Resource Relationship)**
    
	O Config descobre recursos AWS em sua conta e cria um mapa dos relacionamentos entre eles.
    
- **Config Rule (Regra do Config)**
    
	Representa suas configurações desejadas para recursos AWS específicos ou para uma conta inteira.
    
    - Fornece regras pré-definidas e customizáveis.
    - Se um recurso violar uma regra, o Config marca o recurso e a regra como **não conformes** (_noncompliant_) e notifica você via [[Amazon SNS]].
    - Avalia seus recursos em resposta a mudanças de configuração ou periodicamente.

- **Conformance Packs**
    
	Uma coleção de regras e ações de remediação.
    
    - Criados usando um template YAML com lista de regras (gerenciadas ou customizadas) e ações de remediação.
	- Os processos de checagem permitem listar conformidade de requisitos e ações em um único local.

- **Retenção de Dados**
    
    O Config exclui dados mais antigos que o período de retenção especificado.
    Período padrão: **7 anos**.
    
- **Agregação Multi-Conta Multi-Região**
    
    Um agregador coleta dados de configuração e conformidade de:
    
    - Múltiplas contas e múltiplas regiões
    - Uma única conta e múltiplas regiões
    - Uma organização no AWS Organizations e todas as contas dessa organização

---

### Monitoramento do AWS Config

- Use **[[Amazon SNS]]** para enviar notificações sempre que um recurso suportado for criado, atualizado ou modificado como resultado de atividade de API do usuário.
- Use **Amazon CloudWatch Events (EventBridge)** para detectar e reagir a mudanças no status de eventos do AWS Config.
- Use **AWS CloudTrail** para capturar chamadas de API para o Config.

---

### Segurança no AWS Config

- Use **IAM** para criar usuários individuais para quem precisa de acesso ao Config e conceda permissões diferentes para cada usuário IAM.

---

### Conformidades do AWS Config

- ISO
- PCI DSS
- HIPAA
- FedRAMP

---

### Preços do AWS Config

- A cobrança é baseada em:
    - Número de _configuration items_ gravados
    - Número de avaliações de regras do AWS Config gravadas (não no número de regras ativas por região)
    - Número de avaliações de _conformance packs_ por região
- Você é cobrado apenas uma vez pelo registro de um _configuration item_.