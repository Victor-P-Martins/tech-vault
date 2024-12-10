# Kubectl

## Comandos

- Verifica os pods|nodes|services|deployments|replicaset

    ```bash
    kubectl get pods -n seu_namespace
    ```

  - ```-o wide```- Trás informações mais completas como ip do pod
  - ```-A``` - Trás todos os pods independente do namespace.

- Inicia uma instância no pod
  
  ```bash
  kubectl run --image nginx --port 80
  ```

- Executando uma ação no pod

  ```bash
  kubectl exec -ti podname -- bash
  ```

  Comando faz a entrada no bash do pod.

- Cria um Yaml da definição de um pod.

  ```bash
  kubectl run --image nginx --port 80 teste --dry-run=client 
  ```

  - ```--dry-run```- Comando para não executar de verdade a criação do pod. Roda apenas como teste.

    Output:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
    creationTimestamp: null
    labels:
        run: teste
    name: teste
    spec:
    containers:
    - image: nginx
        name: teste
        ports:
        - containerPort: 80
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```

- Executa o yaml

  ```bash
  kubectl apply -f pod.yaml 
  ```
