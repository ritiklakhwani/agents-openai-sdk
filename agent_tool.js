import "dotenv/config";
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import axios from "axios";

const getWeatherTool = new tool({
  name: "get_weather",
  instructions: "returns the current weather information of the given city",
  parameters: z.object({
    city: z.string().describe("name of the city"),
  }),
  execute: async ({ city }) => {
    // replace this with an api call
    const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
    const response = await axios.get(url, {responseType: 'text'});
    console.log(response)
    return `the weather of ${city} is ${response.data}`;
  },
});

const weatherAgent = new Agent({
  name: "weather agent",
  instructions:
    "you are an expert weather agent that helps user to tell weather report",
  tools: [getWeatherTool],
});

const main = async (query = "") => {
  const response = await run(weatherAgent, query);
  return response.finalOutput;
};

main("what is the weather of ajmer").then((response) => {
  console.log(response);
});
