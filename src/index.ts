import express from 'express'
import cors from 'cors'

// Porta do servidor
const PORT = process.env.PORT || 3000

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const buildErrorMessage = (message: string) => {
  return {
    errorMessage: message
  }
}

// Endpoint raiz
app.get('/', (req, res) => {
    const greetings = {
      message: "Olá! Este é um simples 'hello world' anabolizado, em Node. Utilize o endpoint /repositorios/$username$"
    }
    res.status(200).json(greetings)
})

app.get('/repositorios', (req, res) => {
  res.status(400).json(buildErrorMessage("Error requisting GitHub API."))
})

app.get('/repositorios/:user', (req, res) => {
  const userToFetch = req.params.user;
  fetch(`https://api.github.com/users/${userToFetch}/repos`)
  .then((response) => response.json())
  .then((json) => res.status(200).json(json))
  .catch((error) => {
    console.log(error);
    res.status(404).json(buildErrorMessage("Error requisting GitHub API."))
  })
})

// Cors
app.use(cors({
    origin: ['*']
}))

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
  console.log("Bad Request")
  res.sendStatus(400)
})

// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})