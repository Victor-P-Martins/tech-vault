#Security 

O Amazon Detective é um serviço que **agrega e modela logs** (CloudTrail, VPC Flow Logs, GuardDuty, etc.) usando **ML, análise estatística e teoria de grafos** para criar um **“behavior graph”** interativo que acelera **investigações de segurança** e identificação de causa raiz.

---
### Funcionalidades

- O serviço coleta automaticamente logs dos seus recursos AWS e usa machine learning, análise estatística e graph theory para construir um conjunto de dados ligado (linked) que permite conduzir investigações de segurança mais rápidas e eficientes.

- **Integrações nativas** com [[Amazon GuardDuty]], [[Amazon Macie]] e [[AWS Security Hub]], além de produtos parceiros, para receber/relacionar _findings_.

- O Amazon Detective pode analisar trilhões de eventos de múltiplas fontes de dados, como VPC Flow Logs, [[Amazon CloudTrail]] e Amazon GuardDuty, e cria automaticamente uma visão unificada e interativa dos seus recursos, usuários e das interações entre eles ao longo do tempo. Isso permite identificar as razões subjacentes dos findings, fazer drill-down em atividades históricas relevantes e determinar rapidamente a root cause de uma preocupação de segurança.

- **Habilitação por região** e **modo multi-conta** (conta de gerenciamento + contas membros) no mesmo modelo do GuardDuty/Security Hub.

- **Ingestão retroativa**: ao habilitar com GuardDuty ativo, processa **duas semanas de logs históricos** automaticamente.

### Como Funciona
![[Pasted image 20251031162027.png]]

Constrói um **behavior graph** a partir das fontes (CloudTrail, VPC Flow, GuardDuty), correlacionando entidades, relacionamentos e _findings_ para permitir navegação temporal e análise de causa.

### Conceitos
- **Investigation (investigação)** – Processo de triagem de atividade suspeita ou interessante, determinando o escopo, a fonte/causa subjacente e como proceder.
    
- **Behavior graph (grafo de comportamento)** – Conjunto de dados ligados gerado a partir de dados de origem que estão associados a uma ou mais contas AWS. Cada behavior graph usa a mesma estrutura de findings, entities e relationships.
    
- **Management account (conta de gerenciamento)** – Conta AWS que é dona de um behavior graph e o utiliza para investigação. A management account convida member accounts a contribuir com seus dados para o behavior graph. Também pode ver o uso de dados e remover member accounts do behavior graph.
    
- **Member account (conta membro)** – Conta AWS que uma management account convidou para contribuir dados a um behavior graph. Member accounts podem responder ao convite e remover sua conta do behavior graph. Eles não têm outro acesso ao behavior graph.
    
- **Finding** – Problema de segurança detectado pelo Amazon GuardDuty.
    
- **Entity (entidade)** – Item extraído dos dados de origem. Cada entity tem um tipo que identifica o tipo de objeto que representa. Exemplos: endereços IP, instâncias Amazon EC2 e usuários AWS. As propriedades da entity são preenchidas a partir dos registros de origem, direta ou agregadamente.
    
- **Relationship (relação)** – Atividade que ocorre entre entities individuais. Relationships também são extraídas dos dados de origem. Assim como uma entity, uma relationship tem um tipo, que identifica os tipos de entities envolvidos e a direção da conexão. Ex.: um endereço IP conectando-se a uma instância Amazon EC2.
    
- **Profile (perfil)** – Para um finding ou uma entity, é uma página única que oferece um conjunto de visualizações de dados e orientações de apoio.
    
    - Para findings, profiles ajudam analistas a determinar se o finding é uma preocupação genuína ou um false positive.
        
    - Para entities, profiles fornecem detalhes de suporte para uma investigação de um finding ou para uma busca geral por atividade suspeita.
        
- **Scope time (janela de escopo)** – Intervalo de tempo usado para delimitar os dados exibidos nos profiles de findings e entities. O padrão para finding profile reflete os primeiros e últimos momentos em que a atividade suspeita foi observada. O padrão para entity profile são as últimas 24 horas.

### Habilitação e contas

- O Amazon Detective precisa ser habilitado por região (per region) e permite analisar rapidamente atividades em todas as suas contas dentro de cada região.

- É um serviço multi-account que agrega dados de member accounts monitoradas sob uma única management account na mesma região. Você pode configurar deployments multi-account da mesma forma que em Amazon GuardDuty e AWS Security Hub.

- Se você não puder usar as mesmas management accounts em todos os serviços, após habilitar o Detective é possível criar opcionalmente um cross-account role.

- Se você estiver usando Amazon GuardDuty, o Amazon Detective fará ingestão e processará automaticamente duas semanas de logs históricos ao ser ativado.

- A management account de um behavior graph pode desabilitar o Amazon Detective. Ao desabilitar, o behavior graph e seus dados associados são deletados e não podem ser restaurados.

### Análise de sessões de IAM Role

- O Amazon Detective é capaz de analisar IAM role sessions processando VPC flow records e CloudTrail management events de todas as contas habilitadas do cliente, colacionando dados sobre atividades realizadas sob uma IAM Role em role sessions. Isso permite visualizar e entender as ações que usuários e apps executaram usando assumed roles.


### Amazon Detective vs. [[Amazon GuardDuty]] vs. [[AWS Security Hub]]

- **Amazon GuardDuty** é um serviço de threat detection que monitora continuamente atividades maliciosas e comportamento não autorizado para proteger suas contas e workloads AWS.

- **AWS Security Hub** é um ponto único que agrega, organiza e prioriza os seus alerts (findings) de múltiplos serviços AWS (como Amazon GuardDuty, Amazon Inspector e Amazon Macie) e soluções de parceiros AWS.

- **Amazon Detective** simplifica o processo de investigar findings de segurança e identificar a root cause.

### Limites do Amazon Detective

- É possível manter até **um ano** de findings agregados para análise.
### Casos de uso comuns

- Triagem de security findings

- Investigação de incidentes

- Hunting por ameaças de segurança ocultas