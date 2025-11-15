# Plano de Testes QA - Sistema de Theme Toggle

## Visão Geral

Este documento detalha todos os casos de teste necessários para validar a implementação do sistema de alternância de temas (dark/light mode) na aplicação. Os testes cobrem funcionalidade, UI/UX, performance, acessibilidade, compatibilidade e cenários de borda.

---

## 1. Testes Funcionais

### TC-FUNC-001: Alternância Básica de Tema (Claro → Escuro)

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação carregada com tema claro ativo
- Usuário está na página inicial

**Passos**:
1. Identificar o botão de alternância de tema no header (ícone de lua)
2. Clicar no botão de tema
3. Observar a mudança visual da aplicação

**Resultado Esperado**:
- Aplicação muda para tema escuro
- Ícone do botão muda de lua para sol
- Header muda de cor clara para escura
- Todas as seções da página refletem o tema escuro
- Mudança ocorre instantaneamente (sem delay perceptível)

**Dados de Teste**: N/A

---

### TC-FUNC-002: Alternância Básica de Tema (Escuro → Claro)

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação carregada com tema escuro ativo
- Usuário está na página inicial

**Passos**:
1. Identificar o botão de alternância de tema no header (ícone de sol)
2. Clicar no botão de tema
3. Observar a mudança visual da aplicação

**Resultado Esperado**:
- Aplicação muda para tema claro
- Ícone do botão muda de sol para lua
- Header muda de cor escura para clara
- Todas as seções da página refletem o tema claro
- Mudança ocorre instantaneamente (sem delay perceptível)

**Dados de Teste**: N/A

---

### TC-FUNC-003: Persistência de Preferência - Mesmo Navegador

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação aberta pela primeira vez (sem preferência salva)
- Usar navegador em modo normal (não anônimo)

**Passos**:
1. Alternar para tema escuro
2. Navegar para outra página da aplicação (ex: /chat)
3. Fechar a aba do navegador
4. Abrir nova aba e acessar a aplicação novamente

**Resultado Esperado**:
- Na etapa 2: tema escuro é mantido durante navegação
- Na etapa 4: aplicação carrega diretamente no tema escuro
- Preferência do usuário foi persistida no localStorage

**Dados de Teste**: N/A

---

### TC-FUNC-004: Persistência de Preferência - Múltiplas Abas

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta em duas abas diferentes do mesmo navegador
- Ambas as abas no tema claro

**Passos**:
1. Na Aba 1: Alternar para tema escuro
2. Aguardar 2 segundos
3. Mudar para Aba 2
4. Recarregar a Aba 2

**Resultado Esperado**:
- Aba 2 após reload deve carregar no tema escuro
- Ambas as abas devem estar sincronizadas

**Dados de Teste**: N/A

---

### TC-FUNC-005: Sincronização com Preferência do Sistema Operacional

**Prioridade**: Alta

**Pré-condições**:
- Primeira visita à aplicação (localStorage limpo)
- Sistema operacional configurado com tema escuro

**Passos**:
1. Limpar localStorage do site
2. Acessar a aplicação
3. Observar o tema carregado

**Resultado Esperado**:
- Aplicação carrega automaticamente no tema escuro
- Botão de tema exibe ícone de sol (indicando tema escuro ativo)

**Dados de Teste**: Testar com SO em dark mode e light mode

---

### TC-FUNC-006: Mudança de Tema do SO em Tempo Real

**Prioridade**: Média

**Pré-condições**:
- Aplicação aberta sem preferência manual salva (usando tema do sistema)
- Sistema operacional com tema claro

**Passos**:
1. Manter aplicação aberta
2. Alterar o tema do sistema operacional para escuro
3. Retornar para a aplicação

**Resultado Esperado**:
- Aplicação detecta a mudança e atualiza automaticamente para tema escuro
- Botão de tema reflete a mudança

**Dados de Teste**: N/A

**Nota**: Este comportamento depende da configuração do next-themes e da API do navegador

---

### TC-FUNC-007: Alternância Múltiplas Vezes Consecutivas

**Prioridade**: Média

**Pré-condições**:
- Aplicação carregada com tema claro

**Passos**:
1. Clicar 10 vezes consecutivas no botão de tema (rápido)
2. Observar o comportamento da aplicação

**Resultado Esperado**:
- Cada clique alterna corretamente o tema
- Não ocorrem travamentos ou bugs visuais
- Estado final é consistente com o número de cliques (par = claro, ímpar = escuro)
- Performance permanece fluida

**Dados de Teste**: N/A

---

### TC-FUNC-008: Navegação Entre Páginas Mantém Tema

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema escuro ativo
- Usuário na página inicial

**Passos**:
1. Navegar para a página de chat (/chat)
2. Voltar para a página inicial
3. Abrir o menu lateral
4. Navegar para qualquer outra rota disponível

**Resultado Esperado**:
- Tema escuro é mantido em todas as navegações
- Não ocorre flash de tema claro durante transições de rota
- Botão de tema permanece visível e consistente em todas as páginas

**Dados de Teste**: Testar todas as rotas principais da aplicação

---

## 2. Testes de UI/UX

### TC-UI-001: Posicionamento do Botão no Header

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta em desktop (1920x1080)

**Passos**:
1. Acessar a página inicial
2. Localizar o header
3. Identificar a posição do botão de tema

**Resultado Esperado**:
- Botão está no lado direito do header
- Ordem dos elementos: Logo (esquerda) → [espaço] → Botão Tema → Botão Chat → Botão Menu (direita)
- Alinhamento vertical está correto (centralizado com outros botões)
- Espaçamento entre botões é consistente (gap de 0.5rem / 8px)

**Dados de Teste**: N/A

---

### TC-UI-002: Ícone Correto por Tema - Modo Claro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema claro ativo

**Passos**:
1. Observar o ícone no botão de tema

