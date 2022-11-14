export default class OrderDto{
    constructor(order, id){
        this.id = id,
        this.user = order.user,
        this.orden = order.orden
    }
}