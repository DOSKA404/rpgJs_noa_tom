////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// KEYBOARD  ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////




function keyboard(){

    let moving = true;
    if(key.z.pressed && lastKey === 'z'){
        for(const boundary of boundaries){
            if(player.position.x + player.width >= boundary.position.x &&
              player.position.y + player.height >= (boundary.position.y+5) &&
              player.position.x <= boundary.position.x + boundary.width &&
              player.position.y <= (boundary.position.y+5) + boundary.height
            ){
              console.log("colliding");
              moving = false;
              break;
            }
          }
          for(const boundary of monster1Boundaries){
                if(player.position.x + player.width >= boundary.position.x &&
                  player.position.y + player.height >= (boundary.position.y+5) &&
                  player.position.x <= boundary.position.x + boundary.width &&
                  player.position.y <= (boundary.position.y+5) + boundary.height
                ){
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for(const boundary of monster2Boundaries){
                if(player.position.x + player.width >= boundary.position.x &&
                  player.position.y + player.height >= (boundary.position.y+5) &&
                  player.position.x <= boundary.position.x + boundary.width &&
                  player.position.y <= (boundary.position.y+5) + boundary.height
                ){
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for(const boundary of merchandBoundaries){
                if(player.position.x + player.width >= boundary.position.x &&
                  player.position.y + player.height >= (boundary.position.y+5) &&
                  player.position.x <= boundary.position.x + boundary.width &&
                  player.position.y <= (boundary.position.y+5) + boundary.height
                ){
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
          if(moving){
            for(const movable of movables){
              movable.position.y += 7;
            }
          }
    }else if(key.s.pressed && lastKey === 's'){
        for (const boundary of boundaries) {
            if (player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y-5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y-5) + boundary.height
                ) {
              console.log("colliding");
              moving = false;
              break;
            }
          }
          for (const boundary of monster1Boundaries) {
                if (player.position.x + player.width >= boundary.position.x &&
                    player.position.y + player.height >= (boundary.position.y-5) &&
                    player.position.x <= boundary.position.x + boundary.width &&
                    player.position.y <= (boundary.position.y-5) + boundary.height
                    ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for (const boundary of monster2Boundaries) {
                if (player.position.x + player.width >= boundary.position.x &&
                    player.position.y + player.height >= (boundary.position.y-5) &&
                    player.position.x <= boundary.position.x + boundary.width &&
                    player.position.y <= (boundary.position.y-5) + boundary.height
                    ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for (const boundary of merchandBoundaries) {
                if (player.position.x + player.width >= boundary.position.x &&
                    player.position.y + player.height >= (boundary.position.y-5) &&
                    player.position.x <= boundary.position.x + boundary.width &&
                    player.position.y <= (boundary.position.y-5) + boundary.height
                    ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
        if (moving){
            movables.forEach(movable => {movable.position.y -= 7});
        }
        
    }else if(key.q.pressed && lastKey === 'q'){
        for (const boundary of boundaries) {
            if (
              player.position.x + player.width >= boundary.position.x + 5 &&
              player.position.y + player.height >= boundary.position.y &&
              player.position.x <= boundary.position.x + 5 + boundary.width &&
              player.position.y <= boundary.position.y + boundary.height
              ) {
              console.log("colliding");
              moving = false;
              break;
            }
          }
          for (const boundary of monster1Boundaries) {
                if (
                  player.position.x + player.width >= boundary.position.x + 5 &&
                  player.position.y + player.height >= boundary.position.y &&
                  player.position.x <= boundary.position.x + 5 + boundary.width &&
                  player.position.y <= boundary.position.y + boundary.height
                  ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for (const boundary of monster2Boundaries) {
                if (
                  player.position.x + player.width >= boundary.position.x + 5 &&
                  player.position.y + player.height >= boundary.position.y &&
                  player.position.x <= boundary.position.x + 5 + boundary.width &&
                  player.position.y <= boundary.position.y + boundary.height
                  ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }
              for (const boundary of merchandBoundaries) {
                if (
                  player.position.x + player.width >= boundary.position.x + 5 &&
                  player.position.y + player.height >= boundary.position.y &&
                  player.position.x <= boundary.position.x + 5 + boundary.width &&
                  player.position.y <= boundary.position.y + boundary.height
                  ) {
                  console.log("colliding");
                  moving = false;
                  break;
                }
              }

        if (moving){
            movables.forEach(movable => {movable.position.x += 7});
        }
        
    }else if(key.d.pressed && lastKey === 'd'){
        for(const boundary of boundaries){
            if(player.position.x + player.width >= (boundary.position.x-5) &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= (boundary.position.x-5) + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                 ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        for(const boundary of monster1Boundaries){
                if(player.position.x + player.width >= (boundary.position.x-5) &&
                    player.position.y + player.height >= boundary.position.y &&
                    player.position.x <= (boundary.position.x-5) + boundary.width &&
                    player.position.y <= boundary.position.y + boundary.height
                     ){
                    console.log("colliding");
                    moving = false;
                    break;
                }
            }
            for(const boundary of monster2Boundaries){
                if(player.position.x + player.width >= (boundary.position.x-5) &&
                    player.position.y + player.height >= boundary.position.y &&
                    player.position.x <= (boundary.position.x-5) + boundary.width &&
                    player.position.y <= boundary.position.y + boundary.height
                     ){
                    console.log("colliding");
                    moving = false;
                    break;
                }
            }
            for(const boundary of merchandBoundaries){
                if(player.position.x + player.width >= (boundary.position.x-5) &&
                    player.position.y + player.height >= boundary.position.y &&
                    player.position.x <= (boundary.position.x-5) + boundary.width &&
                    player.position.y <= boundary.position.y + boundary.height
                     ){
                    console.log("colliding");
                    moving = false;
                    break;
                }
            }

        if (moving){
            movables.forEach(movable => {movable.position.x -= 7});
        }
    }
}

