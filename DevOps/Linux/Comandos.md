# Comandos Linux

## Informações do Sistema

- **Verifica a arquitetura da CPU**  

  ```bash
  uname -m
  ```

- **Verifica o tipo de arquivo**

    ```bash
    file file_name
    ```

- **Verifica os arquivos de uma pasta em detalhes**

    ```bash
    ls --lha
    ```

  - ```-l``` (long format) - Mostra informações detalhadas sobre os arquivos e diretórios, como permissões, número de links, proprietário, grupo, tamanho e data de modificação.

  - ```-h``` (human-readable) - Exibe os tamanhos dos arquivos em um formato mais legível (ex.: 1K, 234M, 2G, em vez de apenas números).

  - ```-a``` (all) - Inclui arquivos ocultos (aqueles que começam com um ponto .) na listagem.

- **Verifica espaço em disco**

    ```bash
    df -h
    ```

  - ```-h``` (human-readable) - Exibe os tamanhos em formato legível (ex.: GB, MB).

- **Verifica o uso de memória**

    ```bash
    free -h
    ```

- **Exibe a versão do Kernel**

    ```bash
    uname -r
    ```

- **Exibe o sistema operacional**
  
    ```bash
    lsb_release -a
    ```

## Permissões

- **Exibe as permissões dos arquivos**

    ```bash
    ls -l
    ```

- **Altera permissões**

    ```bash
    chmod <permissões> <file_name>
    ```

    Exemplo:

    ```bash
    chmod 755 script.sh
    ```

    Cada dígito do número 755 refere-se às permissões de uma categoria específica de usuários:

    Primeiro dígito (7): Permissões do dono (owner).
    Segundo dígito (5): Permissões do grupo (group).
    Terceiro dígito (5): Permissões dos outros (others).

   | **Valor**       | **Permissão**             | **Binário** | **Significado**                    |
   | --------------- | ------------------------- | ----------- | ---------------------------------- |
   | 0               | Nenhuma                   | 000         | Nenhuma permissão                  |
   | 1               | Executar (x)              | 001         | Permissão para executar            |
   | 2               | Escrever (w)              | 010         | Permissão para escrever            |
   | 4               | Ler (r)                   | 100         | Permissão para ler                 |
   | **Combinações** | **Somatória**             | **Binário** | **Significado**                    |
   | 3               | Executar + Escrever       | 011         | Permissão para executar e escrever |
   | 5               | Ler + Executar            | 101         | Permissão para ler e executar      |
   | 6               | Ler + Escrever            | 110         | Permissão para ler e escrever      |
   | 7               | Ler + Escrever + Executar | 111         | Todas as permissões                |

- **Altera o dono de um arquivo**

    ```bash
    chown <novo_dono> <file_name>
    ```

    Exemplo:

    ```bash
    chown victor document.txt
    ```

- **Altera o grupo de um arquivo**

    ```bash
    chgrp <novo_grupo> <file_name>
    ```

    Exemplo:

    ```bash
    chgrp developers document.txt
    ```

## Manipulação de Arquivos e Diretórios

- **Cria um diretório**

    ```bash
    mkdir <directory_name>
    ```

- **Remove um arquivo**

    ```bash
    rm <file_name>
    ```

- **Remove um diretório (recursivamente)**

    ```bash
    rm -r <directory_name>
    ```

- **Move ou renomeia arquivos/diretórios**

    ```bash
    mv <source> <destination>
    ```

- **Copia arquivos**

    ```bash
    cp <source> <destination>
    ```

- **Cria um arquivo vazio**

    ```bash
    touch <file_name>
    ```

- **Lista arquivos por ordem de tamanho**

    ```bash
    ls -lhS
    ```

- **Exibe o conteúdo de um arquivo ou processo**

    ```bash
    cat <file_name>
    ```

- **Exibe as primeiras linhas de um arquivo**

    ```bash
    head <file_name>
    ```

- **Exibe as últimas linhas de um arquivo**

    ```bash
    tail <file_name>
    ```

## Busca e Filtros

- **Busca arquivos/diretórios**

    ```bash
    find <path> -name <pattern>
    ```

    Exemplo:

    ```bash

    find /home -name "*.txt"
    ```

- **Busca texto em arquivos**

    ```bash
    grep "<texto>" <file_name>
    ```

    Exemplo:

    ```bash
    grep "erro" log.txt
    ```

- **Busca texto recursivamente em um diretório**

    ```bash
    grep -r "<texto>" <directory>
    ```

- **Ordena o conteúdo de um arquivo**

    ```bash
    sort <file_name>
    ```

- **Remove linhas duplicadas**

    ```bash
    uniq <file_name>
    ```

## Rede

- **Exibe interfaces de rede e IPs**

    ```bash
    ip addr
    ```

- **Ping para verificar conectividade**

    ```bash
    ping <host>
    ```

    Exemplo:

    ```bash
    ping google.com
    ```

- **Exibe conexões de rede ativas**

    ```bash
    netstat -tuln
    ```

- **Exibe rotas da tabela de roteamento**

    ```bash
    route -n
    ```

## Processos e Monitoramento

- **Lista processos ativos**

    ```bash
    ps aux
    ```

- **Exibe processos em tempo real**

    ```bash
    top
    ```

- **Finaliza um processo**

    ```bash
    kill <PID>
    ```

    Exemplo:

    ```bash
    kill 12345
    ```

- **Exibe uso de disco por pasta**

    ```bash
    du -h
    ```

## Compactação e Arquivos

- **Compacta arquivos (tar.gz)**

    ```bash
    tar -czvf <arquivo.tar.gz> <diretório>
    ```

- **Descompacta arquivos (tar.gz)**

    ```bash
    tar -xzvf <arquivo.tar.gz>
    ```

- **Cria um arquivo zip**

    ```bash
    zip <arquivo.zip> <file_name>
    ```

- **Descompacta um arquivo zip**

    ```bash
    unzip <arquivo.zip>
    ```

## Sistemas e Usuários

- **Exibe informações sobre o sistema**

    ```bash
    uname -a
    ```

- **Lista os usuários ativos**

    ```bash
    who
    ```

- **Adiciona um usuário**

    ```bash
    sudo adduser <username>
    ```

- **Remove um usuário**

    ```bash
    sudo deluser <username>
    ```

- **Alterna para outro usuário**

    ```bash
    su <username>
    ```

## Comandos Úteis

- **Exibe o histórico de comandos**

    ```bash
    history
    ```

- **Executa um comando como superusuário**

    ```bash
    sudo <comando>
    ```

- **Exibe a localização de um comando**

    ```bash
    which <comando>
    ```

- **Exibe o manual de um comando**

    ```bash
    man <comando>
    ```

- **Limpa o terminal**

    ```bash
    clear
    ```
