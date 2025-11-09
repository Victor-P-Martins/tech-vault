#Security #Certification #AWS
# Domínios

- **Domínio 1: Detecção de Ameaças e Resposta a Incidentes** (14%)
    
    1. Projetar e implementar um plano de resposta a incidentes.
        
    2. Detectar ameaças e anomalias de segurança usando serviços da AWS.
        
    3. Responder a recursos e workloads comprometidos.
        
- **Domínio 2 :** **Monitoramento e Alertas para Eventos de Segurança** (18%)
    
    1. Solucionar problemas de monitoramento e alertas de segurança.
        
    2. Projetar e implementar uma solução de logging.
        
    3. Solucionar problemas em soluções de logging.
        
    4. Projetar uma solução de análise de logs.
        
- **Domínio 3: Segurança de Infraestrutura** (20%)
    
    1. Projetar e implementar controles de segurança para serviços de borda (edge).
        
    2. Projetar e implementar controles de segurança de rede.
        
    3. Projetar e implementar controles de segurança para workloads de computação.
        
    4. Solucionar problemas de segurança de rede.
        
- **Domínio 4: Gerenciamento de Identidade e Acesso (IAM)** (16%)
    
    1. Projetar, implementar e solucionar problemas de autenticação para recursos AWS.
        
    2. Projetar, implementar e solucionar problemas de autorização para recursos AWS.
        
- ** Domínio 5: Proteção de Dados** (18%)
    
    1. Projetar e implementar controles que forneçam confidencialidade e integridade para dados **em trânsito**.
        
    2. Projetar e implementar controles que forneçam confidencialidade e integridade para dados **em repouso**.
        
    3. Projetar e implementar controles para gerenciar o ciclo de vida de dados em repouso.
        
    4. Projetar e implementar controles para proteger credenciais, segredos e materiais de chaves criptográficas.
        
- **Domínio 6: Gestão e Governança de Segurança** (14%)
    
    1. Desenvolver uma estratégia para **implantar e gerenciar centralmente** contas AWS.
        
    2. Implementar uma estratégia de implantação **segura e consistente** para recursos em nuvem.
        
    3. Avaliar a conformidade dos recursos AWS.
        
    4. Identificar lacunas de segurança por meio de revisões de arquitetura e análise de custos.

# Serviços

## Controle de Identidade e Acesso

- [[AWS Identity and Access Management‬‭]]
- [[AWS IAM Identity Center]]
- [[Resource-Based Policies‬]]
- [[ S3 Presigned URLs‬]]
- [[CloudFront Signed URLs‬‭]]
- [[Amazon Cognito‬‭]]
- [[AWS IAM Identity Center]]
- [[AWS Security Token Service]]
- [[AWS Directory Service]]
- [[AWS Organizations]]
- [[AWS Resource Access Manager]]

## Segurança de Aplicações e Infraestrutura

- [[ Ec2 Key Pairs]]
- [[AWS Systems Manager]]
- [[AWS WAF]]
- [[AWS Shield]]
- [[AWS Firewall Manager‬]]
## Segurança de Dados

- [[AWS KMS]]
- [[Amazon CloudHSM]]
- [[AWS SSM Parameter Store]]
- [[Amazon Secrets Manager]]
- [[SSE-S3 Encryption]]
- [[S3 Glacier Vault Lock‬‭]]
- [[Amazon Macie‬‭]]
- [[AWS Certificate Manager]]

## Segurança de Redes

- [[Amazon VPC]]
- [[Amazon Cloudfront]]
- [[AWS ELB]]
- [[Amazon API Gateway]]
- [[AWS VPN]]
- [[AWS Direct Connect]]

## Logging e Monitoramento

- [[Amazon CloudWatch]]
- [[Amazon CloudTrail]]
- [[Service Logs (VPC, ELB, API Gateway, S3, CloudFront)‬]]
- [[Amazon Route 53]]
## Detecção de ameaça, prevenção, resposta e remediação

- [[Amazon GuardDuty]]
- [[Amazon Inspector]]
- [[Amazon Detective]]
- [[AWS Security Hub]]
## Gerenciamento de Risco e Compliance

- [[AWS Artifact]]
- [[AWS Config]]

## Visão Geral
### **Domínio 1: Detecção de Ameaças e Resposta a Incidentes**
**Primeiro domínio** do exame **AWS Certified Security – Specialty** verifica sua preparação sobre o quão bem você é capaz de **detectar, automatizar, verificar, avaliar e remediar** incidentes de segurança na sua infraestrutura AWS. Aproximadamente **14%** das questões do exame real giram em torno desse tópico.