**Resultado Esperado**:
- Ícone exibido é uma lua (MoonIcon)
- Ícone tem tamanho de 1.2rem x 1.2rem
- Ícone está visualmente claro e nítido
- Cor do ícone contrasta adequadamente com o fundo do botão

**Dados de Teste**: N/A

---

### TC-UI-003: Ícone Correto por Tema - Modo Escuro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema escuro ativo

**Passos**:
1. Observar o ícone no botão de tema

**Resultado Esperado**:
- Ícone exibido é um sol (SunIcon)
- Ícone tem tamanho de 1.2rem x 1.2rem
- Ícone está visualmente claro e nítido
- Cor do ícone contrasta adequadamente com o fundo do botão

**Dados de Teste**: N/A

---

### TC-UI-004: Transições Suaves - Sem Animações Bruscas

**Prioridade**: Média

**Pré-condições**:
- Aplicação com tema claro ativo

**Passos**:
1. Clicar no botão de tema
2. Observar a transição visual

**Resultado Esperado**:
- Mudança de tema ocorre instantaneamente (sem animação de fade/transition em cores de fundo)
- Troca de ícone é suave e sem tremulações
- Não há efeito de "piscar" ou flicker
- Layout não sofre shift ou saltos

**Dados de Teste**: N/A

**Nota**: disableTransitionOnChange está ativo, então não deve haver transitions CSS

---

### TC-UI-005: Estilo do Botão - Variant Outline

**Prioridade**: Baixa

**Pré-condições**:
- Aplicação aberta em qualquer tema

**Passos**:
1. Inspecionar visualmente o botão de tema
2. Comparar com outros botões do header (Chat, Menu)

**Resultado Esperado**:
- Botão tem borda visível (outline variant)
- Estilo é consistente com os outros botões do header
- Tamanho é "icon" (quadrado, não retangular)
- Padding e dimensões são idênticos aos botões adjacentes

**Dados de Teste**: N/A

---

### TC-UI-006: Hover State do Botão

**Prioridade**: Média

**Pré-condições**:
- Aplicação aberta em desktop
- Mouse disponível

**Passos**:
1. Posicionar o cursor sobre o botão de tema (sem clicar)
2. Observar a mudança visual

**Resultado Esperado**:
- Botão apresenta feedback visual de hover (mudança sutil de cor/opacidade)
- Cursor muda para pointer (indicando interatividade)
- Feedback é consistente com outros botões da aplicação

**Dados de Teste**: Testar em ambos os temas (claro e escuro)

---

### TC-UI-007: Focus State do Botão (Navegação por Teclado)

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta
- Foco no início da página

**Passos**:
1. Pressionar Tab repetidamente até alcançar o botão de tema
2. Observar o estado de foco

**Resultado Esperado**:
- Botão recebe outline/ring visível quando focado
- Indicador de foco é claramente perceptível em ambos os temas
- Ordem de tab faz sentido (logo → tema → chat → menu)

**Dados de Teste**: N/A

---

### TC-UI-008: Responsividade - Mobile (375px)

**Prioridade**: Alta

**Pré-condições**:
- Dispositivo móvel ou DevTools com emulação de iPhone SE (375x667)

**Passos**:
1. Acessar a aplicação
2. Verificar o header

**Resultado Esperado**:
- Botão de tema permanece visível
- Tamanho do botão é apropriado para toque (mínimo 44x44px)
- Não há overlap com outros elementos
- Layout do header se adapta sem quebras

**Dados de Teste**: Testar em 375px, 390px, 414px

---

### TC-UI-009: Responsividade - Tablet (768px)

**Prioridade**: Média

**Pré-condições**:
- Tablet ou DevTools com emulação de iPad (768x1024)

**Passos**:
1. Acessar a aplicação
2. Verificar o header em orientação portrait e landscape

**Resultado Esperado**:
- Botão de tema visível e funcional em ambas orientações
- Espaçamento adequado entre elementos
- Tamanho de toque apropriado

**Dados de Teste**: Testar portrait e landscape

---

### TC-UI-010: Layout Shift - Botão Desabilitado Inicial

**Prioridade**: Média

**Pré-condições**:
- Primeira carga da página
- Throttling de CPU ativado (4x slowdown no DevTools)

**Passos**:
1. Recarregar a página com throttling ativo
2. Observar o botão de tema durante o carregamento

**Resultado Esperado**:
- Botão aparece inicialmente desabilitado (com ícone de sol)
- Após hidratação, botão se torna ativo
- Não ocorre mudança de tamanho ou posição do botão
- Layout não sofre shift durante a ativação

**Dados de Teste**: N/A

---

### TC-UI-011: Contraste de Cores - Tema Claro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema claro ativo

**Passos**:
1. Usar ferramenta de análise de contraste (ex: WAVE, axe DevTools)
2. Verificar contraste do ícone do botão contra o fundo

**Resultado Esperado**:
- Ratio de contraste mínimo de 3:1 (WCAG AA para UI components)
- Ícone é claramente visível
- Borda do botão tem contraste adequado

**Dados de Teste**: Usar Chrome DevTools > Lighthouse > Accessibility

---

### TC-UI-012: Contraste de Cores - Tema Escuro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema escuro ativo

**Passos**:
1. Usar ferramenta de análise de contraste
2. Verificar contraste do ícone do botão contra o fundo

**Resultado Esperado**:
- Ratio de contraste mínimo de 3:1 (WCAG AA)
- Ícone é claramente visível em fundo escuro
- Borda do botão tem contraste adequado

**Dados de Teste**: Usar Chrome DevTools > Lighthouse > Accessibility

---

## 3. Testes de Performance

### TC-PERF-001: Tempo de Alternância de Tema

**Prioridade**: Alta

**Pré-condições**:
- Aplicação carregada completamente
- Chrome DevTools Performance tab aberto

**Passos**:
1. Iniciar gravação de performance
2. Clicar no botão de tema
3. Parar gravação após 2 segundos

