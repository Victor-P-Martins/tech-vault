Um **JWT** é um padrão aberto (RFC 7519) usado para **autenticação e troca segura de informações** entre sistemas, baseado em **assinaturas digitais**.  
Ele garante que os dados não foram adulterados e que só quem possui a **chave privada** correta pode assinar os tokens.

## Estrutura do JWT

Um token JWT é composto por **três partes**, separadas por pontos (`.`):

```bash
HEADER.PAYLOAD.SIGNATURE
```
Exemplo:
```
eyJhbGciOiJSUzUxMiIsImtpZCI6ImtleV9pZCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNzM1MjE1NjAwfQ.d0qXK3...
```
### Header
Define **metadados** sobre o token, como:

- **alg**: algoritmo de assinatura usado (ex.: `RS512` → RSA com SHA-512).
    
- **kid**: identificador da chave usada (importante quando o servidor aceita várias chaves públicas).

### **Payload (Claims)**

Contém as **informações (claims)** que queremos transmitir.  
Existem três tipos de claims:

- **Registered Claims**: padrões do protocolo (ex.: `iss`, `exp`, `sub`).
    
- **Public Claims**: definidas pela aplicação (ex.: `role`, `permissions`).
    
- **Private Claims**: específicas de acordos entre cliente e servidor.
    

Exemplo típico usado por sistemas:

``` json
{
	"iss": "nome_sistema",                              // quem emitiu o token
	"sub": "700e55f9-15b0-4f95-8094-960138a0d886", // usuário
	"exp": 1735215600,                             // expira em ... (epoch)
	"nbf": 1735215300,                             // não válido antes de ...
	"jti": "a00cd6dd-4e55-4694-aeb5-4050e7d063b6"  // ID único do token 
}
```
### O que são **chaves**?

Quando falamos em **criptografia assimétrica** (usada pelo JWT), temos **dois tipos de chaves**:

- **Chave Privada**
    
    - Segredo que fica só com você (cliente).
        
    - Usada para **assinar** tokens (provar que foi você quem criou).
        
    - **Nunca deve ser compartilhada**.
        
- **Chave Pública**
    
    - Pode ser distribuída para qualquer sistema.
        
    - Usada para **verificar assinaturas**.
        
    - Não consegue gerar tokens, apenas validar.
        

Importante: o que a **privada faz**, só a **pública correspondente** consegue verificar.
### O que é uma **assinatura digital**?

É um **código criptográfico** que prova que os dados foram criados e não foram alterados.  
Funciona assim:

1. Você tem um **conteúdo** (no caso do JWT, é o `header.payload`).
    
2. Aplica uma função de hash (ex.: SHA-512) → gera uma “impressão digital” dos dados.
    
3. Usa sua **chave privada** para encriptar essa impressão digital → isso vira a **assinatura**.
    
4. O token final contém:
    
    `header.payload.signature`
    

Quando o sistema recebe:

1. Pega o mesmo `header.payload`.
    
2. Calcula o hash (SHA-512).
    
3. Usa a **chave pública** do cliente para decifrar a assinatura.
    
4. Se os dois hashes batem → a assinatura é válida → dados não foram alterados.

### **Signature**

A **assinatura digital** garante a **integridade e autenticidade** do token.

Processo:

1. Concatena o **Header codificado em Base64** com o **Payload codificado em Base64**:
    
    `base64UrlEncode(header) + "." + base64UrlEncode(payload)`
    
2. Aplica o algoritmo escolhido (ex.: RS512), usando a **chave privada** do cliente.
    
3. Gera a assinatura, também codificada em Base64.

``` bash
signature = RS512(privateKey, base64UrlEncode(header) + "." + base64UrlEncode(payload))
```
Não, o **número “4096 bits”** que a Feedzai recomenda **não é o `e`**. Vamos separar:

---

## 📌 O que a Feedzai recomenda

- **Algoritmo:** RS512
    
    - Ou seja: **RSA** com SHA-512 (para assinar/validar).
        
    - Nome técnico: **RSASSA-PKCS1-v1_5 com SHA-512**.
        
- **Tamanho da chave:** 4096 bits
    
    - Isso significa que o **módulo `n`** (aquele número gigante) terá **4096 bits de comprimento**.
        
    - Esse tamanho é o que garante a força criptográfica da chave (quanto maior, mais difícil quebrar).
        

---

## 📌 E o que é o `e` (exponent)?

- O `e` é o **expoente público**.
    
- Ele **não é 4096**, nem precisa ser grande.
    
- Quase sempre vale **65537** (por padrão), que no Base64URL vira `"AQAB"`.
    
- Ele é fixo e usado junto com `n` na matemática do RSA.
    

---

## 📌 Então o que é cada coisa?

- **`n` (modulus):** número gigante, com **4096 bits** → representa a força da chave.
    
- **`e` (exponent):** número pequeno, tipicamente **65537**, fixo e igual para praticamente todas as chaves.
    
- **RS512:** algoritmo que diz como assinar/verificar (RSA + SHA-512).
    

---

### ✅ Em resumo:

- O **4096 bits** se refere ao **tamanho do `n`** (módulo da chave RSA).
    
- O **`e`** continua sendo o expoente público, quase sempre **65537 / `"AQAB"`**.
    
- O **algoritmo RS512** é a forma como a assinatura é calculada e validada (não tem a ver com o valor de `n` ou `e`, mas usa ambos).
    

---

