const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')

const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', startGame)

class Game
{
    constructor()
    {
        this.start()
        this.generator()
        setTimeout( () => this.lightSequence(), 500) 
        
    }

    start()
    {
        this.level = 1
        this.colors = [
            green,
            red,
            yellow,
            blue
        ]
        startBtn.classList.add('hide')
        

    }
    
    generator()
    {
         this.list = new Array(10)

        for(var i = 0; i < this.list.length; i++ )
        {
            var random = Math.floor( Math.random()*4 )
            this.list[i] = random
        }
        console.log(this.list)

    }

    lightSequence()
    {
        for(let i = 0; i < this.level; i++)
        {
            const color = this.list[i]
            console.log(color)
            setTimeout( () => this.turnOnColors(color), 2000 * i)
        }
    }

    turnOnColors(color)
    {
        this.colors[color].classList.add('light')
        setTimeout( () => this.turnOffColors(color), 1000)
    }

    turnOffColors(color)
    {
        this.colors[color].classList.remove('light')
    }
    

}

function startGame()  
{
    console.log('Play!')
    window.play = new Game
}