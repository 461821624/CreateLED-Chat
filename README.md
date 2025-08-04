# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

// AI平台名称映射
const aiNameMap = {
  qwen: '阿里通义千问',
  hunyuan: '腾讯混元',
  deepseek: 'DeepSeek',
  chatgpt: 'ChatGPT',
  doubao: '豆包',
  ernie: '文心一言',
  glm: '智谱GLM'
}

// AI平台URL映射
const aiUrlMap = {
  qwen: 'https://www.tongyi.com/qianwen',
  hunyuan: 'https://yuanbao.tencent.com/chat',
  deepseek: 'https://chat.deepseek.com/',
  chatgpt: 'https://chat.openai.com/',
  doubao: 'https://www.doubao.com/chat/',
  ernie: 'https://yiyan.baidu.com/',
  glm: 'https://chatglm.cn/'
}


```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
