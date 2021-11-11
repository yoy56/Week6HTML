const URLofServer = "";

class Item {
    constructor(name){
        this.name = name;
        this.subitems = [];
    }
};

class SubItem {
    constructor(name,info){
        this.name = name
        this.info = info
    }
};

class DOMManager {

    static renderDOM(){
        let items = AjaxManager.pullItems();
        let itemList = $('.item-List');
        for (let i = 0; i < items.length; i++) {
            const e = items[i];
            let itemdiv = $(` <div id="item-${i}">
            <h3>${e.name}</h3>
            <button class="btn btn-danger btn-sm" id="Del-btn-${i}"> Delete</button> <br>
            <input type="text" name="subItemName${i}" id="subItem-Name-${i}" placeholder="Subitem Name"> 
            <input type="text" name="subItemInfo${i}" id="subItem-Info-${i}" placeholder="Subitem Info"> <br>
            <button id="addSub-btn-${i}" class="btn btn-primary my-2 w-100">Add Subitem</button>
            <div id="subList-${i}" class="bg-light bg-gradient">
            </div>
            </div>`);
            let sublist = $(`.subList-${i}`);
            for (let int = 0; int < e.subitems.length; int++) {
                const el = e.subitems[int];
                let subdiv = $(`<div id="subitem-${i}-${int}" class="my-3">
                <span>Name: ${el.name}</span>
                <span>Info: ${el.info}</span>
                <button class="btn btn-danger btn-sm" id="sub-Del-btn-${i}-${int}">Delete SubItem</button>
                </div>`);
                sublist.append(subdiv);
            }
            itemList.append(itemdiv);
        } 
    }
}

class AjaxManager {

}


function makeInitial(){
    //Make Inital Items
    //console.log(items);
    //Post Items
};


$( () => {
    //Get from sever Function
});