**Resultado Esperado**:
- Tempo total de alternância < 100ms
- Não há frames dropados durante a mudança
- FPS permanece estável (60fps)

**Dados de Teste**: N/A

---

### TC-PERF-002: Impacto no Carregamento Inicial da Página

**Prioridade**: Média

**Pré-condições**:
- Cache do navegador limpo
- Network throttling: Fast 3G

**Passos**:
1. Limpar cache
2. Recarregar a página
3. Verificar métricas no Lighthouse

**Resultado Esperado**:
- First Contentful Paint (FCP) não aumentou significativamente
- Time to Interactive (TTI) não aumentou significativamente
- Tamanho do bundle JavaScript aumentou menos de 15KB (next-themes é leve)
- Score de Performance > 90 no Lighthouse

**Dados de Teste**: N/A

---

### TC-PERF-003: Prevenção de FOUC (Flash of Unstyled Content)

**Prioridade**: Crítica

**Pré-condições**:
- Preferência de tema escuro salva no localStorage
- Cache desabilitado

**Passos**:
1. Recarregar a página múltiplas vezes (10x)
2. Observar o carregamento inicial

**Resultado Esperado**:
- Não ocorre flash de tema claro antes de mostrar o tema escuro
- Aplicação carrega diretamente no tema correto
- Script inline do next-themes é executado antes da renderização

**Dados de Teste**: Testar com ambos os temas salvos

---

### TC-PERF-004: Cumulative Layout Shift (CLS)

**Prioridade**: Alta

**Pré-condições**:
- Cache limpo
- Lighthouse rodando

**Passos**:
1. Executar Lighthouse no Chrome DevTools
2. Verificar métrica de CLS

**Resultado Esperado**:
- CLS score < 0.1 (good)
- Botão de tema não causa layout shift ao ser ativado
- suppressHydrationWarning previne shifts de hidratação

**Dados de Teste**: N/A

---

### TC-PERF-005: Re-renderizações Desnecessárias

**Prioridade**: Baixa

**Pré-condições**:
- React DevTools Profiler instalado
- Aplicação em modo de desenvolvimento

**Passos**:
1. Abrir React DevTools > Profiler
2. Iniciar gravação
3. Clicar no botão de tema
4. Parar gravação

**Resultado Esperado**:
- Apenas componentes que dependem do tema são re-renderizados
- ThemeToggle renderiza uma vez
- Componentes não relacionados a tema não re-renderizam
- useCallback está funcionando corretamente

**Dados de Teste**: N/A

---

### TC-PERF-006: Impacto de Memória

**Prioridade**: Baixa

**Pré-condições**:
- Chrome DevTools Memory tab aberto

**Passos**:
1. Tirar snapshot de memória inicial
2. Alternar tema 50 vezes
3. Forçar garbage collection
4. Tirar snapshot final

**Resultado Esperado**:
- Não há memory leaks detectados
- Uso de memória não aumenta significativamente (< 5MB de diferença)
- Objetos são coletados pelo GC corretamente

**Dados de Teste**: N/A

---

## 4. Testes de Acessibilidade

### TC-A11Y-001: Navegação por Teclado - Tab para o Botão

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação aberta
- Foco no início da página

**Passos**:
1. Pressionar Tab até alcançar o botão de tema
2. Verificar se o botão recebe foco visível

**Resultado Esperado**:
- Botão é alcançável via Tab
- Indicador de foco é claramente visível
- Ordem de tabulação faz sentido logicamente

**Dados de Teste**: N/A

---

### TC-A11Y-002: Ativação por Teclado - Enter

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação com tema claro
- Botão de tema focado via Tab

**Passos**:
1. Pressionar Enter

**Resultado Esperado**:
- Tema alterna para escuro
- Ícone muda de lua para sol
- Foco permanece no botão

**Dados de Teste**: N/A

---

### TC-A11Y-003: Ativação por Teclado - Espaço

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação com tema escuro
- Botão de tema focado via Tab

**Passos**:
1. Pressionar barra de Espaço

**Resultado Esperado**:
- Tema alterna para claro
- Ícone muda de sol para lua
- Foco permanece no botão

**Dados de Teste**: N/A

---

### TC-A11Y-004: ARIA Label - Tema Claro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema claro ativo

**Passos**:
1. Inspecionar o botão de tema no DevTools
2. Verificar o atributo aria-label

**Resultado Esperado**:
- aria-label está presente
- Valor é "Alternar para tema escuro"
- Texto é descritivo e em português

**Dados de Teste**: N/A

---

### TC-A11Y-005: ARIA Label - Tema Escuro

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com tema escuro ativo

**Passos**:
1. Inspecionar o botão de tema no DevTools
2. Verificar o atributo aria-label

**Resultado Esperado**:
- aria-label está presente
- Valor é "Alternar para tema claro"
- Texto é descritivo e em português
- Label muda dinamicamente com o tema

**Dados de Teste**: N/A

---

### TC-A11Y-006: Screen Reader - NVDA (Windows)

**Prioridade**: Alta

**Pré-condições**:
- Windows com NVDA instalado
- Aplicação aberta no Firefox

**Passos**:
1. Ativar NVDA
2. Navegar até o botão de tema com Tab
3. Ouvir o anúncio do NVDA

**Resultado Esperado**:
- NVDA anuncia "Alternar para tema [claro/escuro], botão"
- Usuário entende claramente a função do botão
- Após clicar, NVDA confirma a mudança de estado (se houver feedback)

**Dados de Teste**: N/A

---

### TC-A11Y-007: Screen Reader - VoiceOver (macOS)

**Prioridade**: Alta

**Pré-condições**:
- macOS com VoiceOver ativado
- Aplicação aberta no Safari

**Passos**:
1. Ativar VoiceOver (Cmd + F5)
2. Navegar até o botão de tema
3. Ouvir o anúncio do VoiceOver

