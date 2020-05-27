const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')

const startBtn = document.getElementById('startBtn')
const LAST_LEVEL = 2

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
        this.userInput = this.userInput.bind(this)
        this.level = 1
        this.sequence = 0
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
         this.list = new Array(LAST_LEVEL)

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
            setTimeout( () => this.turnOnColors(color), 1000 * i)
        }
        this.listenClick()
    }

    turnOnColors(color)
    {
        this.colors[color].classList.add('light')
        setTimeout( () => this.turnOffColors(color), 500)
    }

    turnOffColors(color)
    {
        this.colors[color].classList.remove('light')
    }
    

    listenClick()
    {
        console.log('waiting user input ...')
        green.addEventListener('click',  this.userInput )
        red.addEventListener('click', this.userInput )
        yellow.addEventListener('click', this.userInput)
        blue.addEventListener('click', this.userInput )
    }

    removeClicks()
    {
        console.log('removing events')
        green.removeEventListener('click',  this.userInput )
        red.removeEventListener('click', this.userInput )
        yellow.removeEventListener('click', this.userInput)
        blue.removeEventListener('click', this.userInput )
    }

    

    userInput(ev)
    {
        console.log(ev.target.id) // name of the id of color clicked
        //Now, i want to light the color clicked
        let colorName = ev.target.id
        const numberColor = this.nameToNumber(colorName)
        console.log(numberColor)
        this.turnOnColors(numberColor)


        if (numberColor === this.list[this.sequence])
        {
            this.sequence++

            
            if (this.sequence === this.level )
            {
                if (this.sequence === LAST_LEVEL)
                {
                    setTimeout( () => this.youWin(), 200)
                }
                else 
                {
                    this.level++
                    this.removeClicks()
                    setTimeout( () => this.nextLevel() , 1400)
                    console.log('next level')
                }
                
            }

        }

        else
        {
            this.gameOver()
        }

        
    }

    nameToNumber(colorName)
    {
        switch(colorName)
        {
            case 'green':
                return 0

            case 'red':
                return 1

            case 'yellow':
                return 2
            
            case 'blue':
                return 3
        }
    }

    nextLevel()
    {
        this.sequence = 0
        this.lightSequence()
    }

    youWin()
    {
        swal("Simon Says", "You Win!", "success")
    }
    
    gameOver()
    {
        swal("Simon Says", "Game Over", "error");
    }

}

function startGame()  
{
    console.log('Play!')
    window.play = new Game
}