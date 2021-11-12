const URLofServer = "https://crudcrud.com/api/46b4339d5cd047c8ac837e78b0e7a8e1/people"; 

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
    constructor(){
        this.currentArray;
    }

    static renderDOM(itemgot){
        this.currentArray = itemgot;
        let items = itemgot;
        let itemList = $('#item-List');
        itemList.empty();
        for (let i = 0; i < items.length; i++) {
            const e = items[i];
            let id1 = e._id;
            let itemdiv = $(` <div id="item-${id1}">
            <h3>${e.name}'s Pets</h3>
            <button class="btn btn-danger btn-sm" id="Del-btn-${id1}">Remove Customer</button> <br>
            <input type="text" name="subItemName${id1}" id="subItem-Name-${id1}" placeholder="Pet's Name"> 
            <input type="text" name="subItemInfo${id1}" id="subItem-Info-${id1}" placeholder="Pet's Species"> <br>
            <button id="addSub-btn-${id1}" class="btn btn-primary my-2 w-100">Add Pet</button>
            <div id="subList-${id1}" class="bg-light bg-gradient">
            </div>
            </div>`);
            itemdiv.find(`#Del-btn-${id1}`).on('click', (e) => {
                let id = e.target.id.split('-')[2];
                DOMManager.deletePerson(id);
            });
            itemdiv.find(`#addSub-btn-${id1}`).on('click', (e) => {
                let id = e.target.id.split('-')[2];
                DOMManager.addPet(id);
            });
            itemList.append(itemdiv);
            let sublist = $(`#subList-${id1}`);
            for (let int = 0; int < e.subitems.length; int++) {
                const el = e.subitems[int];
                let subdiv = $(`<div id="subitem-${id1}-${int}" class="my-3">
                <span class="fw-bold">Name: </span> <span>${el.name}</span>
                <span class="fw-bold">Animal: </span> <span>${el.info}</span>
                <button class="btn btn-danger btn-sm" id="sub-Del-btn-${id1}-${int}">Remove Pet</button>
                <div class="container" id="subSubList-${id1}-${int}">
                <input type="date" name="subSubItemDate${id1}-${int}" id="subSubItem-Date-${id1}-${int}">
                <input type="time" name="subSubItemTime${id1}-${int}" id="subSubItem-Time-${id1}-${int}">
                        <input type="text" name="subSubItemNotes${id1}-${int}" id="subSubItem-Notes-${id1}-${int}" placeholder="Notes...">
                        <button class="btn btn-success btn-sm" id="addSubSub-btn-${id1}-${int}">Create Appointment</button>
                    </div>
                </div>`);
                subdiv.find(`#addSubSub-btn-${id1}-${int}`).on('click', (e) => {
                    let id = e.target.id.split('-')[2];
                    let num = e.target.id.split('-')[3];
                    DOMManager.addAppoint(id,num);
                });
                subdiv.find(`#sub-Del-btn-${id1}-${int}`).on('click', (e) => {
                    let id = e.target.id.split('-')[3];
                    let num = e.target.id.split('-')[4];
                    DOMManager.deletePet(id,num);
                });
                sublist.append(subdiv);
                let subsublist = $(`#subSubList-${id1}-${int}`);
                for (let inti = 0; inti < el.apponts.length; inti++) {
                    const ele = el.apponts[inti];
                    let subsubdiv = $(`<div id="subSubItem-${id1}-${int}-${inti}">
                    <span class="fw-bold">Appointment:</span>
                    <span>${ele.date}</span>
                    <div class="fw-bold">Notes:</div>
                    <div class="container bg-white border border-secondary">
                        <p>${ele.note}</p>
                    </div>
                    <button class="btn btn-warning btn-sm" id="subSub-Del-btn-${id1}-${int}-${inti}">Cancel Appointment</button>
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
        if (name != '') {
            $('#item-Name').val('')
            AjaxManager.postItem(new Item(name),URLofServer).then( () => this.pullItems());
        }
    }

    static addPet(id){
        let name = $(`#subItem-Name-${id}`).val();
        let info = $(`#subItem-Info-${id}`).val();
        if (name != '' && info != '') {
            let url = `${URLofServer}/${id}`;
            let item = DOMManager.currentArray;
            let csub;
            for (const sub of item) {
                if (sub._id == id) {
                    sub.subitems.push(new SubItem(name,info));
                    delete sub._id;
                    csub = sub;
                }
            }
            $(`#subItem-Name-${id}`).val('');
            $(`#subItem-Info-${id}`).val('');
            AjaxManager.putItem(csub,url).then( () => this.pullItems());
        };
    }

    static addAppoint(id,num){
        let date = $(`#subSubItem-Date-${id}-${num}`).val();
        let note = $(`#subSubItem-Notes-${id}-${num}`).val();
        let time = $(`#subSubItem-Time-${id}-${num}`).val();
        if (date != '' && note != '' && time != '') {
            let url = `${URLofServer}/${id}`;
            let item = DOMManager.currentArray;
            let csub;
            for (const sub of item) {
                if (sub._id == id) {
                    sub.subitems[num].apponts.push(new Appointment(`${time} ${date}`,note));
                    delete sub._id;
                    csub = sub;
                }
            }
            $(`#subSubItem-Date-${id}-${num}`).val('');
            $(`#subSubItem-Notes-${id}-${num}`).val('');
            $(`#subSubItem-Time-${id}-${num}`).val('');
            AjaxManager.putItem(csub,url).then( () => this.pullItems());
        };
    }

    static deletePerson(id){
        let url = `${URLofServer}/${id}`
        AjaxManager.delItem(url).then( () => this.pullItems());
    }

    static deletePet(id,num){
        let url = `${URLofServer}/${id}`;
        let item = DOMManager.currentArray;
        let csub;
        console.log(item);
        for (const sub of item) {
            if (sub._id == id) {
                console.log(sub);
                sub.subitems.splice(num,1);
                console.log(sub);
                delete sub._id;
                csub = sub;
            }
        }
        AjaxManager.putItem(csub,url).then( (e) => {
            console.log(e);
            console.log(this.pullItems());
        });
        
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
            //dataType: 'json',
            data: JSON.stringify(item),
            contentType: 'application/json'
        });
    }

    static delItem(location){
        return $.ajax({
            url: location,
            type: 'DELETE'
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