**Resultado Esperado**:
- VoiceOver anuncia "Alternar para tema [claro/escuro], botão"
- Navegação é fluida e sem problemas
- Estado do botão é comunicado claramente

**Dados de Teste**: N/A

---

### TC-A11Y-008: Screen Reader - JAWS (Windows)

**Prioridade**: Média

**Pré-condições**:
- Windows com JAWS instalado
- Aplicação aberta no Chrome

**Passos**:
1. Ativar JAWS
2. Navegar até o botão de tema
3. Ouvir o anúncio do JAWS

**Resultado Esperado**:
- JAWS anuncia corretamente o propósito do botão
- Tipo de elemento (button) é anunciado
- Usuário consegue ativar o botão sem problemas

**Dados de Teste**: N/A

---

### TC-A11Y-009: Contraste em Alto Contraste do Windows

**Prioridade**: Média

**Pré-condições**:
- Windows com modo de alto contraste ativado
- Aplicação aberta

**Passos**:
1. Ativar modo de alto contraste no Windows
2. Acessar a aplicação
3. Verificar visibilidade do botão de tema

**Resultado Esperado**:
- Botão permanece visível
- Ícone é claramente perceptível
- Borda do botão é visível
- Contraste atende aos requisitos de alto contraste

**Dados de Teste**: Testar com diferentes esquemas de alto contraste

---

### TC-A11Y-010: Zoom 200% - Responsividade de Acessibilidade

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta em navegador desktop

**Passos**:
1. Aumentar zoom para 200% (Ctrl/Cmd + "+")
2. Verificar o header e botão de tema

**Resultado Esperado**:
- Botão permanece visível e acessível
- Não há overlap com outros elementos
- Funcionalidade permanece intacta
- Layout adapta adequadamente

**Dados de Teste**: Testar em 200%, 300%, 400%

---

### TC-A11Y-011: Lighthouse Accessibility Score

**Prioridade**: Alta

**Pré-condições**:
- Chrome DevTools
- Aplicação carregada

**Passos**:
1. Abrir DevTools > Lighthouse
2. Executar auditoria de Accessibility
3. Verificar score e issues relacionados ao theme toggle

**Resultado Esperado**:
- Score de Accessibility > 95
- Sem erros relacionados ao botão de tema
- ARIA labels validados corretamente
- Contraste validado com sucesso

**Dados de Teste**: Testar em ambos os temas

---

### TC-A11Y-012: Usuários com Deficiência Motora - Tamanho do Target

**Prioridade**: Média

**Pré-condições**:
- Aplicação em dispositivo móvel real ou emulador

**Passos**:
1. Tentar tocar no botão de tema com precisão variada
2. Medir dimensões do botão

**Resultado Esperado**:
- Botão tem mínimo de 44x44px (WCAG 2.1 AA)
- Área de toque é suficiente para usuários com dificuldades motoras
- Espaçamento entre botões evita toques acidentais

**Dados de Teste**: N/A

---

## 5. Testes de Compatibilidade

### TC-COMPAT-001: Chrome Desktop (Versão Mais Recente)

**Prioridade**: Crítica

**Pré-condições**:
- Google Chrome versão mais recente (124+)
- Windows 10/11 ou macOS

**Passos**:
1. Abrir aplicação no Chrome
2. Executar todos os testes funcionais básicos (TC-FUNC-001 a TC-FUNC-003)

**Resultado Esperado**:
- Todas as funcionalidades operam perfeitamente
- Sem erros no console
- Persistência funciona corretamente

**Dados de Teste**: N/A

---

### TC-COMPAT-002: Firefox Desktop (Versão Mais Recente)

**Prioridade**: Crítica

**Pré-condições**:
- Mozilla Firefox versão mais recente (125+)
- Windows 10/11 ou macOS

**Passos**:
1. Abrir aplicação no Firefox
2. Executar testes funcionais básicos

**Resultado Esperado**:
- Funcionalidade idêntica ao Chrome
- Renderização visual consistente
- localStorage funciona corretamente

**Dados de Teste**: N/A

---

### TC-COMPAT-003: Safari Desktop (Versão Mais Recente)

**Prioridade**: Alta

**Pré-condições**:
- Safari versão mais recente (17+)
- macOS Sonoma ou superior

**Passos**:
1. Abrir aplicação no Safari
2. Executar testes funcionais básicos

**Resultado Esperado**:
- Todas as funcionalidades operam corretamente
- Sem problemas de renderização específicos do WebKit
- Transições e animações funcionam

**Dados de Teste**: N/A

---

### TC-COMPAT-004: Edge Desktop (Versão Mais Recente)

**Prioridade**: Alta

**Pré-condições**:
- Microsoft Edge versão mais recente (124+)
- Windows 10/11

**Passos**:
1. Abrir aplicação no Edge
2. Executar testes funcionais básicos

**Resultado Esperado**:
- Comportamento idêntico ao Chrome (ambos são Chromium)
- Sem issues específicos do Edge
- Integração com tema do Windows funciona

**Dados de Teste**: N/A

---

### TC-COMPAT-005: Chrome Mobile (Android)

**Prioridade**: Crítica

**Pré-condições**:
- Dispositivo Android real (Android 12+)
- Chrome for Android mais recente

**Passos**:
1. Acessar aplicação via Chrome mobile
2. Testar alternância de tema por toque
3. Verificar persistência após fechar e reabrir o navegador

**Resultado Esperado**:
- Botão é facilmente tocável
- Tema alterna corretamente
- Persistência funciona em mobile
- Performance é fluida

**Dados de Teste**: Testar em pelo menos 2 dispositivos Android diferentes

---

### TC-COMPAT-006: Safari Mobile (iOS)

**Prioridade**: Crítica

**Pré-condições**:
- Dispositivo iOS real (iOS 16+)
- Safari for iOS

**Passos**:
1. Acessar aplicação via Safari mobile
2. Testar alternância de tema por toque
3. Verificar persistência após fechar e reabrir o navegador

