
import App from './App.svelte'

const target = document.createElement('main')
document.body.appendChild(target)
const app = new App({ target })

export default app

