# O que é o Kubernetes?

O projeto Kubernetes foi desenvolvido pela Google, em meados de 2014, para atuar como um orquestrador de contêineres para a empresa. O Kubernetes (k8s), cujo termo em Grego significa "timoneiro", é um projeto open source que conta com design e desenvolvimento baseados no projeto Borg, que também é da Google 1. Alguns outros produtos disponíveis no mercado, tais como o Apache Mesos e o Cloud Foundry, também surgiram a partir do projeto Borg.

Como Kubernetes é uma palavra difícil de se pronunciar - e de se escrever - a comunidade simplesmente o apelidou de k8s, seguindo o padrão i18n (a letra "k" seguida por oito letras e o "s" no final), pronunciando-se simplesmente "kates".

## Arquitetura do k8s

Assim como os demais orquestradores disponíveis, o k8s também segue um modelo control plane/workers, constituindo assim um cluster, onde para seu funcionamento é recomendado no mínimo três nós: o nó control-plane, responsável (por padrão) pelo gerenciamento do cluster, e os demais como workers, responsáveis por executar as aplicações.

É possível criar um cluster Kubernetes rodando em apenas um nó, porém é recomendado somente para fins de estudos e nunca executado em ambiente de produção.

Caso você queira utilizar o Kubernetes em sua máquina local, em seu desktop, existem diversas soluções que irão criar um cluster Kubernetes, utilizando máquinas virtuais ou o Docker, por exemplo.

Com isso você poderá ter um cluster Kubernetes com diversos nós, porém todos eles rodando em sua máquina local, em seu desktop.

Alguns exemplos são:

- **Kind**: Uma ferramenta para execução de contêineres Docker que simulam o funcionamento de um cluster Kubernetes. É utilizado para fins didáticos, de desenvolvimento e testes. O Kind não deve ser utilizado para produção;

- **Minikube**: ferramenta para implementar um cluster Kubernetes localmente com apenas um nó. Muito utilizado para fins didáticos, de desenvolvimento e testes. O Minikube não deve ser utilizado para produção;

- **MicroK8S**: Desenvolvido pela Canonical, mesma empresa que desenvolve o Ubuntu. Pode ser utilizado em diversas distribuições e pode ser utilizado em ambientes de produção, em especial para Edge Computing e IoT (Internet of things);

- **k3s**: Desenvolvido pela Rancher Labs, é um concorrente direto do MicroK8s, podendo ser executado inclusive em Raspberry Pi;

- **k0s**: Desenvolvido pela Mirantis, mesma empresa que adquiriu a parte enterprise do Docker. É uma distribuição do Kubernetes com todos os recursos necessários para funcionar em um único binário, que proporciona uma simplicidade na instalação e manutenção do cluster. A pronúncia é correta é kay-zero-ess e tem por objetivo reduzir o esforço técnico e desgaste na instalação de um cluster Kubernetes, por isso o seu nome faz alusão a Zero Friction. O k0s pode ser utilizado em ambientes de produção;

### Componentes do Control Plane

- **API Server**: É um dos principais componentes do k8s. Este componente fornece uma API que utiliza JSON sobre HTTP para comunicação, onde para isto é utilizado principalmente o utilitário kubectl, por parte dos administradores, para a comunicação com os demais nós. Estas comunicações entre componentes são estabelecidas através de requisições REST;

- **etcd**: O etcd é um datastore chave-valor distribuído que o k8s utiliza para armazenar as especificações, status e configurações do cluster. Todos os dados armazenados dentro do etcd são manipulados apenas através da API. Por questões de segurança, o etcd é por padrão executado apenas em nós classificados como control plane no cluster k8s, mas também podem ser executados em clusters externos, específicos para o etcd, por exemplo;