**Resultado Esperado**:
- Funcionalidade idêntica à versão desktop
- Sem problemas de renderização no iOS
- Botão responde adequadamente ao toque
- Persistência funciona

**Dados de Teste**: Testar em iPhone e iPad

---

### TC-COMPAT-007: Navegadores Antigos - Chrome 100

**Prioridade**: Baixa

**Pré-condições**:
- Chrome versão 100 (ou usar BrowserStack)

**Passos**:
1. Acessar aplicação
2. Testar funcionalidade básica de alternância

**Resultado Esperado**:
- Funcionalidade degrada graciosamente
- Aplicação não quebra
- Preferência de tema do sistema pode não funcionar, mas alternância manual funciona

**Dados de Teste**: N/A

---

### TC-COMPAT-008: Diferentes Sistemas Operacionais - Windows 11

**Prioridade**: Alta

**Pré-condições**:
- Windows 11 com tema escuro do sistema ativado

**Passos**:
1. Primeira visita à aplicação
2. Verificar tema inicial

**Resultado Esperado**:
- Aplicação detecta tema escuro do Windows
- Carrega automaticamente no tema escuro

**Dados de Teste**: Testar com tema claro e escuro do Windows

---

### TC-COMPAT-009: Diferentes Sistemas Operacionais - macOS Sonoma

**Prioridade**: Alta

**Pré-condições**:
- macOS Sonoma com Auto (tema que muda com hora do dia)

**Passos**:
1. Primeira visita à aplicação durante o dia (tema claro do macOS)
2. Verificar tema inicial

**Resultado Esperado**:
- Aplicação detecta tema claro do macOS
- Carrega no tema claro

**Dados de Teste**: Testar com diferentes configurações de aparência do macOS

---

### TC-COMPAT-010: Diferentes Sistemas Operacionais - Linux (Ubuntu)

**Prioridade**: Média

**Pré-condições**:
- Ubuntu 22.04+ com GNOME
- Tema escuro do sistema ativo

**Passos**:
1. Acessar aplicação via Firefox no Linux
2. Verificar detecção de tema do sistema

**Resultado Esperado**:
- Detecção de tema funciona no Linux
- Funcionalidade completa mantida

**Dados de Teste**: N/A

---

## 6. Testes de Cenários de Borda

### TC-EDGE-001: Primeira Visita - Sem Preferência de Sistema

**Prioridade**: Média

**Pré-condições**:
- Navegador/SO que não suporta prefers-color-scheme
- Primeira visita (localStorage vazio)

**Passos**:
1. Acessar a aplicação
2. Verificar tema carregado

**Resultado Esperado**:
- Aplicação carrega no tema claro (fallback padrão)
- Botão de tema funciona normalmente
- Não há erros no console

**Dados de Teste**: Simular com navegador antigo ou desabilitar prefers-color-scheme via DevTools

---

### TC-EDGE-002: localStorage Desabilitado

**Prioridade**: Alta

**Pré-condições**:
- Navegador configurado para bloquear localStorage
- Ou navegação em modo privado/anônimo (alguns navegadores)

**Passos**:
1. Desabilitar localStorage no navegador
2. Acessar aplicação
3. Alternar tema
4. Recarregar página

**Resultado Esperado**:
- Aplicação não quebra
- Alternância funciona durante a sessão
- Após reload, volta ao tema padrão (system)
- Mensagem de aviso pode ser exibida (opcional)

**Dados de Teste**: N/A

---

### TC-EDGE-003: JavaScript Desabilitado

**Prioridade**: Média

**Pré-condições**:
- JavaScript desabilitado no navegador

**Passos**:
1. Desabilitar JavaScript
2. Acessar aplicação

**Resultado Esperado**:
- Botão de tema está presente mas não funcional (esperado)
- Aplicação carrega no tema padrão do sistema (se detectável via CSS)
- Não há erros críticos
- Resto da aplicação degrada graciosamente

**Dados de Teste**: N/A

**Nota**: Next.js requer JavaScript, então funcionalidade limitada é esperada

---

### TC-EDGE-004: Cookies e Armazenamento Bloqueados (GDPR/Privacy Mode)

**Prioridade**: Média

**Pré-condições**:
- Navegador com bloqueio total de cookies e armazenamento

**Passos**:
1. Configurar bloqueio total
2. Acessar aplicação
3. Tentar alternar tema

**Resultado Esperado**:
- Similar ao TC-EDGE-002
- Funcionalidade opera durante a sessão
- Preferência não persiste entre visitas

**Dados de Teste**: N/A

---

### TC-EDGE-005: Mudança de Tema do SO Durante Uso da Aplicação

**Prioridade**: Média

**Pré-condições**:
- Aplicação aberta usando tema do sistema (sem preferência manual)
- Sistema operacional com tema claro

**Passos**:
1. Manter aplicação aberta e visível
2. Mudar tema do SO para escuro nas configurações do sistema
3. Retornar à aplicação

**Resultado Esperado**:
- Aplicação detecta mudança automaticamente
- Tema atualiza para escuro sem necessidade de reload
- Transição é suave

**Dados de Teste**: Testar em Windows, macOS, e Linux

---

### TC-EDGE-006: Dados Corrompidos no localStorage

**Prioridade**: Baixa

**Pré-condições**:
- Acesso ao localStorage via DevTools

**Passos**:
1. Abrir aplicação
2. Abrir DevTools > Application > localStorage
3. Definir chave "theme" com valor inválido (ex: "invalid-theme")
4. Recarregar página

**Resultado Esperado**:
- Aplicação não quebra
- Fallback para tema padrão (system)
- Valor corrompido é sobrescrito na próxima interação

**Dados de Teste**: Valores de teste: "invalid-theme", null, undefined, "123", "{}"

---

### TC-EDGE-007: Alternância Durante Carregamento de Página

**Prioridade**: Baixa

**Pré-condições**:
- Network throttling ativo (Slow 3G)
- Aplicação não totalmente carregada

**Passos**:
1. Iniciar carregamento da página com throttling
2. Assim que o botão aparecer, tentar clicar (antes da hidratação completa)

**Resultado Esperado**:
- Botão está desabilitado até hidratação completar
- Clique antes da hidratação não causa erro
- Após hidratação, botão se torna funcional

**Dados de Teste**: N/A

---

### TC-EDGE-008: Múltiplas Janelas do Navegador Abertas

**Prioridade**: Baixa

**Pré-condições**:
- Aplicação aberta em 3 janelas diferentes do mesmo navegador
- Todas no tema claro

**Passos**:
1. Na Janela 1: alternar para tema escuro
2. Observar Janelas 2 e 3 (sem reload)
3. Recarregar Janelas 2 e 3

**Resultado Esperado**:
- Janelas 2 e 3 não atualizam automaticamente sem reload (comportamento esperado)
- Após reload manual, Janelas 2 e 3 carregam no tema escuro
- Todas as janelas compartilham o mesmo localStorage

**Dados de Teste**: N/A

---

### TC-EDGE-009: Resolução Extremamente Baixa (320px)

**Prioridade**: Baixa

**Pré-condições**:
- DevTools com viewport de 320x568 (iPhone 5)

**Passos**:
1. Acessar aplicação
2. Verificar visibilidade do botão de tema

**Resultado Esperado**:
- Botão permanece visível
- Não há overflow horizontal
- Funcionalidade mantida
- Layout não quebra

**Dados de Teste**: N/A

---

### TC-EDGE-010: Resolução Extremamente Alta (4K)

**Prioridade**: Baixa

**Pré-condições**:
- Monitor 4K (3840x2160) ou emulação

**Passos**:
1. Acessar aplicação em resolução 4K
2. Verificar header e botão de tema

**Resultado Esperado**:
- Botão mantém tamanho apropriado
- Ícone é nítido (SVG renderiza bem)
- Layout do header se expande adequadamente

**Dados de Teste**: N/A

---

### TC-EDGE-011: Conexão Intermitente

**Prioridade**: Baixa

**Pré-condições**:
- DevTools com Network Offline

**Passos**:
1. Carregar aplicação
2. Ir para modo offline
3. Tentar alternar tema
4. Voltar online

**Resultado Esperado**:
- Alternância funciona offline (é client-side)
- Persistência funciona mesmo offline
- Ao voltar online, estado é mantido

**Dados de Teste**: N/A

---

## 7. Testes de Regressão

### TC-REG-001: QueryProvider Ainda Funciona

**Prioridade**: Crítica

**Pré-condições**:
- Aplicação com componentes que usam React Query

**Passos**:
1. Navegar para página que faz queries (ex: chat)
2. Verificar se as queries funcionam
3. Alternar tema
4. Verificar se queries ainda funcionam

**Resultado Esperado**:
- React Query opera normalmente
- Queries são executadas com sucesso
- Cache do React Query não é afetado
- Mudança de tema não interfere com queries

**Dados de Teste**: Testar com queries de GET, POST, mutations

---

### TC-REG-002: Toaster (Notificações) Funciona em Ambos os Temas

**Prioridade**: Alta

**Pré-condições**:
- Funcionalidade que dispara toast notifications

**Passos**:
1. Tema claro: disparar uma notificação
2. Alternar para tema escuro
3. Disparar outra notificação

**Resultado Esperado**:
- Notificações aparecem corretamente em ambos os temas
- Cores das notificações se adaptam ao tema
- Contraste adequado em ambos os modos
- Posicionamento e animações funcionam

**Dados de Teste**: Testar toast de sucesso, erro, info, warning

---

### TC-REG-003: Botão de Chat Funciona Normalmente

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta

**Passos**:
1. Clicar no botão de Chat (ao lado do botão de tema)
2. Verificar navegação

**Resultado Esperado**:
- Navegação para /chat funciona
- Botão está na posição correta
- Funcionalidade não foi afetada pela adição do theme toggle
- Espaçamento e layout corretos

**Dados de Teste**: N/A

---

### TC-REG-004: Menu Lateral (Sheet) Funciona Normalmente

**Prioridade**: Alta

**Pré-condições**:
- Aplicação aberta

**Passos**:
1. Clicar no botão de Menu
2. Verificar abertura do Sheet
3. Fechar o Sheet
4. Alternar tema
5. Repetir passos 1-3

**Resultado Esperado**:
- Sheet abre e fecha corretamente em ambos os temas
- Conteúdo do menu é visível em ambos os temas
- Animações funcionam suavemente
- Backdrop tem opacidade adequada

**Dados de Teste**: N/A

---

### TC-REG-005: Logo e Navegação para Home

**Prioridade**: Média

**Pré-condições**:
- Usuário em qualquer página

**Passos**:
1. Clicar no logo
2. Verificar navegação

**Resultado Esperado**:
- Logo permanece visível em ambos os temas
- Clique no logo navega para home (se implementado)
- Posicionamento não foi afetado

**Dados de Teste**: N/A

---

### TC-REG-006: Roteamento e Navegação Geral

**Prioridade**: Alta

**Pré-condições**:
- Aplicação com múltiplas rotas

**Passos**:
1. Navegar entre diferentes páginas
2. Alternar tema em cada página
3. Usar botão voltar/avançar do navegador

**Resultado Esperado**:
- Navegação funciona normalmente
- Tema é mantido durante navegação
- Histórico do navegador não é afetado
- Não há re-renders desnecessários

**Dados de Teste**: Testar todas as rotas principais

---

### TC-REG-007: Formulários e Inputs

**Prioridade**: Alta

**Pré-condições**:
- Páginas com formulários

**Passos**:
1. Preencher um formulário no tema claro
2. Alternar para tema escuro
3. Continuar preenchendo
4. Submeter formulário

