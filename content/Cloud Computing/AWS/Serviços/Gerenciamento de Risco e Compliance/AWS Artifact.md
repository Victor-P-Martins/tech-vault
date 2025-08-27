# O que é AWS Artifact?
#Compliance #Risk

Um serviço totalmente gerenciado da AWS que fornece **acesso sob demanda a relatórios de conformidade e segurança** da AWS, bem como a possibilidade de gerenciar **acordos de conformidade** com a própria Amazon. Ele é essencial para clientes que precisam demonstrar ou validar controles de conformidade em auditorias, certificações ou processos internos de governança.

---

# Funcionalidades

- **Central de Relatórios de Conformidade**  
    Acesso a relatórios de auditoria de terceiros independentes (ex.: ISO, PCI, SOC, HIPAA, FedRAMP), disponíveis para download imediato.
    
- **Gerenciamento de Acordos de Conformidade**  
    Possibilidade de visualizar, aceitar e gerenciar acordos como:
    
    - BAA (Business Associate Addendum) para HIPAA
    - GDPR Data Processing Addendum
    - Outros acordos específicos de setores regulados
        
- **Acesso sob demanda e em tempo real**  
    Não é necessário abrir chamados de suporte ou esperar envio manual dos documentos — tudo é entregue diretamente pelo console do Artifact.
    
- **Segurança integrada**  
    Relatórios e acordos ficam disponíveis somente a usuários autenticados e com permissões apropriadas via IAM.


---

# Conceitos

- **Artifact Reports (Relatórios do Artifact)**  
    Biblioteca de relatórios de conformidade que você pode baixar para análise interna ou apresentação a auditores.
    
    - Inclui **auditorias de terceiros** sobre controles da AWS.
    - Relatórios são atualizados periodicamente, de acordo com os ciclos de auditoria.
        
- **Artifact Agreements (Acordos do Artifact)**  
    Contratos que estabelecem os termos de conformidade entre a AWS e sua organização.
    
    - Exemplo: aceitar o **HIPAA BAA** para hospedar workloads com dados de saúde.
        
- **Gerenciamento baseado em IAM**  
    Você pode definir políticas de IAM para controlar **quem pode visualizar, baixar relatórios ou aceitar acordos**.
    

---

# Casos de Uso

- **Auditorias internas**: fornecer evidências de conformidade para equipes de governança ou segurança.
- **Certificações de clientes**: compartilhar relatórios com auditores externos para validar workloads em nuvem.
- **Regulamentações específicas**: aceitar acordos legais necessários para hospedar dados sensíveis (ex.: saúde, financeiro).

---

# Monitoramento e Integrações

- O acesso ao Artifact pode ser auditado via **[[AWS CloudTrail]]**, garantindo rastreabilidade de downloads e aceites de acordos.
- As permissões são totalmente gerenciadas via **IAM**, garantindo controle granular.

---

# Segurança no AWS Artifact

- Apenas usuários com as permissões corretas no IAM podem acessar relatórios ou aceitar acordos.
    
- Os relatórios não podem ser modificados, apenas baixados para consulta.
    

---

# Conformidades Disponíveis no AWS Artifact

- ISO 27001, ISO 27017, ISO 27018
    
- PCI DSS
    
- HIPAA (via BAA)
    
- SOC 1, SOC 2, SOC 3
    
- FedRAMP
    
- GDPR (via DPA)
    

---

# Preços do AWS Artifact

- **Não há custo adicional** para usar o AWS Artifact.
    
- O serviço é incluído gratuitamente, mas pode gerar custos indiretos relacionados ao uso de outros serviços AWS que exigem conformidade.