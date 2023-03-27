document.addEventListener('DOMContentLoaded', () => {
    const shroom = document.querySelector('.character')
    let bottom = 0;
    let gravity = 0.9
    let isJumping = false //prevents double jump
    let isGoingLeft = false
    let isGoingRight = false
    let left = 0
    let rightTimerId
    let leftTimerId
    

    const gameArea = document.querySelector('.game');
    const gameAreaWidth = parseInt(window.getComputedStyle(gameArea).getPropertyValue('width'));
    
    
    function jump(){
        if(isJumping) return
        shroom.classList.remove('character-slide')
        shroom.classList.add('character')
        let timerUpId = setInterval( function () {
//made some rules so that the character doesn't fly too far and stops at the bottom
            if(bottom > 250){
            clearInterval(timerUpId) //doens't allow the character fly too high
            let timerDownId = setInterval( function(){
                if (bottom < 0){
                    clearInterval(timerDownId)
                    isJumping = false //prevents double jump
                } //keeps the character from falling of the screen
                bottom -= 5
                shroom.style.bottom = bottom + 'px'
            }, 20)
            }
        
            
//defines how many pixels does the character jump and redusing it by gravity
        isJumping = true //prevents double jump
        bottom += 30
        bottom = bottom * gravity
        shroom.style.bottom = bottom + 'px'
    }, 20)

    } 

    //Makes character movement to the left possible
    function slideLeft(){
        shroom.classList.add('character-slide')
        shroom.classList.remove('character')
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval( function (){
            if(left > 0){
            left -= 5
            shroom.style.left = left + 'px'
        } else {
            clearInterval(leftTimerId)
            isGoingLeft = false
            }
        },20)
        
    }

    function slideRight(){
        shroom.classList.add('character-slide')
        shroom.classList.remove('character')
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingRight = false
        }
        isGoingRight = true
        rightTimerId = setInterval( function (){
            if(left < (gameAreaWidth - 50)){
            left += 5
            shroom.style.left = left + 'px'
        } else {
            clearInterval(rightTimerId)
            isGoingRight = false
            }
        },20)
        
    }
   

    //assign functions to keycodes

    function control(e) {
        if (e.keyCode === 38) {
            jump()
        } else if(e.keyCode === 37) {
            slideLeft() //if we press left
        } else if(e.keyCode === 39){
            slideRight()
        } else if(e.keyCode === 32){
            window.location.reload();
        }
    }

    document.addEventListener('keydown', control)
})