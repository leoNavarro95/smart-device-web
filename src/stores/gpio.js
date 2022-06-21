import { defineStore } from 'pinia'

const useGpio = defineStore('gpio', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      pin: "D0",
      status: false,
    }
  }
})

export default useGpio