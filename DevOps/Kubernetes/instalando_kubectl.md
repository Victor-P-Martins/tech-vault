# Instalando o Kubectl

Documentação oficial - https://kubernetes.io/pt-br/docs/tasks/tools/

1 - Fazer download do binário em go para instalação.
2 - Dar permissão de executar para o arquivo binário
    ```bash
    chmod +x kubectl
    ```
3 - Mover para pasta bin
    ```bash
    sudo mv kubectl /usr/local/bin


[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.25.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind