# Utilizando o Kubernetes localmente

Rodar Kubernetes localmente é uma prática comum para desenvolvimento, testes e aprendizado. Ferramentas como Kind e Minikube facilitam essa configuração, permitindo simular clusters Kubernetes completos em ambientes locais sem depender de infraestrutura externa.

Quando rodamos Kubernetes em produção, o objetivo é hospedar aplicações para uso real, com usuários acessando e interagindo com os serviços. Isso exige alta escalabilidade, para suportar grandes volumes de tráfego, e alta disponibilidade, garantindo que o sistema continue funcionando mesmo em caso de falhas. Em produção, o cluster Kubernetes geralmente é distribuído em servidores físicos ou máquinas virtuais, com componentes como etcd, API Server e controladores espalhados em diferentes máquinas para maior desempenho e segurança.

Já com Kind ou Minikube, o foco é criar um ambiente local para desenvolvimento, aprendizado ou testes. Esses clusters são simulações simplificadas de Kubernetes, rodando em uma máquina local (geralmente um laptop ou desktop). Eles não têm a mesma escalabilidade nem redundância de um cluster de produção, sendo limitados a poucos nós, frequentemente simulados dentro de contêineres (Kind) ou máquinas virtuais leves (Minikube). Essa abordagem é prática para testar configurações e implementar aplicações em um ambiente seguro e de baixo custo, sem a complexidade de configurar um cluster completo.

## Kind

[Quickstart](https://kind.sigs.k8s.io/docs/user/quick-start/)

O kind ou Kubernetes in Docker, permite que você execute o Kubernetes no seu computador local. Esta ferramenta requer que você tenha o Docker instalado e configurado.

## Minikube

[Quickstart](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)

Assim como o kind, o minikube é uma ferramenta que permite executar o Kubernetes localmente. O minikube executa um cluster Kubernetes local com tudo-em-um ou com vários nós no seu computador pessoal (incluindo PCs Windows, macOS e Linux) para que você possa experimentar o Kubernetes ou para o trabalho de desenvolvimento diário.