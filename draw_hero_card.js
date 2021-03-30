const fs = require("fs")


class Heroes {
    heroes

    constructor() {

    }
}


async function getHeroes() {
    heroInstance = new Heroes()

    if (process.argv.length !== 3) {
        throw(`Exactly 1 argument (a number from 1-5) should be provided. ${process.argv.length - 2} arguments provided.`)
    }

    const argAsNumber = parseInt(process.argv[2])
    
    if (isNaN(argAsNumber)) {
        throw(`Argument should be a number (from 1-5). Argument provided is not a number.`)
    }

    let flooredArg = Math.floor(argAsNumber)

    if (1 > flooredArg || 5 < flooredArg) {
        throw(`Argument should be a number from 1-5. ${flooredArg} provided.`)
    }
    
    fs.readFile("hero_descriptions_shuffled.txt", function(err, buf) {
        const fileText = buf.toString()
        heroInstance.heroes = fileText
            .split("\n")
            .filter(hero => hero.length > 5) //all hero descriptions should be more than 5 characters long
        
        const drawnCards = []

        while (flooredArg > 0) {
            if (heroInstance.heroes.length === 0) {
                console.log(`hero deck is empty!`)
                break
            }

            drawnCards.push(heroInstance.heroes.pop())
            flooredArg--
        }

        if (drawnCards.length === 0) {
            return
        }
        
        const stringToWrite = heroInstance.heroes.join("\n")
    
        fs.writeFile("hero_descriptions_shuffled.txt", stringToWrite, function(err) {
            if(err) {
                return console.log(err)
            }
            console.log("Heroes successfully saved with drawn card(s) removed. Drawn card(s) are as follows:")
            drawnCards.forEach(element => {
                console.log(element)
            })
        })
    })
}


getHeroes()
