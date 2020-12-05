window.addEventListener('DOMContentLoaded', function(){
    function gameOfLife(width, height){
        this.width = width
        this.height = height
        this.board = document.querySelector('#board')
        this.cells = []
        this.createBoard = function(){
            this.board.style.width = this.width * 10 + 'px'
            this.board.style.height = this.height * 10 + 'px'
            this.sum = this.width * this.height
            for (var i = 0; i < this.sum; i++) {
                var divBox = document.createElement('div')
                divBox.id = i
                this.board.appendChild(divBox)
                this.cells.push(divBox)
            }
            // console.log(this.cells)
            this.cells.forEach(element => {
                element.addEventListener('click', function(){
                    element.classList.toggle('live')
                })
            });
        }
        this.index = function(element){
            var yCoor = element.offsetTop
            var yFirst = this.cells[0].offsetTop
            var xCoor = element.offsetLeft
            var xFirst = this.cells[0].offsetLeft
            var x = (xCoor - xFirst)/10
            var y = (yCoor - yFirst)/10
            var index = (x + (y * this.width))
            return [x, y]
        }
        this.setCellState = function(x, y, state){
            var index = (x + (y * this.width))
            var divElement = document.getElementById(index)
            if(state == 'live'){
                divElement.classList.add('live')
            }
            else if(state == 'die'){
                divElement.classList.remove('live')
            }
        }
        // this.firstGlider = function(){
        //     this.setCellState(2, 2, 'live')
        //     this.setCellState(1, 2, 'live')
        //     this.setCellState(2, 4, 'live')
        //     this.setCellState(2, 5, 'live')
        //     this.setCellState(0, 2, 'live')
        // }
        this.computeCellNextState = function(x, y){
            var index = (x + (y * this.width))
            var indexDiv = document.getElementById(index)
            var neighbor = []
            var neigh1 = (x-1) +((y-1) * this.width)
            var neigh2 = x + ((y-1) * this.width)
            var neigh3 = (x+1) + ((y-1) * this.width)
            var neigh4 = (x-1) + (y * this.width)
            var neigh5 = (x+1) + (y * this.width)
            var neigh6 = (x-1) + ((y+1) * this.width)
            var neigh7 = x + ((y+1) * this.width)
            var neigh8 = (x+1) + ((y+1) * this.width)
            neighbor.push(neigh1, neigh2, neigh3, neigh4, neigh5,
                neigh6, neigh7, neigh8)
            var allNeigh = []
            neighbor.forEach(element => {
                var divNeigh = document.getElementById(element)
                allNeigh.push(divNeigh)
            });
            var liveneighbor = 0
            allNeigh.forEach(element => {
                if(element != null && element.classList.contains('live')){
                    liveneighbor++
                }
            });
            var state = ''
            if(indexDiv.classList.contains('live') && liveneighbor < 2){
                state = 'die'
            }
            else if(indexDiv.classList.contains('live') && (liveneighbor == 2 || liveneighbor == 3)){
                state = 'live'
            }
            else if(indexDiv.classList.contains('live') && liveneighbor > 3){
                state = 'die'
            }
            else if(!indexDiv.classList.contains('live') && liveneighbor == 3){
                state = 'live'
            }
            else{
                state = 'die'
            }
            return state
        }
        this.computeNextGeneration = function(){
            var futureBoard = []
            var allCells = document.querySelectorAll('#board div')
            allCells.forEach(element => {
                var cellIndex = this.index(element)
                var nextState = this.computeCellNextState(cellIndex[0], cellIndex[1])
                futureBoard.push(nextState)
            });
            return futureBoard
        }
        this.printNextGeneration = function(){
            var futureBoard = this.computeNextGeneration()
            var allCells = document.querySelectorAll('#board div')
            for(var i = 0; i < allCells.length; i++){
                var index = this.index(allCells[i])
                this.setCellState(index[0], index[1], futureBoard[i])
            }
        }
    }

    var game = new gameOfLife(50, 50)
    game.createBoard()
    
    var playbtn = document.querySelector('#play')
    playbtn.addEventListener('click', function(){
        this.disabled = true
        play = setInterval(game.printNextGeneration.bind(game), 200);
    })
    var pausebtn = document.querySelector('#pause')
    pausebtn.addEventListener('click', function(){
        clearInterval(play)
        var playbtn = document.querySelector('#play')
        playbtn.disabled = false
    })


})



