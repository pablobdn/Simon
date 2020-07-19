const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')

const startBtn = document.getElementById('startBtn')
const LAST_LEVEL = 10

startBtn.addEventListener('click', startGame)

class Game
{
    constructor()
    {
        this.start = this.start.bind(this)
        this.start()
        this.generator()
        setTimeout( () => this.nextLevel(), 800)
    }

    start()
    {
        this.nextLevel = this.nextLevel.bind(this)
        this.userInput = this.userInput.bind(this)
        this.toggleBtn()
        this.level = 1
        this.sequence = 0
        this.colors = [
            green,
            red,
            yellow,
            blue
        ]

    }

    toggleBtn()
    {
        if( startBtn.classList.contains('hide'))
        {
            startBtn.classList.remove('hide')
        }
        else
        {
            startBtn.classList.add('hide')
        }
    }

    nextLevel()
    {
        this.sequence = 0
        this.lightSequence()
        this.listenClick()
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
                    setTimeout( () => this.youWin(this.level), 200)
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
            this.gameOver(this.level)
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

    youWin(level)
    {
        swal("Simon Says", "You Win!", "success", {
            button: "Play Again",
          })
        .then( () => {
            this.removeClicks()
            this.start()
        })

        this.highScore(level)
    }



    
    gameOver(level)
    {
        swal("Simon Says", "Game Over", "error", {
            button: "Play Again",
          })
        .then( () => {
            this.removeClicks()
            this.start()
        })

        this.highScore(level)

        
    }

    highScore(level)
    {
        let highScore = document.getElementById('high-score')
        highScore.innerHTML = level
        localStorage.setItem('high-score', level)
    }

}



function showLastHighScore()
{
    if (localStorage.getItem('high-score') != null)
    {
        score = localStorage.getItem('high-score')
        let highScore = document.getElementById('high-score')
        highScore.innerHTML = score
    }
}

showLastHighScore()

function startGame()  
{
    console.log('Play!')
    window.play = new Game
}