class player{
        constructor(name, hp, atk, sprite){
                this.name = name;
                this.hp = hp;
                this.atk = atk;
                this.sprite = sprite;
                this.inventory = [];
        }

        attack(target){
                target.hp -= this.atk;
        }

        isAlive(){
                return this.hp > 0;
        }

        fight(target){
                while(this.isAlive() && target.isAlive()){
                        this.attack(target);
                        target.attack(this);
                }
        }

        addItem(item){
                this.inventory.push(item);
        }
}

class target extends player{
        constructor(name, hp, atk, sprite){
                super(name, hp, atk, sprite);
        }

        attack(player)
        {
                player.hp -= this.atk;
        }

        isAlive(){
                return this.hp > 0;
        }

        fight(player){
                while(this.isAlive() && player.isAlive()){
                        this.attack(player);
                        player.attack(this);
                }
        }
}

class item{
        constructor(name, effect){
                this.name = name;
                this.effect = effect;
        }

        use(target){
                target.hp += this.effect;
        }
}

potion = new item("potion", 10);

player1 = new player("player1", 100, 10, );