**Resultado Esperado**:
- Dados do formulário não são perdidos na alternância
- Inputs são visíveis e funcionais em ambos os temas
- Validação funciona normalmente
- Submit funciona corretamente

**Dados de Teste**: Testar com diferentes tipos de input

---

### TC-REG-008: Modais e Dialogs

**Prioridade**: Média

**Pré-condições**:
- Funcionalidade que abre modais

**Passos**:
1. Abrir um modal no tema claro
2. Alternar tema com modal aberto
3. Verificar aparência

**Resultado Esperado**:
- Modal se adapta ao novo tema instantaneamente
- Conteúdo permanece legível
- Backdrop adapta opacidade se necessário
- Funcionalidade do modal não é afetada

**Dados de Teste**: N/A

---

### TC-REG-009: Autenticação (Se Aplicável)

**Prioridade**: Crítica

**Pré-condições**:
- Sistema de autenticação implementado

**Passos**:
1. Fazer login
2. Alternar tema
3. Navegar pela aplicação autenticada
4. Fazer logout

**Resultado Esperado**:
- Estado de autenticação não é afetado
- Token/session permanece válido
- Tema é mantido após login/logout
- Não há conflitos entre ThemeProvider e AuthProvider

**Dados de Teste**: N/A

---

### TC-REG-010: API Calls e Data Fetching

**Prioridade**: Alta

**Pré-condições**:
- Página que faz chamadas de API

**Passos**:
1. Carregar página que faz fetch de dados
2. Enquanto dados estão carregando, alternar tema
3. Verificar que dados carregam corretamente

**Resultado Esperado**:
- Mudança de tema não cancela requests em andamento
- Dados são exibidos corretamente após carregamento
- Loading states são visíveis em ambos os temas
- Erro states (se houver) são visíveis em ambos os temas

**Dados de Teste**: N/A

---

## 8. Matriz de Priorização

### Casos de Teste Críticos (Executar Primeiro)

| ID | Descrição | Área |
|---|---|---|
| TC-FUNC-001 | Alternância Claro → Escuro | Funcional |
| TC-FUNC-002 | Alternância Escuro → Claro | Funcional |
| TC-FUNC-003 | Persistência de Preferência | Funcional |
| TC-PERF-003 | Prevenção de FOUC | Performance |
| TC-A11Y-001 | Navegação por Teclado | Acessibilidade |
| TC-A11Y-002 | Ativação por Enter | Acessibilidade |
| TC-A11Y-003 | Ativação por Espaço | Acessibilidade |
| TC-COMPAT-001 | Chrome Desktop | Compatibilidade |
| TC-COMPAT-002 | Firefox Desktop | Compatibilidade |
| TC-COMPAT-005 | Chrome Mobile Android | Compatibilidade |
| TC-COMPAT-006 | Safari Mobile iOS | Compatibilidade |
| TC-REG-001 | QueryProvider Funciona | Regressão |
| TC-REG-009 | Autenticação Não Afetada | Regressão |

### Casos de Teste de Alta Prioridade

| ID | Descrição | Área |
|---|---|---|
| TC-FUNC-004 | Persistência Múltiplas Abas | Funcional |
| TC-FUNC-005 | Sincronização com SO | Funcional |
| TC-FUNC-008 | Tema Mantido na Navegação | Funcional |
| TC-UI-001 | Posicionamento do Botão | UI/UX |
| TC-UI-002 | Ícone Correto - Modo Claro | UI/UX |
| TC-UI-003 | Ícone Correto - Modo Escuro | UI/UX |
| TC-UI-007 | Focus State | UI/UX |
| TC-UI-008 | Responsividade Mobile 375px | UI/UX |
| TC-UI-011 | Contraste - Tema Claro | UI/UX |
| TC-UI-012 | Contraste - Tema Escuro | UI/UX |
| TC-PERF-001 | Tempo de Alternância | Performance |
| TC-PERF-004 | Cumulative Layout Shift | Performance |
| TC-A11Y-004 | ARIA Label - Tema Claro | Acessibilidade |
| TC-A11Y-005 | ARIA Label - Tema Escuro | Acessibilidade |
| TC-A11Y-006 | Screen Reader NVDA | Acessibilidade |
| TC-A11Y-007 | Screen Reader VoiceOver | Acessibilidade |
| TC-A11Y-010 | Zoom 200% | Acessibilidade |
| TC-A11Y-011 | Lighthouse Score | Acessibilidade |
| TC-COMPAT-003 | Safari Desktop | Compatibilidade |
| TC-COMPAT-004 | Edge Desktop | Compatibilidade |
| TC-COMPAT-008 | Windows 11 | Compatibilidade |
| TC-COMPAT-009 | macOS Sonoma | Compatibilidade |
| TC-EDGE-002 | localStorage Desabilitado | Cenários de Borda |
| TC-REG-002 | Toaster Funciona | Regressão |
| TC-REG-003 | Botão Chat Funciona | Regressão |
| TC-REG-004 | Menu Lateral Funciona | Regressão |
| TC-REG-006 | Roteamento Geral | Regressão |
| TC-REG-007 | Formulários | Regressão |
| TC-REG-010 | API Calls | Regressão |

### Casos de Teste de Média Prioridade

| ID | Descrição | Área |
|---|---|---|
| TC-FUNC-006 | Mudança de Tema do SO em Tempo Real | Funcional |
| TC-FUNC-007 | Alternância Múltiplas Vezes | Funcional |
| TC-UI-004 | Transições Suaves | UI/UX |
| TC-UI-006 | Hover State | UI/UX |
| TC-UI-009 | Responsividade Tablet | UI/UX |
| TC-UI-010 | Layout Shift Inicial | UI/UX |
| TC-PERF-002 | Impacto no Carregamento | Performance |
| TC-A11Y-008 | Screen Reader JAWS | Acessibilidade |
| TC-A11Y-009 | Alto Contraste Windows | Acessibilidade |
| TC-A11Y-012 | Tamanho do Target | Acessibilidade |
| TC-COMPAT-010 | Linux Ubuntu | Compatibilidade |
| TC-EDGE-001 | Primeira Visita Sem Preferência | Cenários de Borda |
| TC-EDGE-003 | JavaScript Desabilitado | Cenários de Borda |
| TC-EDGE-004 | Armazenamento Bloqueado | Cenários de Borda |
| TC-EDGE-005 | Mudança de Tema do SO Durante Uso | Cenários de Borda |
| TC-REG-005 | Logo e Navegação | Regressão |
| TC-REG-008 | Modais e Dialogs | Regressão |

