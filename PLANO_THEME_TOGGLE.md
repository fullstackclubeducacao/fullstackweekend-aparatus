# Plano de Implementação: Dark/Light Theme Toggle

## Visão Geral
Implementar sistema completo de alternância entre tema claro e escuro com botão no header da aplicação.

## Situação Atual

### ✅ Já existe no projeto:
- `next-themes` instalado (v0.4.6)
- Variáveis CSS para dark/light theme em `app/globals.css`
- shadcn/ui configurado com componentes Radix UI
- Estrutura de cores usando OKLch (perceptualmente uniforme)

### ❌ Faltando:
- ThemeProvider integrado no layout
- Botão de toggle no header
- Estilos dinâmicos baseados no tema

## Análise Técnica

### Configuração Atual de Temas
**Arquivo:** `app/globals.css`
- **Light theme:** Definido em `:root` (linhas 7-65)
- **Dark theme:** Definido em `.dark` (linhas 67-123)
- **Variáveis disponíveis:**
  - Background, foreground, card, popover
  - Primary, secondary, muted, accent
  - Destructive, border, input, ring
  - Chart colors (1-5)
  - Sidebar colors

### Problema Identificado
**Arquivo:** `app/_components/header.tsx` (linha 18)
- Background hardcoded: `bg-white`
- Não responde a mudanças de tema
- Precisa usar variável CSS: `bg-background`

## Etapas de Implementação

### 1. Criar Theme Provider
**Arquivo novo:** `app/_providers/theme-provider.tsx`

**Responsabilidades:**
- Wrapper do `ThemeProvider` do `next-themes`
- Configuração:
  - `attribute="class"` (compatível com `.dark` selector)
  - `defaultTheme="system"` (respeita preferência do SO)
  - `enableSystem={true}`
  - `disableTransitionOnChange={false}` (transições suaves)

**Código esperado:**
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 2. Integrar Provider no Layout
**Arquivo:** `app/layout.tsx`

**Modificações:**
- Importar `ThemeProvider`
- Envolver `children` com `<ThemeProvider>`
- Configurar atributos do provider
- Manter `QueryProvider` existente

**Estrutura esperada:**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
  <QueryProvider>
    {children}
  </QueryProvider>
</ThemeProvider>
```

### 3. Criar Componente Theme Toggle Button
**Arquivo novo:** `app/_components/theme-toggle.tsx`

**Funcionalidades:**
- Client component (`"use client"`)
- Hook `useTheme()` do `next-themes`
- Ícones do `lucide-react`:
  - `SunIcon` para modo claro
  - `MoonIcon` para modo escuro
- Estilo: `Button variant="outline" size="icon"`
- Lógica de toggle: light ↔ dark
- Acessibilidade: aria-label apropriado

**Comportamento:**
- Clique alterna entre light/dark
- Ícone muda conforme tema ativo
- Transição suave

### 4. Adicionar Toggle ao Header
**Arquivo:** `app/_components/header.tsx`

**Modificações necessárias:**

#### Linha 18 - Atualizar background:
```tsx
// Antes:
className="flex items-center justify-between bg-white px-5 py-6"

// Depois:
className="flex items-center justify-between bg-background px-5 py-6"
```

#### Linhas 20-25 - Adicionar botão de theme:
```tsx
<div className="flex items-center gap-2">
  <ThemeToggle />  {/* NOVO */}
  <Button variant="outline" size="icon" asChild>
    <Link href="/chat">
      <MessageCircleIcon />
    </Link>
  </Button>
  {/* ... resto do código ... */}
</div>
```

**Layout visual esperado:**
```
[Logo] .................... [🌙] [💬] [☰]
                          tema chat menu
```

### 5. Ajustar Estilos do Header
**Garantir:**
- Contraste adequado em ambos os temas
- Bordas usando variável `border`
- Texto usando variável `foreground`
- Consistência visual com resto da aplicação

## Arquivos que Serão Criados/Modificados

### Novos Arquivos (2)
1. ✨ `app/_providers/theme-provider.tsx` (~15 linhas)
2. ✨ `app/_components/theme-toggle.tsx` (~25 linhas)

### Arquivos Modificados (2)
1. ✏️ `app/layout.tsx` (+3 linhas)
   - Import ThemeProvider
   - Wrap children

2. ✏️ `app/_components/header.tsx` (+2 linhas, 1 modificação)
   - Import ThemeToggle
   - Adicionar componente
   - Atualizar className background

## Resultado Esperado

### Funcionalidades
✅ Botão de toggle funcional no header
✅ Posicionado entre chat e menu
✅ Alternância suave entre temas
✅ Persistência da preferência do usuário
✅ Suporte a preferência do sistema operacional
✅ Ícones dinâmicos (sol/lua)
✅ Transições suaves de cores

### UX/UI
- Botão com mesmo estilo dos outros (outline, size icon)
- Ícone intuitivo (sol = claro, lua = escuro)
- Feedback visual imediato
- Sem flash de tema incorreto no carregamento

## Dependências
- ✅ `next-themes` (já instalado)
- ✅ `lucide-react` (já instalado)
- ✅ shadcn/ui Button (já existe)

## Considerações Técnicas

### Performance
- Provider usa React Context (re-render mínimo)
- `next-themes` otimizado para SSR/SSG
- CSS variables evitam re-paint excessivo

### Acessibilidade
- Botão com aria-label descritivo
- Contraste WCAG AA em ambos os temas
- Suporte a preferência de movimento reduzido

### Compatibilidade
- Next.js 14+ (App Router)
- React 18+
- Navegadores modernos (CSS variables)

## Teste Manual Sugerido

Após implementação, testar:
1. ✓ Clique no botão alterna o tema
2. ✓ Ícone muda corretamente
3. ✓ Cores do header mudam
4. ✓ Preferência persiste após reload
5. ✓ Tema do sistema é respeitado (primeira visita)
6. ✓ Transições são suaves
7. ✓ Sem erros no console
