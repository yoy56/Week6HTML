const URLofServer = "https://crudcrud.com/api/76033e82691b4830adcb47537793ec7f/people";

let tempServer = [];

class Item {
    constructor(name){
        this.name = name;
        this.subitems = [];
    }
};

class SubItem {
    constructor(name,info){
        this.name = name;
        this.info = info;
        this.apponts = [];
    }
};

class Appointment {
    constructor(date,note){
        this.date = date;
        this.note = note;
    }
}

class DOMManager {

    static renderDOM(itemgot){
        let items = itemgot;
        let itemList = $('#item-List');
        itemList.empty();
        for (let i = 0; i < items.length; i++) {
            const e = items[i];
            let itemdiv = $(` <div id="item-${i}">
            <h3>${e.name}'s Pets</h3>
            <button class="btn btn-danger btn-sm" id="Del-btn-${i}">Remove Customer</button> <br>
            <input type="text" name="subItemName${i}" id="subItem-Name-${i}" placeholder="Pet's Name"> 
            <input type="text" name="subItemInfo${i}" id="subItem-Info-${i}" placeholder="Pet's Species"> <br>
            <button id="addSub-btn-${i}" class="btn btn-primary my-2 w-100">Add Pet</button>
            <div id="subList-${i}" class="bg-light bg-gradient">
            </div>
            </div>`);
            itemList.append(itemdiv);
            let sublist = $(`#subList-${i}`);
            for (let int = 0; int < e.subitems.length; int++) {
                const el = e.subitems[int];
                let subdiv = $(`<div id="subitem-${i}-${int}" class="my-3">
                <span class="fw-bold">Name: </span> <span>${el.name}</span>
                <span class="fw-bold">Animal: </span> <span>${el.info}</span>
                <button class="btn btn-danger btn-sm" id="sub-Del-btn-${i}-${int}">Remove Pet</button>
                <div class="container" id="subSubList-${i}-${int}">
                <input type="date" name="subSubItemDate${i}-${int}" id="subSubItem-Date-${i}-${int}">
                        <input type="text" name="subSubItemNotes${i}-${int}" id="subSubItem-Notes-${i}-${int}" placeholder="Notes...">
                        <button class="btn btn-success btn-sm" id="addSubSub-btn-${i}-${int}">Create Appointment</button>
                    </div>
                </div>`);
                sublist.append(subdiv);
                let subsublist = $(`#subSubList-${i}-${int}`);
                for (let inti = 0; inti < el.apponts.length; inti++) {
                    const ele = el.apponts[inti];
                    let subsubdiv = $(`<div id="subSubItem-${i}-${int}-${inti}">
                    <span class="fw-bold">Appointment:</span>
                    <span>${ele.date}</span>
                    <div class="fw-bold">Notes:</div>
                    <div class="container bg-white border border-secondary">
                        <p>${ele.note}</p>
                    </div>
                    <button class="btn btn-warning btn-sm" id="subSub-Del-btn-${i}-${int}-${inti}">Cancel Appointment</button>
                    </div>`);
                    subsublist.append(subsubdiv);
                }
            }
        } 
    }

    static pullItems() {
        AjaxManager.pullItems().then( (item) => this.renderDOM(item));
    }

    static addPerson(){
        let name = $('#item-Name').val();
        //Need to add test to make sure name is not blank
        console.log(name);
        AjaxManager.postItem(new Item(name),URLofServer).then( (item) => this.renderDOM(item));
    }
}

class AjaxManager {

    static pullItems() {
        //Pull from server 
        console.log($.get(URLofServer));
        return $.get(URLofServer);
    }

    static postItem(item,location) {
        //Post to server
        return $.ajax({
            url: location,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(item),
            contentType: "application/json"
        });
        
    }

    static putItem(item,location) {
        
        return $.ajax({
            url: location,
            type: 'PUT',
            
            data: JSON.stringify(item),
            contentType: 'application/json'
        });
    }
}


function makeInitial(){
    //Make Inital Items
    //console.log(items);
    //Post Items

    let app1 = new Appointment("1:57pm 11/11/2021","Test Note");
    let pt1 = new SubItem("Teo","Bird");
    let ownr1 = new Item("Harry");
    pt1.apponts.push(app1);
    ownr1.subitems.push(pt1);
    AjaxManager.postItem(ownr1,URLofServer).then( (resp) => console.log(resp));
};


$( () => {
    DOMManager.pullItems();
});