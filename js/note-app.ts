const TAB_LIST: HTMLDivElement = document.getElementById("tab-list") as HTMLDivElement;
const TAB_EDIT: HTMLDivElement = document.getElementById("tab-edit") as HTMLDivElement;
const TAB_DETAILS: HTMLDivElement = document.getElementById("tab-details") as HTMLDivElement;
const TXT_TITLE: HTMLInputElement = document.getElementById("txt-title") as HTMLInputElement;
const TXT_DESCRIPTION: HTMLTextAreaElement = document.getElementById("txt-description") as HTMLTextAreaElement;
const DESCRIPTION_LABEL_ERROR: HTMLElement = document.getElementById("description-label-error") as HTMLElement;
const TITLE_LABEL_ERROR: HTMLElement = document.getElementById("title-label-error") as HTMLElement;
const CARD_ID_MASK = "card_id_";
const NOTE_TITLE: HTMLElement = document.getElementById("note-title") as HTMLElement;
const NOTE_DESCRIPCTION: HTMLElement = document.getElementById("note-description") as HTMLElement;
const ENTER_KEY: number = 13;
var noteID = 0;

TXT_TITLE.addEventListener("keypress",function(ev: KeyboardEvent){
    if(ev.keyCode == ENTER_KEY){
        TXT_DESCRIPTION.focus();
    }
});


function hideTabs() {
    var tabs: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("d-none");
    }
}
/*------ Button action------- */
function goHome() {
    resetFieldStyle();
    noteID = 0;
    hideTabs();
    TAB_LIST.classList.remove("d-none");
    renderCards(); 
}

function onDelete(){
    $("#modal-delete").modal("show");
}

function onDeleteteConfirm(){
    if(noteID != 0){
        new NoteLocalStorage().deleteById(noteID);
        $("#modal-delete").modal("hide");
        goHome();
    }
}



function onDetails(id:number){
    let note = new NoteLocalStorage().getNoteByID(id);
    if(note == null){
        goHome();
        return;
    }
    hideTabs();
    TAB_DETAILS.classList.remove("d-none");
    NOTE_TITLE.innerHTML = note.title;
    NOTE_DESCRIPCTION.innerHTML = note.description;
    // set ID
    noteID = id;
}


function onEdit(){
    let note = new NoteLocalStorage().getNoteByID(noteID);
    if(note == null){
        goHome();
        return;
    }
    hideTabs();
    TAB_EDIT.classList.remove("d-none");
    TXT_TITLE.value = note.title;
    TXT_DESCRIPTION.value = note.description
}

function onNew() {
    hideTabs();
    clearField();
    TAB_EDIT.classList.remove("d-none");
    $('.alert').hide();
    noteID = 0;
}

function onSave() {
    resetFieldStyle();
    let title = TXT_TITLE.value;
    let description = TXT_DESCRIPTION.value;
    if (title == "" || description == "") {
        if (title == "") {
            TXT_TITLE.classList.add("is-invalid");
            TITLE_LABEL_ERROR.classList.add("d-block")
            console.log("> Empty title")
        }
        if (description == "") {
            TXT_DESCRIPTION.classList.add("is-invalid");
            DESCRIPTION_LABEL_ERROR.classList.add("d-block");
            console.log("> Empty description")
        }
        return;
    }
    let note = new Note(noteID, title, description);
    let noteLocalStorage = new NoteLocalStorage();
    if(note.id == 0){
        noteLocalStorage.add(note);
        clearField();
        showAlertSuccess("Note has been added successfully")
    } else {
        noteLocalStorage.update(note);
        showAlertSuccess("Note has been updated  successfully");
    }
   
}

function resetFieldStyle() {
    TXT_TITLE.classList.remove("is-invalid");
    TITLE_LABEL_ERROR.classList.remove("d-block")
    TXT_DESCRIPTION.classList.remove("is-invalid");
    DESCRIPTION_LABEL_ERROR.classList.remove("d-block");

}

function clearField() {
    TXT_TITLE.value = "";
    TXT_DESCRIPTION.value = "";
}


function showAlertSuccess(text: string){
    // show alert and set interval time
    let alertText = document.getElementById("alert-sucess-text");
    if(alertText!=null){
        alertText.innerHTML=text;
    }
    $(".alert").stop().fadeTo(1, 1).removeClass('hidden');
    window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(".alert").addClass('hidden');
    });
    }, 2000); 
}

/* ------------------ View -------------- */
function buildCard(note: Note): HTMLElement {

    //card container
    let card: HTMLElement = document.createElement("div");
    card.className = "card bg-light";
    card.setAttribute("id", CARD_ID_MASK + note.id);
    card.style.cursor = "pointer";
    //event
    card.addEventListener("click", function(){
        onDetails(note.id);
    });
    // card title
    let cardHeader: HTMLElement = document.createElement("div");
    cardHeader.className = "card-header";
    let cardTitle: HTMLElement = document.createElement("h5");
    cardTitle.innerHTML = note.title;
    cardTitle.className = "card-title";
    
    cardHeader.appendChild(cardTitle);
    // card body
    let cardBody: HTMLElement = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.minHeight = "250px";
    let cardText: HTMLElement = document.createElement("p");
    cardText.innerHTML = note.description;
    cardText.className = "card-text card-text-truncate";
    cardBody.appendChild(cardText);
    // card build
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    return card;
}

function buildListCard(): HTMLElement {
    // card list container
    let cardList: HTMLElement = document.createElement("div");
    cardList.className = "row pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3";// row-cols-lg-3 row-cols-xl-4";
    cardList.setAttribute("id", "cards")
    // notes
    let notes = new NoteLocalStorage().fetchAll();
    notes.forEach(element => {
        // column
        let column = document.createElement("div");
        column.className = "col mb-2";
        // card
        let oneCard = buildCard(element);
        column.appendChild(oneCard);
        cardList.appendChild(column);
    });
    return cardList;
}

function renderCards() {
    let container = document.getElementById("tab-list");
    let old_notes = document.getElementById("cards");
    let new_notes = buildListCard();
    if (old_notes == null) {
        return;
    }
    container?.replaceChild(new_notes, old_notes);
}
/*
<div id="cards" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
    <!--Col-->
    <div class="col mb-2">
        <!-- card -->
        <div class="card bg-light" >
            <div class="card-header" >
                <h5 class="card-title" > Note 01 < /h5>
            </div>
            < div class="card-body" >
                <p>
                    orem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras ornare volutpat iaculis.Nullam ultricies dui quis
                    tincidunt luctus.Aenean at lobortis eros.Aliquam
                    eleifend congue mauris, a semper est sagittis non.Donec
                    justo urna, dapibus pretium augue sed, venenatis
                    ullamcorper lacus.
                </p>
            </div>
        </div><!--/End Card-->
    </div><!--/End Col-->
</div><!--/ end Row -->
*/

