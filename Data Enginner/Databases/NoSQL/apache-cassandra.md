# Cassandra

Apache Cassandra é um banco de dados distribuído NoSQL altamente escalável e resiliente, projetado para gerenciar grandes volumes de dados em ambientes distribuídos. Ele usa um modelo baseado em pares (peer-to-peer) para operar sem um único ponto de falha, garantindo alta disponibilidade e desempenho em escalas globais.

## Arquitetura do Cassandra

### Cluster

Um cluster no Cassandra é um agrupamento lógico de nós que trabalham juntos para armazenar e gerenciar dados distribuídos. O cluster é projetado para ser altamente escalável, resiliente a falhas e para suportar grandes volumes de dados.

O Cassandra usa o particionamento de dados, o que significa que os dados são divididos em partições e distribuídos entre os nós do cluster. Cada nó tem a responsabilidade de gerenciar um subconjunto dos dados com base no token atribuído a ele.

Um cluster Cassandra é projetado para não ter ponto único de falha, garantindo alta disponibilidade.

Escalabilidade linear: adicionar mais nós ao cluster aumenta proporcionalmente a capacidade de processamento e armazenamento.

### Nó

Um nó é um servidor individual que participa de um cluster Cassandra. Ele é responsável por armazenar dados e atender a solicitações de leitura e escrita. Cada nó é independente e igual (arquitetura peer-to-peer), sem um mestre central. Nós se comunicam usando o protocolo Gossip para trocar informações sobre o estado do cluster. Cada nó gerencia uma fatia específica dos dados com base no range de tokens atribuído. Pode ser replicado para outros nós com base no fator de replicação.

### Datacenter

Um datacenter é um agrupamento lógico de nós em um cluster Cassandra. Frequentemente, um datacenter representa uma localização física (como um data center real) ou uma divisão lógica para cargas de trabalho.

#### Funções

**Redundância Geográfica**: Usado para replicação entre regiões ou locais diferentes.

**Isolamento de Carga**: Diferentes datacenters podem ser usados para cargas específicas (leitura, escrita, análise).

Em um ambiente multi-datacenter, o NetworkTopologyStrategy é usado para garantir que os dados sejam replicados em datacenters específicos, otimizando a confiabilidade e o desempenho.

### Rack

Um rack representa um subconjunto de nós dentro de um datacenter, geralmente associado a um rack físico de hardware.Evita que falhas físicas (como a queda de um rack) afetem toda a operação do datacenter.Usado em conjunto com estratégias de replicação para distribuir dados entre racks e garantir alta disponibilidade.

### Partições e Tokens

Partições: Os dados no Cassandra são particionados com base em uma chave de particionamento (partition key), que determina em qual nó os dados serão armazenados.

Tokens: Cada nó recebe um intervalo de tokens, que determina quais partições ele armazena.

O Cassandra usa um particionador (como Murmur3Partitioner) para mapear as chaves de particionamento a um token numérico.Esses tokens são distribuídos entre os nós, garantindo que os dados sejam armazenados de forma uniforme.

#### Vantagens

Distribuição uniforme reduz hotspots (carga desigual entre os nós).
Escalabilidade horizontal permite adicionar nós ao cluster sem redistribuir todos os dados.

### Snitches

Um snitch é uma configuração no Cassandra que informa ao sistema a topologia da rede (datacenters e racks).Ajuda o Cassandra a escolher réplicas ideais para operações de leitura e escrita com base na proximidade e no desempenho.

#### Tipos Comuns

**SimpleSnitch**: Usa um único datacenter e ignora topologias complexas.

**GossipingPropertyFileSnitch**: Usa o arquivo cassandra-rackdc.properties para configurar datacenters e racks.

**DynamicSnitch**: Ajusta dinamicamente o roteamento com base no desempenho dos nós.

### Replicação

O Cassandra replica os dados entre os nós do cluster para garantir disponibilidade e redundância.

Estratégias:

SimpleStrategy: Replica os dados em nós adjacentes com base nos tokens.

NetworkTopologyStrategy: Distribui as réplicas entre datacenters e racks, ideal para clusters geograficamente distribuídos.

Fator de Replicação:

Define o número de cópias de cada partição. Por exemplo, um fator de replicação de 3 garante que cada partição tenha 3 cópias distribuídas.

### Gossip Protocol

Um protocolo de comunicação peer-to-peer usado para troca de informações entre nós.
Nós compartilham periodicamente informações sobre o estado do cluster, como quais nós estão ativos ou falharam.

É um processo assíncrono e eficiente, que ajuda o Cassandra a escalar e lidar com mudanças de topologia.
Garante que todos os nós tenham uma visão consistente do cluster.
Suporta balanceamento de carga e detecção de falhas.

### Heap

O heap é a memória usada pela JVM para armazenar objetos em execução.

Configuração:

**MAX_HEAP_SIZE**: Define o tamanho máximo da memória do heap.

**HEAP_NEWSIZE**: Especifica o tamanho do espaço geracional onde objetos novos são criados.

Heap mal configurado pode causar problemas de desempenho, como pausas de garbage collection ou uso excessivo de memória.

### Write Path

Os dados são inicialmente gravados em um commit log no disco.
Também são armazenados em uma estrutura na memória chamada memtable.
Periodicamente, as memtables são descarregadas no disco como arquivos SSTable.

Garantia de durabilidade por meio do commit log.
Escritas rápidas, pois ocorrem primeiro na memória.

### Read Path

Primeiro, o Cassandra verifica a memtable para os dados mais recentes.
Em seguida, verifica os arquivos SSTable no disco.
Cache de leitura pode ser usado para otimizar a recuperação.
Combinação de memória e disco para oferecer baixa latência em leituras.

### Consistência

Define como os dados são sincronizados entre os nós do cluster.

Níveis Comuns:

**ONE**: Resposta de um nó é suficiente.

**QUORUM**: Maioria dos nós precisa responder.

**ALL**: Todos os nós devem confirmar.

Permite ajustar o equilíbrio entre consistência, disponibilidade e desempenho com base nos requisitos da aplicação.
