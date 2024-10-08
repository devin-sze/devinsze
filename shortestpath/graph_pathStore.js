
class PathStore {
    constructor(start) {
        this.start = start;
        this.RootNode = new Node(start, -1);
        this.Map = new Map();
        this.Map.set(start, this.RootNode);
    }

    addNext(currNum, prevNum) {       
        if (prevNum != -1) {
            var prevNode = this.Map.get(prevNum);
            prevNode.addNext(currNum);
        }

        var currNode = new Node(currNum, prevNum)
        this.Map.set(currNum, currNode);
    }

    test(start) {
        //console.log(this.Map.get(start));
        return this.Map;
    }



    getMap() {
        return this.Map;
    }

    //returns the path from the start index to the inputted index
    pathToStart(index) {
        var path = [];
        path.push(index);
        var node = this.Map.get(index);
        if (node  === undefined) {
            console.log("UNDEFINED");
            return;
        }
        var prevIndex = node.prevNum;

        var counter = 0;

        while (prevIndex != index && counter < 1000) {
            counter += 1;
            path.push(prevIndex);
            node = this.Map.get(prevIndex);
            if (prevIndex == -1) {
                return path;
            }
            prevIndex = node.prevNum;
        }
    }


    distToStart() {
        console.log("_________________________");
        var size = this.Map.size;
        //console.log(size);
        //console.log(this.Map);
        this.distMap = new Map();

        for (let i of this.Map.keys()) {
            console.log(i);
            this.distMap.set(i, this.pathToStart(i).length - 1);
        }
        return this.distMap;
    }




};

class Node {
    constructor(currNum, prevNum) {
        this.currNum = currNum;
        this.prevNum = prevNum;
        this.nextNums = [];
    }
    addNext(nextNum) {
        this.nextNums.push(nextNum);
    }
    getPrev() {
        return this.prevNum;
    }
};