- **Scheduler**: O scheduler é responsável por selecionar o nó que irá hospedar um determinado pod (a menor unidade de um cluster k8s - não se preocupe sobre isso por enquanto, nós falaremos mais sobre isso mais tarde) para ser executado. Esta seleção é feita baseando-se na quantidade de recursos disponíveis em cada nó, como também no estado de cada um dos nós do cluster, garantindo assim que os recursos sejam bem distribuídos. Além disso, a seleção dos nós, na qual um ou mais pods serão executados, também pode levar em consideração políticas definidas pelo usuário, tais como afinidade, localização dos dados a serem lidos pelas aplicações, etc;

- **Controller Manager**: É o controller manager quem garante que o cluster esteja no último estado definido no etcd. Por exemplo: se no etcd um deploy está configurado para possuir dez réplicas de um pod, é o controller manager quem irá verificar se o estado atual do cluster corresponde a este estado e, em caso negativo, procurará conciliar ambos;

### Componentes do Worker

- **Kubelet**: O kubelet desempenha o papel de um agente do k8s que é executado nos nós workers. Em cada nó worker deverá existir um agente Kubelet em execução, encarregado de gerenciar efetivamente os pods direcionados pelo controller do cluster dentro dos nós. Para isso, o Kubelet pode iniciar, parar e manter os contêineres e os pods em funcionamento seguindo as instruções fornecidas pelo controlador do cluster; **O control planne também possui seu próprio kubelet.**

- **Kube-proxy**: Age como um proxy e um load balancer. Este componente é responsável por efetuar roteamento de requisições para os pods corretos, como também por cuidar da parte de rede do nó;

Portas que devemos nos preocupar

CONTROL PLANE

| Protocol | Direction | Port Range | Purpose                 | Used By              |
| -------- | --------- | ---------- | ----------------------- | -------------------- |
| TCP      | Inboud    | 6443*      | Kubernetes API server   | All                  |
| TCP      | Inboud    | 2379-2380  | etcd server client API  | kube-apiserver, etcd |
| TCP      | Inboud    | 10250      | Kubelet API             | Self, Control plane  |
| TCP      | Inboud    | 10259      | kube-scheduler          | Self                 |
| TCP      | Inboud    | 10257      | kube-controller-manager | Self                 |

Toda porta marcada por * é customizável, você precisa se certificar que a porta alterada também esteja aberta.
  
WORKERS

| Protocol | Direction | Port Range  | Purpose     | Used By             |
| -------- | --------- | ----------- | ----------- | ------------------- |
| TCP      | Inboud    | 10250       | Kubelet API | Self, Control Plane |
| TCP      | Inboud    | 30000-32767 | NodePort    | Services All        |

Conceitos-chave do k8s
É importante saber que a forma como o k8s gerencia os contêineres é ligeiramente diferente de outros orquestradores, como o Docker Swarm, sobretudo devido ao fato de que ele não trata os contêineres diretamente, mas sim através de pods. Vamos conhecer alguns dos principais conceitos que envolvem o k8s a seguir:

- **Pod**: É o menor objeto do k8s. Como dito anteriormente, o k8s não trabalha com os contêineres diretamente, mas organiza-os dentro de pods, que são abstrações que dividem os mesmos recursos, como endereços, volumes, ciclos de CPU e memória. Um pod pode possuir vários contêineres;

- **Deployment**: É um dos principais controllers utilizados. O Deployment, em conjunto com o ReplicaSet, garante que determinado número de réplicas de um pod esteja em execução nos nós workers do cluster. Além disso, o Deployment também é responsável por gerenciar o ciclo de vida das aplicações, onde características associadas a aplicação, tais como imagem, porta, volumes e variáveis de ambiente, podem ser especificados em arquivos do tipo yaml ou json para posteriormente serem passados como parâmetro para o kubectl executar o deployment. Esta ação pode ser executada tanto para criação quanto para atualização e remoção do deployment;

- **ReplicaSets**: É um objeto responsável por garantir a quantidade de pods em execução no nó;

- **Services**: É uma forma de você expor a comunicação através de um ClusterIP, NodePort ou LoadBalancer para distribuir as requisições entre os diversos Pods daquele Deployment. Funciona como um balanceador de carga.