### Casos de Teste de Baixa Prioridade

| ID | Descrição | Área |
|---|---|---|
| TC-UI-005 | Estilo do Botão | UI/UX |
| TC-PERF-005 | Re-renderizações | Performance |
| TC-PERF-006 | Impacto de Memória | Performance |
| TC-COMPAT-007 | Chrome 100 (Antigo) | Compatibilidade |
| TC-EDGE-006 | Dados Corrompidos | Cenários de Borda |
| TC-EDGE-007 | Alternância Durante Carregamento | Cenários de Borda |
| TC-EDGE-008 | Múltiplas Janelas | Cenários de Borda |
| TC-EDGE-009 | Resolução 320px | Cenários de Borda |
| TC-EDGE-010 | Resolução 4K | Cenários de Borda |
| TC-EDGE-011 | Conexão Intermitente | Cenários de Borda |

---

## 9. Ambiente de Teste Recomendado

### Setup Mínimo para Teste Completo

**Navegadores Desktop**:
- Chrome/Edge (mais recente)
- Firefox (mais recente)
- Safari 17+ (macOS)

**Navegadores Mobile**:
- Chrome for Android (dispositivo real)
- Safari for iOS (iPhone/iPad real)

**Sistemas Operacionais**:
- Windows 11 (tema claro e escuro)
- macOS Sonoma+ (tema claro e escuro)
- Android 12+ (1 dispositivo)
- iOS 16+ (1 dispositivo)

**Ferramentas**:
- Chrome DevTools (Lighthouse, Performance, Accessibility)
- React DevTools (Profiler)
- Screen readers: NVDA (Windows), VoiceOver (macOS)
- Browser extensions: axe DevTools, WAVE

**Dispositivos Físicos Recomendados**:
- 1 smartphone Android (ex: Pixel, Samsung)
- 1 iPhone (iOS 16+)
- 1 tablet (iPad ou Android)

---

## 10. Critérios de Aprovação

A funcionalidade de Theme Toggle será considerada **aprovada** quando:

1. **100% dos casos críticos** passarem sem erros
2. **95%+ dos casos de alta prioridade** passarem
3. **Lighthouse Accessibility score ≥ 95** em ambos os temas
4. **Sem erros de console** em navegadores principais
5. **Tempo de alternância < 100ms** (TC-PERF-001)
6. **Sem FOUC detectado** em 10 testes consecutivos (TC-PERF-003)
7. **CLS score < 0.1** (TC-PERF-004)
8. **Funcionalidade em todos os navegadores principais** (Chrome, Firefox, Safari, Edge)
9. **Funcionalidade em mobile** (Android e iOS)
10. **Nenhum teste de regressão crítico falhando**

### Critérios de Bloqueio (Showstoppers)

Os seguintes problemas são **bloqueadores de release**:

- Botão de tema não funciona em qualquer navegador principal
- FOUC severo (flash visível de tema errado)
- Preferência não persiste no localStorage
- Erro de JavaScript que quebra a aplicação
- Problema de acessibilidade crítico (não navegável por teclado)
- CLS > 0.25
- Funcionalidade quebra em Chrome ou Safari mobile
- Contraste inadequado causando texto ilegível

---

## 11. Notas para Execução

1. **Limpar Estado Entre Testes**: Sempre limpar localStorage e cookies entre testes quando necessário para garantir estado limpo

2. **Documentar Bugs**: Para qualquer falha, capturar:
   - Screenshot ou vídeo
   - Console logs
   - Ambiente (navegador, OS, versão)
   - Passos para reproduzir
   - Severidade (Critical/High/Medium/Low)

3. **Testes Automatizados**: Os seguintes testes são candidatos para automação:
   - TC-FUNC-001 a TC-FUNC-008 (Playwright/Cypress)
   - TC-PERF-003 (FOUC detection)
   - TC-A11Y-011 (Lighthouse CI)

4. **Testes Manuais Obrigatórios**:
   - Todos os testes de screen reader
   - Testes em dispositivos físicos
   - Testes de contraste visual

5. **Ordem de Execução Sugerida**:
   - Fase 1: Testes Funcionais Críticos
   - Fase 2: Testes de UI/UX e Acessibilidade
   - Fase 3: Testes de Performance
   - Fase 4: Testes de Compatibilidade
   - Fase 5: Testes de Regressão
   - Fase 6: Cenários de Borda

---

## 12. Checklist de Validação Final

Antes de aprovar a feature, confirmar:

- [ ] Todos os testes críticos executados e aprovados
- [ ] Testes em pelo menos 3 navegadores desktop diferentes
- [ ] Testes em dispositivos Android e iOS reais
- [ ] Lighthouse Accessibility score documentado
- [ ] Screen reader testado (pelo menos NVDA ou VoiceOver)
- [ ] Performance validada (tempo de alternância, CLS, FOUC)
- [ ] Persistência testada em múltiplas sessões
- [ ] Testes de regressão confirmam que funcionalidades existentes não foram afetadas
- [ ] Documentação de bugs criada para issues encontrados
- [ ] Sign-off do tech lead ou responsável pela feature

---

**Data de Criação do Plano**: 2025-11-15
**Versão**: 1.0
**Autor**: QA Team
**Feature**: Sistema de Theme Toggle (Dark/Light Mode)
