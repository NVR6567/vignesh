const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    DISH: Symbol("dish"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    ICECREAM: Symbol("icecream"),
    DRINKS: Symbol("drinks"),
});

module.exports = class SubwayOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.selectedItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.orderItems = [];
        this.sItems = ["Chicken Sub", "Meat Sub"];
        this.sIceCream = "";
    }

    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.DISH;
                aReturn.push("Welcome to Vig SUBS");
                aReturn.push("What kind of subs do you like?");
                aReturn.push(...this.sItems);
                break;
            case OrderState.DISH:
                if (sInput.toLowerCase() === "chicken sub") {
                    this.selectedItem = sInput;
                    this.orderItems.push(this.selectedItem);
                    this.stateCur = OrderState.SIZE;
                    aReturn.push(`What size of ${this.selectedItem} would you like?`);
                    aReturn.push("Small ($5.99), Medium ($7.99), Large ($9.99)");
                } else if (sInput.toLowerCase() === "meat sub") {
                    this.selectedItem = sInput;
                    this.orderItems.push(this.selectedItem);
                    this.stateCur = OrderState.SIZE;
                    aReturn.push(`What size of ${this.selectedItem} would you like?`);
                    aReturn.push("Small ($6.99), Medium ($8.99), Large ($10.99)");
                } else {
                    aReturn.push("Invalid dish! Please choose Chicken Sub or Meat Sub.");
                }
                break;
            case OrderState.SIZE:
                this.sSize = sInput;
                if (this.sSize.toLowerCase() === "small" || this.sSize.toLowerCase() === "medium" || this.sSize.toLowerCase() === "large") {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                    this.orderItems.push(this.sSize);
                } else {
                    aReturn.push("Invalid size. Please enter Small, Medium, or Large.");
                }
                break;
            case OrderState.TOPPINGS:
                this.sToppings = sInput;
                this.stateCur = OrderState.ICECREAM;
                aReturn.push("Would you like to add ice cream with your order?");
                this.orderItems.push(this.sToppings);
                break;
            case OrderState.ICECREAM:
                this.sIceCream = sInput;
                this.stateCur = OrderState.DRINKS;
                aReturn.push("Would you like to add drinks with your order?");
                this.orderItems.push(this.sIceCream);
                break;
            case OrderState.DRINKS:
                this.sDrinks = sInput;
                this.orderItems.push(this.sDrinks);
                this.isDone(true);
                let totalPrice = this.Price();
                this.orderItems.push(`Total Price: $${totalPrice.toFixed(2)}`);
                aReturn.push("Thank you for your order!");
                aReturn.push(`You ordered: ${this.orderItems.join(", ")}`);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }

    Price() {
        const itemPrices = {
            "chicken sub": {
                small: 5.99,
                medium: 7.99,
                large: 9.99,
            },
            "meat sub": {
                small: 6.99,
                medium: 8.99,
                large: 10.99,
            },
        };

        const selectedItemPrice = itemPrices[this.selectedItem.toLowerCase()]?.[this.sSize.toLowerCase()] || 0;
        let totalPrice = selectedItemPrice;

        return totalPrice;
    }
};
