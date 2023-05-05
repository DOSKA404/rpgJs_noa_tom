export class player{
        constructor(name, hp, attack, gold, sprite){
                this.name = name;
                this.hp = hp;
                this.attack = attack;
                this.gold = gold;
                this.sprite = sprite;
                this.inventory = [];
        }

        attackTarget(target){
                target.hp -= this.attack;
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

export class ennemy {
        constructor(name, hp, attack, gold){
                this.name = name;
                this.hp = hp;
                this.attack = attack;
                this.gold = gold;
        }

        addGold(amount) {     
                player1.gold += amount;
        }

        isDead(){
                if (this.hp <= 0){
                        addGold(this.gold);
                }
        }
}

class target extends player{
        constructor(name, hp, attack, sprite){
                super(name, hp, attack, sprite);
        }

        attackPlayer(player)
        {
                player.hp -= this.attack;
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

export class item{
        constructor(name, effect){
                this.name = name;
                this.effect = effect;
        }

        use(target){
                target.hp += this.effect;
        }
}

export class merchant{
        constructor(name, inventory, gold){
                this.name = name;
                this.inventory = inventory;
                this.gold = gold;
        }

        addGold(amount) {     
                player1.gold += amount;
        }

        removeGold(amount) {
                if (player1.gold < amount) {
                }else{
                        player1.gold -= amount;
                }
        }

        sellItem (item, player){
                player.addItem(item);
                player.removeGold(10);
        }

        buyItem (item, player){
                player.removeItem(item);
                player.addGold(5)
        }

}




potion = new item("potion", 10);

player1 = new player("player1", 100, 10, );

merchant = new merchant("Traveller Merchant", "merchant.png");

