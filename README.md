# 🎞️ movie-store

Projeto de uma loja virtual de filmes com funcionalidades essenciais, abrangendo interface, integração com API e navegação básica construído como teste para posição de Front-End na DOT Digital Group.

## 🛠️ Stack

Este projeto foi construído com:

- [Vue](https://vuejs.org/) - Framework para construção de interfaces
- [Vuex](https://vuex.vuejs.org/) - Biblioteca para gerenciamento de estado
- [Vitest](https://vitest.dev/) - Framework para implementação de testes
- [ESLint](https://eslint.org/) - Ferramenta de lint para garantir qualidade do código
- [pnpm](https://pnpm.io/pt/) - Gerenciador de pacotes

> ℹ️ Utilizei Vuex pois era um requisito obrigatório do teste, hoje em dia eu utilizaria o [Pinia](https://pinia.vuejs.org/) que é recomendado pelo próprio time do Vue.

## 🏃 Como rodar o projeto?

Primeiro acesse o diretório do projeto e instale as dependências

```sh
pnpm install

# ou

npm install
```

Copiei o arquivo `.env` e preencha a credencial da chave de API do TMDB (VITE_TMDB_API_KEY)

```sh
cp .env.example .env.local
```

Compilar e ativar hot-reload para desenvolvimento

```sh
pnpm dev

# ou

npm run dev
```

Rodar lint no código

```sh
pnpm lint

# ou

npm run lint
```

Fazer Type-Check, compiar e minificar para build de produção

```sh
pnpm build

# ou

npm run build
```

Rodar testes unitários

```sh
pnpm test:unit

# ou

npm run test:unit
```

Rodar coverage e servir página de coverage

```sh
pnpm test:coverage

# ou

npm run test:coverage
```

Em um novo terminal, abra o index.html do coverage

```sh
open coverage/index.html
```

## 🚀 Features extras

- 🧪 Testes automatizados: Implementação de testes utilizando Vitest com mais de 80% de coverage
- 💾 Storage: Os estados do carrinho e favoritos são salvos no localStorage do navegador
- 🦯 Acessibilidade (ay11): Navegação por teclado, focus trap no sidebar e modal, utilização de ARIAs
- 🖱️ Scrollbar: Adição de estilos customizados na scrollbar para complementar layout
- 🧛 Dark mode: Adicionado toggle para alteração entre modo claro e escuro
- 🔎 Busca de filmes com debounce: O input de busca solicita novos filmes na API utilizando de um debounce de 1000ms para evitar chamadas desnecessárias
- ⬆️ Back to top: Adição de botão e voltar ao topo quando scrollar para baixo
- 🏡 Busca de CEP (na API [ViaCEP](https://viacep.com.br)): Quando usuário digita o CEP completo ele é buscado na API e preenche o restante dos campos automaticamente
- ⭐ Sidebar de favoritos: É possível adicionar e remover filmes dos favoritos e verificar eles na sidebar. Também é possível adicionar diretamente ao carrinho pelo sidebar.
- 🕶️ Modal de detalhes: Modal de detalhes do filme com estilização moderna
- 📭 Empty state: Adição de estado quando não houver resultado para busca e quando carrinho e favoritos estiverem vazios
- ❌ Error handling: Validação de erros e notificações via toast

## 🚧 Melhorias não implementadas (mas pensadas)

- Chamada para buscar detalhes do filme na API
- Internacionalização e select de idioma
