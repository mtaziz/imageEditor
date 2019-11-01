const Tool = require('../tools');

class MoveTool extends Tool {
    
    public constructor(element : MouseEvent) {

        super(element);
        console.log(element)
    }    

}