Este domínio vai desafiar seu conhecimento em:

- **Analisar arquiteturas** para identificar requisitos de monitoramento e **fontes de dados** para monitoramento de segurança.
    
- **Analisar ambientes e workloads** para determinar requisitos de monitoramento.
    
- **Projetar o monitoramento** do ambiente e de workloads com base em **requisitos de negócio e de segurança**.
    
- **Configurar ferramentas e scripts automatizados** para realizar **auditorias regulares** (por exemplo, criando **insights personalizados** no **AWS Security Hub**).
    
- **Definir métricas e limiares** que gerem alertas.
    
- **Analisar** a funcionalidade do serviço, permissões e configurações dos recursos **após um evento** que não forneceu visibilidade ou alertas.
    
- **Analisar e corrigir** a configuração de uma **aplicação customizada** que não está reportando suas estatísticas.
    
- **Avaliar serviços de logging e monitoramento** quanto ao alinhamento com **requisitos de segurança**.
    
- **Configurar logging** para serviços e aplicações.
    
- **Identificar requisitos de logging e fontes** para **ingestão de logs**.
    
- **Implementar armazenamento de logs** e **gerenciamento de ciclo de vida** de acordo com as **melhores práticas da AWS** e requisitos organizacionais.
    
- **Identificar configurações incorretas** e determinar etapas de remediação para **permissões de acesso ausentes** necessárias ao logging (por exemplo, gerenciando permissões de leitura/gravação, permissões de bucket S3, acesso público e **integridade**).
    
- **Determinar a causa de logs ausentes** e executar **etapas de remediação**.
    
- **Identificar padrões em logs** que indiquem **anomalias** e **ameaças conhecidas**.
    
- **Normalizar, fazer parsing e correlacionar logs**.
    

Observe que este domínio tem o **menor peso** no exame (**14%**), semelhante ao novo **Domínio 6: Management and Security Governance** (**14%**). Portanto, assegure-se de dedicar **tempo suficiente** apenas para compreender os conceitos desta seção.

### **Domínio 2 :** **Monitoramento e Alertas para Eventos de Segurança**

O **segundo domínio** do exame **AWS Certified Security – Specialty** foca nos tópicos relacionados ao **gerenciamento de logging e monitoring** na AWS. Para ser um AWS Security Specialist eficaz, é importante que você compreenda esses conceitos-chave. Aproximadamente **18%** das questões do exame real de Security – Specialty giram em torno de **logging** e **monitoramento** na plataforma AWS.

Esse é o **segundo maior domínio** do exame, empatado com o **Domínio 5: Data Protection**, que também possui **18%** de cobertura. Portanto, você deve dedicar tempo suficiente para aprender os diversos serviços, recursos e conceitos da AWS nessa área de conhecimento.

Este domínio desafiará seu conhecimento em:

- **Analisar arquiteturas** para identificar requisitos de monitoramento e **fontes de dados** para monitoramento de segurança.
    
- **Analisar ambientes e workloads** para determinar requisitos de monitoramento.
    
- **Projetar o monitoramento** do ambiente e de workloads com base em **requisitos de negócios e de segurança**.
    
- **Configurar ferramentas e scripts automatizados** para realizar **auditorias regulares** (por exemplo, criando **insights personalizados** no **AWS Security Hub**).
    
- **Definir métricas e limiares** que gerem alertas.
    
- **Analisar** a funcionalidade do serviço, permissões e configuração de recursos **após um evento** que não forneceu visibilidade ou alertas.
    
- **Analisar e corrigir** a configuração de uma **aplicação customizada** que não está reportando suas estatísticas.
    
- **Avaliar serviços de logging e monitoramento** quanto ao alinhamento com **requisitos de segurança**.
    
- **Configurar logging** para serviços e aplicações.
    
- **Identificar requisitos de logging e fontes** para **ingestão de logs**.
    
- **Implementar armazenamento de logs** e **gerenciamento de ciclo de vida** conforme as **melhores práticas da AWS** e requisitos organizacionais.
    
- **Identificar configurações incorretas** e determinar etapas de remediação para **permissões de acesso ausentes** necessárias ao logging (por exemplo, gerenciando permissões de leitura/gravação, permissões de bucket S3, acesso público e **integridade**).
    
- **Determinar a causa de logs ausentes** e executar **etapas de remediação**.
    
- **Identificar padrões em logs** que indiquem **anomalias** e **ameaças conhecidas**.
    
- **Normalizar, fazer parsing e correlacionar logs**.