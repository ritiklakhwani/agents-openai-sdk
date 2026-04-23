import 'dotenv/config'
import { Agent, run } from "@openai/agents"

const helloAgent = new Agent({
    name: "hello agent",
    instructions: 'you are an agent that makes nickname of the name that user gave and says hello + nickname! '
}) 

run(helloAgent, "hello my name is ritik!").then((result) => {
    console.log(result.finalOutput)
})