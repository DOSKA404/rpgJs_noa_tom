////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// KEYBOARD  ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


function keyboard(){
let moving = true;
  player.moving = false;
  if(key.z.pressed && lastKey === 'z'){
    player.moving = true;
    player.image = player.sprites.up;
    if (inGame==true){
      for(const boundary of boundaries){
        if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height){
          moving = false;
          break;
        }
      }
      if (lifeMonster1 > 0){
        for(const boundary of monster1Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster2 > 0){
        for(const boundary of monster2Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster3 > 0){
        for(const boundary of monster3Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      for(const boundary of merchandBoundaries){
        if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height){
          moving = false;
          break;
        }
      }
      if (moving){
        movables.forEach(movable => {movable.position.y += 7});
      }
    }else if (inShop==true){
      if (o!=0){
        o-=1;
        selected = shopInventory[o];
        console.log(o);
      }
      console.log('in shop');
      
    }else{
      if (l!=0){
        l-=1;
        selectedInventory = shopInventory[l];
        console.log(o);
      }
      console.log('in inventory');
    }
  }else if(key.s.pressed && lastKey === 's'){
    player.moving = true;
    player.image = player.sprites.down;
    if (inGame==true){
      for (const boundary of boundaries) {
        if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height){
          moving = false;
          break;
        }
      }
      if (lifeMonster1 > 0){
        for (const boundary of monster1Boundaries) {
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster2 > 0){
        for (const boundary of monster2Boundaries) {
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster3 > 0){
        for (const boundary of monster3Boundaries) {
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      for (const boundary of merchandBoundaries) {
        if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height){
          moving = false;
          break;
        }
      }
      if (moving){
        movables.forEach(movable => {movable.position.y -= 7});
      }
    }else if (inShop==true){
      if (o<shopInventory.length-1){
        o+=1;
        console.log(o);
        selected = shopInventory[o];;
      }
      console.log('in shop');
    }else{
      if (l<inventoryList.length-1){
        l+=1;
        selectedInventory = shopInventory[l];
        console.log(o);
      }
      console.log('in inventory');
    }
  }else if(key.q.pressed && lastKey === 'q'){
    player.moving = true;
    player.image = player.sprites.left;
    if (inGame==true){
      for (const boundary of boundaries) {
        if(player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height){
          moving = false;
          break;
        }
      }
      if (lifeMonster1 > 0){
        for (const boundary of monster1Boundaries) {
          if(player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster2 > 0){
        for (const boundary of monster2Boundaries) {
          if(player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster3 > 0){
        for (const boundary of monster3Boundaries) {
          if(player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      for (const boundary of merchandBoundaries) {
        if(player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height){
          moving = false;
          break;
        }
      }

      if (moving){
        movables.forEach(movable => {movable.position.x += 7});
      }
    }else if (inShop==true){
      if (o!=0){
        o-=1;
        selected = shopInventory[o];
        console.log(o);
      }
      console.log('in shop');
    }else{
      if (l!=0){
        l-=1;
        selectedInventory = shopInventory[l];
        console.log(o);
      }
      console.log('in inventory');
    }
  }else if(key.d.pressed && lastKey === 'd'){
    player.moving = true;
    player.image = player.sprites.right;
    if (inGame==true){
      for(const boundary of boundaries){
        if(player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height){
          moving = false;
          break;
        }
      }
      if (lifeMonster1 > 0){
        for(const boundary of monster1Boundaries){
          if(player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster2 > 0){
        for(const boundary of monster2Boundaries){
          if(player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      if (lifeMonster3 > 0){
        for(const boundary of monster3Boundaries){
          if(player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height){
            moving = false;
            life -= 3;
            break;
          }
        }
      }
      for(const boundary of merchandBoundaries){
        if(player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height){
          moving = false;
          break;
        }
      }

      if (moving){
        movables.forEach(movable => {movable.position.x -= 7});
      }
    }else if (inShop==true){
      if (o<shopInventory.length-1){
        o+=1;
        selected = shopInventory[o];
        console.log(o);
      }
      console.log('in shop');
    }else{
      if (l<inventoryList.length-1){
        l+=1;
        selectedInventory = shopInventory[l];
        console.log(o);
      }
      console.log('in inventory');
    }
  }else if(key.space.pressed && lastKey === ' '){
    if (inGame==true){
      console.log('attaque');
      if (lifeMonster1 > 0){
        for(const boundary of monster1Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height 
          || player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height 
          || player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height
          || player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height
          ){
            moving = false;
            let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            var randomAttack = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            life -= randomNum;
            lifeMonster1 -= randomAttack;
            break;
          }
        }
      }
      if (lifeMonster2 > 0){
        for(const boundary of monster2Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height 
          || player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height 
          ||player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height
          ||player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height
          ){
            moving = false;
            let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            var randomAttack = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            life -= randomNum;
            lifeMonster2 -= randomAttack;
            break;
          }
        }
      }
      if (lifeMonster3 > 0){
        for(const boundary of monster3Boundaries){
          if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height 
          || player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height 
          ||player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height
          ||player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height
          ){
            moving = false;
            let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            var randomAttack = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            life -= randomNum;
            lifeMonster3 -= randomAttack;
            break;
          }
        }
      }
      for(const boundary of merchandBoundaries){
        if(player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y+5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y+5) + boundary.height 
        || player.position.x + player.width >= boundary.position.x && player.position.y + player.height >= (boundary.position.y-5) && player.position.x <= boundary.position.x + boundary.width && player.position.y <= (boundary.position.y-5) + boundary.height 
        || player.position.x + player.width >= boundary.position.x + 5 && player.position.y + player.height >= boundary.position.y && player.position.x <= boundary.position.x + 5 + boundary.width && player.position.y <= boundary.position.y + boundary.height
        || player.position.x + player.width >= (boundary.position.x-5) && player.position.y + player.height >= boundary.position.y && player.position.x <= (boundary.position.x-5) + boundary.width && player.position.y <= boundary.position.y + boundary.height
        ){
          inGame = false;
          inShop = true;
          console.log("j'ai touché le marchand");
          break;
        }
      }
    }else if (inShop==true){
      inGame = true;
      inShop = false;
      console.log('in shop');
    }else{
      console.log('in inventory');
    }
 
  }else if(key.e.pressed && lastKey === 'e'){
    if (inGame==true){
      inGame = false;
    }else if (inShop==true){
      console.log('in shop');
    }else if (inGame==false && inShop==false){
      inGame = true;
      console.log('in inventory');
    }
  }else if(key.a.pressed && lastKey === 'a'){
    if (inShop==true){
      if (selected.name == 'potion'){
        if (money >= 10){
          money -= 10;
          inventoryList.push(selected);
        }else{
          alert('Vous n\'avez pas assez d\'argent');
          inGame = true;
          inShop = false;
        }

      }else if (selected.name == 'SuperPotion'){
        if (money >= 20){
          money -= 20;
          inventoryList.push(selected);
        }else{
          alert('Vous n\'avez pas assez d\'argent');
          inGame = true;
          inShop = false;
        }
      }
    }else if ( inGame==false && inShop==false){
      if(life >= 100){
        alert("attention votre vie est au maximum")
            inGame = true;
        }else{
          inventoryList[l].use();
          inventoryList.splice(l, 1);
        }
      
    }	
  }
}
