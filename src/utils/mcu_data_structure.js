/**
 * 
 * @param {Array} objectArray The object array to group by the `property`
 * @param {String} property    The property to group by
 * @returns {Array} An object with keys determines by `property`
 * 
 * const people = [
 *   { name: 'Alice', age: 21 },
 *   { name: 'Max', age: 20 },
 *   { name: 'Jane', age: 20 }
 *   ];
 *
 *   let groupedPeople = groupBy(people, 'age')
 *   groupedPeople is:
 *   {
 *   20: [
 *       { name: 'Max', age: 20 },
 *       { name: 'Jane', age: 20 }
 *   ],
 *   21: [{ name: 'Alice', age: 21 }]
 *   }
 */
export const groupBy = (objectArray, property) => {

    return objectArray.reduce((acc, obj) => {
        let key = obj[property]
        if (!acc[key]) {
        acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})
}

/**
 * 
 * @param { Array } gpios All gpios in the mcu
 * @returns Array with not used (availables) gpios
 */
export const getNotUsedGpios = ( gpios ) => {
    let availableGpios = []
    
    gpios.forEach(gpio => {
        if( gpio.used ) return //if gpio is used don't add to array

        availableGpios.push(gpio)
    })

    return availableGpios
}
