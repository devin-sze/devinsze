//https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
 
// PriorityQueue class
class PriorityQueue {
 
    // An array is used to implement priority
    constructor() {
        this.items = [];
        this.set = new Set();
    }

    // enqueue function to add element
    // to the queue as per priority
    enqueue(element, priority) {
        if (this.contains(element)) {
            this.delete(element);
        }

        //console.log(this.contains(element));
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;
    
        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
    
        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
        this.set.add(element);
    }

    
    // dequeue method to remove
    // element from the queue
    dequeue() {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        var value = this.items.shift();
        this.delete(value);
        return value;
    }

    delete(i) {
        this.set.delete(i);
        for (let j = 0; j < this.items.length; j++) {
            if (this.items[j].element == i) {
                this.items.splice(j, 1);
                return;
            }
        }
    }

    
    // front function
    front() {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // rear function
    rear() {
        // returns the lowest priority
        // element of the queue
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    
    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        //console.log(this.items.length);
        return this.items.length == 0;
    }

    
    // printQueue function
    // prints all the element of the queue
    printPQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + "|" + Math.round(this.items[i].priority * 100)/100 + " ";
        return str;
    }

    size() {
        return this.items.length;
    }

    contains(i) {
        return this.set.has(i);
        return i in this.items;
    }

    getPriority(i) {
        for (var j = 0; j < this.items.length; j++) {
            if (this.items[j] == i) {
                return this.items[j].priority;
            }
        }
        return Infinity;
    }
}

/*
//https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
 
// PriorityQueue class
class PriorityQueue {
 
    // An array is used to implement priority
    constructor() {
        this.items = [];
        this.set = new Set();
    }

    // enqueue function to add element
    // to the queue as per priority
    enqueue(element, priority) {
        if (this.contains(element)) {
            this.delete(element);
        }
        //console.log(this.contains(element));
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;
    
        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
    
        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
        this.set.add(element);
    }

    size() {
        return this.items.length;
    }

    delete(i) {
        //console.log(i);
        if (this.set.has(i)) {
            for (let j = 0; j < this.items.length; j++) {
                if (this.items[j].element == i) {
                    //console.log(this.items[j].element, i);
                    this.items.splice(j, 1);
                    //console.log(this.items[j].element, i);
                    //console.log("-----");
                }
            }
            this.set.delete(i);
        }
    }

    
    // dequeue method to remove
    // element from the queue
    dequeue() {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        console.log("size before:", this.size());
        var item = this.items.shift();
        this.set.delete(item.element);
        console.log("size after:", this.size());
        return item;
    }

    
    // front function
    front() {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // rear function
    rear() {
        // returns the lowest priority
        // element of the queue
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    
    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    
    // printQueue function
    // prints all the element of the queue
    printPQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + "|" + Math.round(this.items[i].priority * 100)/100 + " ";
        return str;
    }

    contains(i) {
        return i in this.items;
    }

    getPriority(i) {
        for (var j = 0; j < this.items.length; j++) {
            if (this.items[j] == i) {
                return this.items[j].priority;
            }
        }
        return Infinity;
    }


}

*/