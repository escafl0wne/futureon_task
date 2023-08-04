
// Requiring module
import process from 'process';


  
// An example displaying the respective memory
// usages in megabytes(MB)
const getMemoryUsage = () => {
    for (const [key,value] of Object.entries(process.memoryUsage())){
        console.log(`Memory usage by ${key}, ${value/1000000}MB `)
    }
}
export default getMemoryUsage