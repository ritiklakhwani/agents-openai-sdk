import 'dotenv/config'
import { Agent, run } from "@openai/agents"

const location = 'spain'

const helloAgent = new Agent({
    name: "hello agent",
    instructions: () => {
      return location === 'india' ? 'say namaste with the users name' : 'say holaaa with the username'
    }
}) 

run(helloAgent, "hello my name is ritik!").then((result) => {
    console.log(result.finalOutput)
})