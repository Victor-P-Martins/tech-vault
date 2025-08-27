# O que é Amazon GuardDuty?
#Security

Um serviço inteligente de **detecção de ameaças**. Ele analisa bilhões de eventos em suas contas AWS a partir de fontes como **[[AWS CloudTrail]]** (atividade de usuários e chamadas de API), **Amazon VPC Flow Logs** (tráfego de rede) e **DNS Logs** (padrões de consultas de nomes).

---

# Como Funciona
![[Amazon GuardDuty Schema.png]]

O GuardDuty é um serviço regional.

Ele categoriza a detecção de ameaças em três principais grupos:

## **Reconhecimento**  
Atividades que sugerem reconhecimento por parte de um atacante, como:

- Chamadas incomuns de API
    
- Varredura de portas dentro da VPC
    
- Padrões anormais de falhas de login
    
- Sondagem de portas abertas a partir de IPs maliciosos conhecidos
    

## **Comprometimento de Instância**  
Atividades indicando que uma instância pode estar comprometida, como:

- Mineração de criptomoedas
    
- Atividade de backdoor (C&C)
    
- Uso de malware com algoritmos de geração de domínio (DGA)
    
- Ataques de negação de serviço (DDoS) de saída
    
- Tráfego incomum ou protocolos anômalos
    
- Comunicação com IPs maliciosos conhecidos
    
- Uso de credenciais temporárias de EC2 por IPs externos
    
- Exfiltração de dados via DNS
    

## **Comprometimento de Conta**  
Atividades suspeitas em nível de conta, como:

- Chamadas de API de geolocalizações incomuns ou proxies anônimos
    
- Tentativas de desativar o CloudTrail
    
- Alterações que enfraquecem políticas de senha
    
- Criação de infraestrutura em regiões incomuns
    
- Chamadas de API a partir de IPs maliciosos
    

---

# Severidade das Ameaças

O GuardDuty classifica achados em três níveis de severidade para ajudar na priorização da resposta:

- **Baixo (Low)**
    
- **Médio (Medium)**
    
- **Alto (High)**
    

---

# Fontes de Dados

- **CloudTrail Event Source**  
    Analisa eventos de gerenciamento e eventos de dados do S3. Processa todos os eventos de CloudTrail em uma região, incluindo globais (IAM, STS, CloudFront, Route 53).
    
- **VPC Flow Logs Event Source**  
    Captura informações de tráfego IP de e para interfaces de rede de instâncias EC2 na VPC.
    
- **DNS Logs Event Source**  
    Se você usa os resolvers DNS padrão da AWS, o GuardDuty processa logs de requisições e respostas DNS. (Resolvers externos não são suportados).
    

---

# GuardDuty vs [[Amazon Macie]]

- **GuardDuty**: foca em **detecção de ameaças** em contas, workloads e dados AWS.
    
- **Amazon Macie**: foca em **classificação e proteção de dados sensíveis** no Amazon S3.
    

---

# Achados (Findings) do GuardDuty

O GuardDuty gera **achados** quando detecta atividades inesperadas ou maliciosas.  
Cada finding inclui informações como:

- **Resumo**
    
    - Tipo de finding
        
    - Severidade (High, Medium, Low)
        
    - Região
        
    - Contagem de ocorrências
        
    - ID da Conta AWS
        
    - ID do Recurso afetado
        
    - Lista de ameaças envolvidas (Threat List)
        
    - Última vez observado
        
- **Recurso Afetado**
    
    - Role (geralmente _Target_)
        
    - Tipo de recurso (AccessKey ou Instance)
        
    - ID da instância EC2
        
    - Porta utilizada
        
    - Access Key ID e Principal ID envolvidos
        
    - Tipo e nome do usuário
        
- **Ação**
    
    - Tipo (NETWORK_CONNECTION, AWS_API_CALL, PORT_PROBE, DNS_REQUEST)
        
    - API chamada
        
    - Serviço envolvido
        
    - Direção da conexão (INBOUND, OUTBOUND, UNKNOWN)
        
    - Protocolo observado
        
- **Ator (Actor)**
    
    - Localização do IP
        
    - Organização (ISP)
        
    - Endereço IP
        
    - Porta e domínio relacionados
        
- **Detalhes (Details)**  
    Incluem a natureza da ameaça, como:
    
    - **Backdoor** (contato com servidor C&C)
        
    - **Behavior** (comportamento fora do padrão)
        
    - **Cryptocurrency** (uso de software de mineração)
        
    - **Pentest** (testes autorizados)
        
    - **Persistence** (mudanças incomuns em permissões/configurações)
        
    - **Policy** (ações contra boas práticas de segurança)
        
    - **PrivilegeEscalation** (tentativa de escalar privilégios)
        
    - **Recon** (ataques de reconhecimento)
        
    - **ResourceConsumption** (uso anormal de recursos)
        
    - **Stealth** (tentativa de ocultar ações)
        
    - **Trojan** (uso de softwares maliciosos disfarçados)
        
    - **UnauthorizedAccess** (acessos suspeitos não autorizados)
        

---

# Regras e Integrações

- **Filtros e Regras de Supressão**  
    Criar filtros para findings. Regras de supressão arquivam automaticamente findings que correspondem a critérios definidos.
    
- **Exportação de Findings**  
    Pode exportar findings ativos para **CloudWatch Events** e opcionalmente para **[[S3 (Amazon Simple Storage Service)]]** (normalmente em até 5 minutos).
    
- **Trusted IP Lists e Threat Lists**
    
    - **Trusted IP Lists**: lista de IPs confiáveis (whitelist).
        
    - **Threat Lists**: lista de IPs maliciosos conhecidos.
        
    - Limites: 1 lista confiável e até 6 listas de ameaças por conta/região.
        

---

# Preços do Amazon GuardDuty

A cobrança é baseada em:

- Quantidade de eventos do **[[Amazon CloudTrail]] analisados** (por 1.000.000 de eventos)
    
- Volume de dados de **VPC Flow Logs** e **DNS Logs analisados** (por GB)