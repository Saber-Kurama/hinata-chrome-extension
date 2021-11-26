
import '../styles/global.css';
import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: '开发助手设置',
  },
});

export default app;
