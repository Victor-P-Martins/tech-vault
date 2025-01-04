# O que é o Deployment?

É um dos principais controllers utilizados. O Deployment, em conjunto com o ReplicaSet, garante que determinado número de réplicas de um pod esteja em execução nos nós workers do cluster. Além disso, o Deployment também é responsável por gerenciar o ciclo de vida das aplicações, onde características associadas a aplicação, tais como imagem, porta, volumes e variáveis de ambiente, podem ser especificados em arquivos do tipo yaml ou json para posteriormente serem passados como parâmetro para o kubectl executar o deployment. Esta ação pode ser executada tanto para criação quanto para atualização e remoção do deployment;


```yml
# Definições do deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deployment
  name: nginx-deployment
spec:
  replicas: 3
  # Define quais pods serão controlados pelo Deployment baseado na label
  selector:
    matchLabels:
      app: nginx-deployment
  #Define a estratégia de deployment utilizada.
  strategy: {}
  # A partir daqui são as configurações relacionadas ao POD
  template:
    metadata:
      labels:
        app: nginx-deployment
    spec:
      containers:
        - image: nginx
          name: nginx
          resources:
            limits:
              cpu: 0.5
              memory: 256Mi
            requests:
              cpu: 0.3
              memory: 64Mi
```

## Criando um yaml de deployment automaticamente

```bash
kubectl create deployment --image nginx --replicas 3 nginx-deployment --dry-run=client -o yaml > deploy-template.yaml
```

## Tipos de estratégias de Deploy

### RollingUpdate

A estratégia RollingUpdate é a estratégia de atualização padrão do Kubernetes, ela é utilizada para atualizar os Pods de um Deployment de forma gradual, ou seja, ela atualiza um Pod por vez, ou um grupo de Pods por vez.

Nós podemos definir como será a atualização dos Pods, por exemplo, podemos definir a quantidade máxima de Pods que podem ficar indisponíveis durante a atualização, ou podemos definir a quantidade máxima de Pods que podem ser criados durante a atualização.

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deployment
  name: nginx-deployment
spec:
  replicas: 10
  selector:
    matchLabels:
      app: nginx-deployment
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 2
  template:
    metadata:
      labels:
        app: nginx-deployment
    spec:
      containers:
      - image: nginx:1.15.0
        name: nginx
        resources:
          limits:
            cpu: "0.5"
            memory: 256Mi
          requests:
            cpu: "0.25"
            memory: 128Mi
```

- maxSurge: Define a quantidade máxima de Pods que podem ser criados a mais durante a atualização, ou seja, durante o processo de atualização, nós podemos ter 1 Pod a mais do que o número de Pods definidos no Deployment. Isso é útil pois agiliza o processo de atualização, pois o Kubernetes não precisa esperar que um Pod seja atualizado para criar um novo Pod.

- maxUnavailable: Define a quantidade máxima de Pods que podem ficar indisponíveis durante a atualização, ou seja, durante o processo de atualização, nós podemos ter 1 Pod indisponível por vez. Isso é útil pois garante que o serviço não fique indisponível durante a atualização.

- type: Define o tipo de estratégia de atualização que será utilizada, no nosso caso, nós estamos utilizando a estratégia RollingUpdate.

### Recreate

A estratégia Recreate é uma estratégia de atualização que irá remover todos os Pods do Deployment e criar novos Pods com a nova versão da imagem. A parte boa é que o deploy acontecerá rapidamente, porém o ponto negativo é que o serviço ficará indisponível durante o processo de atualização.

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deployment
  name: nginx-deployment
spec:
  replicas: 10
  selector:
    matchLabels:
      app: nginx-deployment
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nginx-deployment
    spec:
      containers:
      - image: nginx:1.15.0
        name: nginx
        resources:
          limits:
            cpu: "0.5"
            memory: 256Mi
          requests:
            cpu: "0.25"
            memory: 128Mi
```

Agora somente temos a configuração type: Recreate. O Recreate não possui configurações de atualização, ou seja, não é possível definir o número máximo de Pods indisponíveis durante a atualização, afinal o Recreate irá remover todos os Pods do Deployment e criar novos Pods.

O Recreate deixará a aplicação indisponível (o que é péssimo), porém o uso pode fazer sentido quando tivermos que garantir, por exemplo, que diferentes versões da aplicação não rodem ao mesmo tempo por causa de um update grande, mudança de schema ou qualquer outro update que a execução de duas versões possa comprometer o sistema.


### Rollback

O comando abaixo diz ao kubernetes para voltar a versão anterior do Deployment.

```bash
kubectl rollout undo deployment namespace-name deployment-name
```

Mostrar o histórico de revisões

```bash
kubectl rollout history deployment deployment-name
```


Podemos definir também a versões para rollback

```bash
kubectl rollout undo deployment deployment-name --revision 6
```

Lembrando que podemos utilizar o comando kubectl rollout em Deployments, StatefulSets e DaemonSets.

### Pause e Resume

O comando kubectl rollout pause é utilizado para pausar o Deployment, ou seja, ele vai pausar o Deployment e não vai permitir que ele faça nenhuma atualização.

```bash
kubectl rollout resume deployment nginx-deployment
```

O comando kubectl rollout resume é utilizado para despausar o Deployment, ou seja, ele vai despausar o Deployment e vai permitir que ele faça atualizações novamente.

```bash
kubectl rollout restart deployment nginx-deployment
```

O comando kubectl rollout restart é utilizado para reiniciar o Deployment, ou seja, ele vai reiniciar o Deployment recriando os Pods.

```bash
kubectl rollout status deployment nginx-deployment
```

O comando kubectl rollout status é utilizado para verificar o status do Deployment, ou seja, ele vai verificar o status do rollout do Deployment.

```bash
kubectl rollout undo deployment nginx-deployment
```
