const fs = require("fs")


class Heroes {
    heroes

    constructor() {

    }
}


async function getHeroes() {
    heroInstance = new Heroes()
    
    fs.readFile("hero_descriptions_current.txt", function(err, buf) {
        const fileText = buf.toString()
        heroInstance.heroes = fileText
            .split("\n")
            .filter(hero => hero.length > 5) //all hero descriptions should be more than 5 characters long

        console.log(`length of read: ${heroInstance.heroes.length}`)
        console.log(heroInstance.heroes)
        
        const arrayToWrite = shuffle(heroInstance.heroes)
        const stringToWrite = arrayToWrite.join("\n")
    
        fs.writeFile("hero_descriptions_shuffled.txt", stringToWrite, function(err) {
            if(err) {
                return console.log(err)
            }
            console.log("Heroes successfully shuffled!\nRun 'node draw_hero_card.js #',\nreplacing # with the number of heroes to draw.")
        })
    })

}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  
    return array
}

getHeroes()
