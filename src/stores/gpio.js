import { defineStore } from 'pinia'

const useGpioStore = defineStore('gpio', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      digitalOutput:[
        {pin: "D25", status: false},
        {pin: "D2", status: true},
      ],
      digitalInput:[
        {pin: "D0", status: true},
        {pin: "D15", status: false},
      ],
    }
  }
})

export default useGpioStore