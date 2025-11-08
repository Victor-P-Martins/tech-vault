# 🎨 Tech Vault - Guia de Assets Personalizados

## Assets que você precisa criar/adicionar:

### 1. **Favicon (Icon)**
- **Caminho**: `quartz/static/icon.png`
- **Recomendações**:
  - Tamanho: 512x512px ou 256x256px
  - Formato: PNG com fundo transparente
  - Design sugerido: Um cofre/vault estilizado com elementos tech (circuitos, código, etc)
  - Cores: Use azul (#3b82f6) e roxo (#8b5cf6) - as cores do tema

### 2. **OG Image (Open Graph - preview em redes sociais)**
- **Caminho**: `quartz/static/og-image.png`
- **Recomendações**:
  - Tamanho: 1200x630px (padrão OG)
  - Formato: PNG
  - Design sugerido:
    - Fundo: Gradient escuro (#0a0a0f → #1a1a24)
    - Texto: "Tech Vault" em fonte Inter, bold
    - Elementos decorativos: Grid pattern sutil, ícones de código
    - Cores: Azul neon (#60a5fa) e roxo (#a78bfa)

## Ferramentas sugeridas para criar:

### Online (Fácil):
- **Canva** - canva.com (templates prontos)
- **Figma** - figma.com (design profissional)
- **Photopea** - photopea.com (Photoshop online grátis)

### IA (Rápido):
- **DALL-E** / **Midjourney** / **Stable Diffusion**
- Prompt sugerido: "modern tech vault icon, minimalist, blue and purple gradient, technology themed, transparent background"

### Alternativa rápida:
Use um gerador de favicon como:
- **favicon.io** - Crie um favicon com texto "TV" ou "⚡"
- **realfavicongenerator.net** - Upload qualquer imagem e gere todos os tamanhos

## Após criar os assets:

1. Substitua os arquivos em `quartz/static/`:
   - `icon.png` → Seu novo favicon
   - `og-image.png` → Sua nova og-image

2. Execute o build do Quartz:
   ```bash
   npx quartz build
   ```

3. Ou para development:
   ```bash
   npx quartz build --serve
   ```

## Cores oficiais do Tech Vault:

### Light Mode:
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Background: `#ffffff`
- Text: `#111827`

### Dark Mode:
- Primary: `#60a5fa` (Light Blue)
- Secondary: `#a78bfa` (Light Purple)
- Background: `#0a0a0f`
- Text: `#f9fafb`

---

**Dica**: Se quiser algo super rápido, use um emoji como favicon! Substitua o icon.png por um ícone de emoji convertido para PNG:
- 🔐 (cadeado)
- 🗄️ (arquivo)
- ⚡ (raio)
- 💎 (diamante)
- 🔮 (bola de cristal)
