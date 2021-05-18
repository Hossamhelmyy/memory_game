document.querySelector(".control-buttons span").onclick = function () {
    document.getElementById('start').play();

    let yourName = prompt("whats your name?")
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML="unKnown";
    }
        else {
            document.querySelector(".name span").innerHTML=yourName ;
        }
        document.querySelector(".control-buttons").remove();
    };
    let blocksContainer = document.querySelector(".memory-game-blocks");
    let blocks = Array.from(blocksContainer.children);
    let orderRange = [...Array(blocks.length).keys()]
    shuffle(orderRange);

    blocks.forEach((block , index)=> {
    block.style.order = orderRange[index];  
    block.addEventListener("click" , function() {
        flip(block);
    })  
    }
    )

    function shuffle(array) {
  let current = array.length,
    temp, 
    random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;
    
        // [1] Save Current Element in Stash
        temp = array[current];
    
        // [2] Current Element = Random Element
        array[current] = array[random];
    
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    
      }
    
      return array;
    }
    
    function flip(selectedBlock) {
        selectedBlock.classList.add('is-flipped')
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        if (allFlippedBlocks.length == 2) {
            stopClicking();
            checkWrongTries(allFlippedBlocks[0], allFlippedBlocks[1])
        }
    }

    function stopClicking() {
        blocksContainer.classList.add('no-clicking')
        setTimeout(()=> {
            blocksContainer.classList.remove("no-clicking")
    }, 2000)
    }
    function checkWrongTries(firstBlock , secondBlock){
        let tries = document.querySelector(".tries span") 
        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
          
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    document.getElementById('success').play();

        }else {
        tries.innerHTML++
        document.getElementById('fail').play();
            setTimeout(()=> {
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
            }, 1000)
        }
    }