# Pods

## O que é um Pod?

Primeira coisa, o Pod é a menor unidade dentro de um cluster Kubernetes.

Quando estamos falando sobre Pod, precisamos pensar que o Pod é uma caixinha que contém um ou mais containers. E esses containers compartilham os mesmos recursos do Pod, como por exemplo, o IP, o namespace, o volume, etc.

Então, quando falamos de Pod, estamos falando de um ou mais containers que compartilham os mesmos recursos, ponto.

## Comandos

### Informações

Retorna os Pods de um namespace específico

```bash
    kubectl get pods -n seu_namespace
```

Retorna os Pods de todos os namespaces

```bash
    kubectl get pods -A
```

Retorna a descrição de um pod

```bash
    kubectl describe pods pod_name
```

- ```-o yaml``` retorna a descrição do pod em formato YAML podendo ser utilizadon de base para a replicação desse pod.

### Manipulação

#### Deleta um Pod

```bash
    kubectl delete pods pod_name
```

#### Cria um Pod

```bash
    kubectl run pod_name --image docker_image_name --port port_numb -n namespace
```

#### Cria ou atualiza um Pod baseado em uma config.

Caso o pod não exista ele cria, caso exista ele aplica as configurações do yaml no pod atual.

```bash
    kubectl apply -f filename.yaml
```

#### Attach a um pod (utilizado para ambientes que possuem um  shell, como alpine, etc.)

```bash
    kubectl attach pod_name -c container_name -ti
```

#### Exec em um pod (utilizado para containers que estão rodando serviços, como nginx, etc.)

```bash
    kubectl exec -ti pod_name -- bash
```

