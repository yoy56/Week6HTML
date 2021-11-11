const URLofServer = "";

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

    static renderDOM(){
        let items = AjaxManager.pullItems();
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
}

{/* <div id="item-List" class="container mt-5 mx-auto bg-secondary bg-gradient pb-3">
        <!-- Exsample of Item in List (Remove later) -->
        <div id="item-i"> <!-- "i" will be an id number -->
            <h3>Kevin's Pets</h3> <!--Owner of Animal-->
            <button class="btn btn-danger btn-sm" id="Del-btn-i"> Delete</button> <br>
            <input type="text" name="subItemName" id="subItem-Name" placeholder="Subitem Name"> 
            <input type="text" name="subItemInfo" id="subItem-Info" placeholder="Subitem Info"> <br>
            <button id="addSub-btn-i" class="btn btn-primary my-2 w-100">Add Subitem</button>
            <div id="subList-i" class="bg-light bg-gradient"> <!-- List of Subitems -->
                <div id="subitem-i-0" class="my-3">  <!-- "0" will be the subitem's postion in the list -->
                    <span class="fw-bold">Name: </span> <span>Teo</span> <!--Pet-->
                    <span> - </span>
                    <span class="fw-bold">Animal: </span> <span>Bird</span> <!--Type of Animal-->
                    <button class="btn btn-danger btn-sm" id="sub-Del-btn-i-0">Delete SubItem</button>
                    <div class="container" id="subSubList-i-0"> <!--Appointments-->
                        <div class="" id="subSubItem-i-0-0">
                            <span class="fw-bold">Appointment:</span>
                            <span> 2:30pm 11/11/2021</span> <!--Date-->
                            <div class="fw-bold">Notes:</div> <!--Info about the Appointment-->
                            <div class="container bg-white border border-secondary">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto deleniti 
                                illo delectus corrupti voluptates pariatur amet harum consectetur ipsum ut 
                                atque, rerum dolorem maiores non voluptatem eveniet autem quisquam sint.</p>
                            </div>
                            <button class="btn btn-warning btn-sm" id="subSub-Del-btn-i-0-0">Cancel Appointment</button>
                        </div>
                    </div>
                </div> */}

class AjaxManager {

    static pullItems() {
        //Pull from server
        return tempServer;
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
    tempServer.push(ownr1);
};


$( () => {
    //Get from sever Function
});