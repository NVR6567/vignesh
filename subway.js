const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHSUB: Symbol('Chichken Sub Size'),
    MESUB: Symbol('MEAt SUB SIZE'),
    CORTEA:   Symbol("COFFEEORTEA"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class SubwayOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.orderItems = []
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcom to Vig SUBS");
                aReturn.push("What kind of subs do you like ?, our chicken sub is $5 and meat sub $6");
                break;
            case OrderState.SIZE:
                if(sInput.toLowerCase() == 'c'){
                    aReturn.push('What size of chicken sub');
                    this.orderItems.push('Chicken sub');
                    this.stateCur = OrderState.CORTEA;
                    break;
                }else{
                    aReturn.push('What size of meat sub');
                    this.orderItems.push('meat sub');
                    this.stateCur = OrderState.CORTEA;
                    break;
                }
            case OrderState.CORTEA:
                this.orderItems.push(sInput);
                aReturn.push('What toppings you would like with it');
                this.stateCur = OrderState.CHSUB;
                break;
            case OrderState.CHSUB:
                this.orderItems.push(sInput);
                this.stateCur = OrderState.DRINKS;
                aReturn.push("Would you like to have iced tea with it");
                break;
            // case OrderState.MESUB:
            //     this.orderItems.push(sInput);
            //     this.stateCur = OrderState.DRINKS;
            //     aReturn.push('Would you like to have iced tea with it ?')
            //     break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.orderItems.push('with iced tea')
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.orderItems[0]} ${this.orderItems[1]} with ${this.orderItems[2]}`);
                if(this.orderItems[3]){
                    aReturn.push('with iced tea');
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }

}