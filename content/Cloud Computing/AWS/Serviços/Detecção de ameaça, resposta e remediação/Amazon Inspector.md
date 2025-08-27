# O que é Amazon Inspector?
#Security

Um serviço de **avaliação automatizada de segurança** que ajuda você a testar a acessibilidade de rede de suas instâncias [[Elastic Compute Cloud (EC2)]] e o estado de segurança das aplicações em execução nessas instâncias.

O Inspector utiliza **IAM service-linked roles** para funcionar.

---

# Funcionalidades

- **Engine de análise inteligente** que avalia configurações de sistemas e recursos, além de monitorar atividades para determinar:
    
    - Como um alvo de avaliação se comporta
        
    - Sua configuração de segurança
        
    - Componentes dependentes
        
    - Potenciais problemas de conformidade
        
- **Biblioteca embutida de regras e relatórios**  
    Inclui verificações baseadas em boas práticas, padrões comuns de conformidade e vulnerabilidades conhecidas.
    
- **Automação em todo o pipeline**  
    Permite avaliar continuamente vulnerabilidades durante desenvolvimento, implantação e em sistemas estáticos de produção.
    
- **API-driven e agente opcional**  
    O Inspector é orientado a APIs, com um agente que pode ser instalado em instâncias EC2 para facilitar o deployment, gerenciamento e automação.
    

---

# Conceitos

- **Inspector Agent**  
    Agente que pode ser instalado em instâncias EC2 do alvo de avaliação para coletar telemetria.
    
- **Assessment Run (Execução de Avaliação)**  
    Processo de descoberta de potenciais problemas de segurança analisando a configuração e comportamento do alvo em relação a pacotes de regras.
    
- **Assessment Target (Alvo de Avaliação)**  
    Conjunto de recursos AWS que trabalham em conjunto como uma unidade. Atualmente, apenas instâncias EC2 podem ser alvos.
    
- **Assessment Template (Template de Avaliação)**  
    Configuração usada em uma execução de avaliação, incluindo:
    
    - Pacotes de regras selecionados
        
    - Duração da execução
        
    - Tópicos [[Amazon SNS]] para notificações
        
    - Atributos específicos (chave-valor) para achados  
        ⚠️ Após criado, o template **não pode ser modificado**.
        
- **Finding (Achado)**  
    Problema de segurança potencial identificado durante a execução.
    
- **Rule (Regra)**  
    Checagem de segurança executada durante a avaliação. Quando detecta problema, gera um _finding_.
    
- **Rules Package (Pacote de Regras)**  
    Conjunto de regras agrupadas por categoria, severidade ou objetivo de segurança.
    
- **Telemetry (Telemetria)**  
    Dados coletados de instâncias EC2 durante a execução e enviados de forma segura em JSON para o Inspector.
    

---

# Pacotes de Regras e Severidade

- Regras agrupadas em pacotes distintos por categoria, severidade ou tipo.
    
- Severidades possíveis:
    
    - **High, Medium, Low** → Indicam problemas que podem comprometer confidencialidade, integridade ou disponibilidade.
        
    - **Informational** → Destaque de detalhe de configuração sem impacto imediato.
        

**Exemplo**:  
Findings do pacote _Network Reachability_ indicam se portas estão acessíveis pela Internet (IGW, VPC Peering, VPN etc.), apontando riscos como Security Groups mal configurados ou ACLs abertas.

---

# Relatórios de Avaliação

O Inspector gera relatórios com resultados detalhados da execução:

- **Findings Report**
    
    - Sumário executivo
        
    - Lista de instâncias EC2 avaliadas
        
    - Pacotes de regras incluídos
        
    - Detalhes de cada finding por instância
        
- **Full Report**  
    Inclui tudo do _Findings Report_ + lista de regras que passaram em todas as instâncias avaliadas.
    

---

# Preços do Amazon Inspector

A cobrança é baseada em duas dimensões:

1. **Número de instâncias EC2 avaliadas** em cada execução
    
2. **Tipo de pacotes de regras selecionados**:
    
    - Host assessment rules packages
        
    - Network reachability rules package