👉 Quer que eu desenhe um **fluxo matemático simplificado** mostrando como `n`, `e` e a assinatura se encaixam no RS512? Tipo: como a assinatura RSA com SHA-512 é verificada internamente?

##### Você disse:

Mas porque esse padrão AQAB Quero entender o que é esse expoente publico

###### O ChatGPT disse:

Excelente 👏 você está indo **bem fundo** no RSA. Vamos explicar de forma clara o que é esse **expoente público (`e`)** e porque quase sempre aparece como `"AQAB"` em JWKs.

---

# 🔑 O que é o **expoente público (`e`)** no RSA?

O RSA se baseia em **dois números**:

- **`n` (modulus):** número gigantesco (produto de dois primos grandes `p × q`).
    
- **`e` (exponent):** expoente público, usado para "elevar" valores na matemática da assinatura/criptação.
    

📌 A chave pública é o par **(n, e)**.

Na matemática RSA:

- Para **verificar uma assinatura**, o servidor faz algo do tipo:
    
    `mensagem = (assinatura ^ e) mod n`
    
    (significa: pega a assinatura, eleva a `e`, tira o resto da divisão por `n`)
    
- O resultado deve coincidir com o **hash assinado** (SHA-512, no caso do RS512).
    

---

# 📚 Valores comuns para `e`

- O `e` precisa ser:
    
    - Um número **inteiro positivo**.
        
    - **Coprimo** de `(p-1)(q-1)` (para que o RSA funcione matematicamente).
        
- Historicamente já se usaram:
    
    - `3` (rápido, mas inseguro em alguns cenários).
        
    - `17` (melhor, mas ainda raro).
        
    - `65537` (mais usado hoje).
        

👉 **65537 virou o padrão** porque:

- É grande o suficiente para evitar ataques de baixa entropia.
    
- É pequeno o suficiente para ser eficiente em cálculo.
    
- Tem boas propriedades matemáticas (primo de Fermat → `2^16 + 1`).
    

---

# 📌 Mas por que `"AQAB"`?

- Em JWKs, os números (`n` e `e`) são codificados em **Base64URL**.
    
- `65537` em hexadecimal = `0x010001`.
    
- Em Base64URL isso vira:
    
    `0x010001 → "AQAB"`
    

Ou seja:

- `"AQAB"` nada mais é do que **65537 codificado em Base64URL**.
    
- Sempre que você ver `"AQAB"` em um JWK → significa que o expoente público é o **padrão 65537**.
    

---

# ✅ Resumindo

- O **expoente público `e`** é parte da chave pública RSA.
    
- Ele define como a operação de verificação (ou criptografia) é feita.
    
- O valor padrão é **65537**, por segurança e eficiência.
    
- Em JWKs, esse número aparece como `"AQAB"` → apenas a representação em Base64URL de `65537`.

Show, vamos quebrar isso item por item 👇. Esses são os **parâmetros de uma chave pública RSA em formato JWK (JSON Web Key)**, que a Feedzai espera receber.

---

## 🔢 **e – Exponent**

- Nome completo: **RSA public exponent**.
    
- É um número usado na equação da criptografia RSA.
    
- Junto com `n` (modulus), define a chave pública.
    
- Quase sempre vale `65537` → que em **Base64URL** vira `"AQAB"`.
    
- 📌 É padrão e raramente muda.
    

---

## 🧮 **n – Modulus**

- Nome completo: **RSA public modulus**.
    
- É o **número gigante** que resulta da multiplicação de dois primos grandes (p × q).
    
- Esse valor é **único para cada par de chaves** e define a "força" da chave.
    
- No JWK, ele aparece como uma string enorme em Base64URL.
    
- 📌 Esse é o coração da sua chave pública RSA.
    

---

## 🔑 **kty – Key Type**

- Tipo de chave.
    
- Para RSA, deve ser `"RSA"`.
    
- Isso indica ao servidor qual algoritmo matemático usar para interpretar `n` e `e`.
    
- Existem outros tipos possíveis (ex.: `"EC"` para curvas elípticas), mas no caso da Feedzai sempre será `"RSA"`.
    

---

## 🏷️ **kid – Key ID**

- **Identificador da chave**.
    
- É só uma **string** definida por você (ou pela ferramenta que gerou a chave).
    
- Serve para o servidor (Feedzai) saber **qual chave pública usar** para validar a assinatura do JWT.
    
- Exemplo: `"mykey2"` ou um UUID (`"a28db6df-f2f4-4267..."`).
    
- 📌 Muito importante quando há **várias chaves** registradas (ex.: rotação de chaves).
    

---

## ✍️ **use – Public Key Use**

- Define a **finalidade da chave**.
    
- `"sig"` → assinatura (para verificar JWTs).
    
- `"enc"` → encriptação (para cifrar dados, menos comum nesse caso).
    
- No contexto da Feedzai, sempre `"sig"`, porque a chave será usada apenas para **verificar assinaturas digitais**.
    

---

# ✅ Resumindo

Um JWK RSA tem esses parâmetros principais:

| Campo | O que é          | Pra que serve                                                 |
| ----- | ---------------- | ------------------------------------------------------------- |
| `e`   | Expoente público | Número fixo usado no cálculo RSA (`65537` → `"AQAB"`)         |
| `n`   | Módulo público   | Número gigante único que identifica sua chave RSA             |
| `kty` | Tipo da chave    | `"RSA"` (no caso do RS512)                                    |
| `kid` | Identificador    | Nome/UUID da chave, usado no JWT para achar a pública correta |
| `use` | Uso              | `"sig"` = assinatura digital (verificação de JWTs)            |