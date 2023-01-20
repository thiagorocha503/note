const CARD_ID_MASK = "card_id_";
const ENTER_KEY: string = "Enter";
declare var bootstrap: any;

$(() => {
    renderCards();
});

const editModal = new bootstrap.Modal(
    document.getElementById("edit-modal") as HTMLElement,
    {
        keyboard: false,
        backdrop: 'static'
    }
);


function onDelete() {
    const id: number = parseInt($("#edit-modal").attr("note-id") as string);
    new NoteLocalStorage().deleteById(id);
    editModal.hide();
    renderCards();
}

function onEditClose(){
    console.log("close")
    renderCards();
    editModal.hide();
}

function onNew() {
    onEdit(null);
}

function onSave() {
    let title = $("#input-title").val() as string;
    let description = $("#input-body").val() as string;
    if (title == "" || description == "") {  
        return;
    }
    let id = parseInt($("#edit-modal").attr("note-id") as string);
    let note = new Note(id, title, description);
    let noteLocalStorage = new NoteLocalStorage();
    if (note.id == 0) {
        let id = noteLocalStorage.add(note);
        $("#edit-modal").attr("note-id",id); 
    } else {
        noteLocalStorage.update(note);
       
    }
}

function onEdit(note: Note | null) {
    // title
    $("#input-title").val(note?.title ?? "");
    // body
    const container: HTMLElement = document.getElementById(
        "modal-body-edit"
    ) as HTMLElement;
    const oldBody: HTMLElement = document.getElementById(
        "input-body"
    ) as HTMLElement;
   
    const newBody = document.createElement("textarea");
    newBody.id = "input-body";
    newBody.setAttribute("placeholder", "Enter text");
    newBody.setAttribute("style", "width: 100%; height: 100%;");
    newBody.addEventListener("keyup",()=>{
        onSave();
    })
    newBody.value = note?.description ?? "";
    container.replaceChild(newBody, oldBody);
    // set id
    $("#edit-modal").attr("note-id", note?.id ?? 0);
    // show modal
    editModal.show();
}

/* ------------------ View -------------- */
function buildCard(note: Note): HTMLElement {
    //card container
    let card: HTMLElement = document.createElement("div");
    card.className = "card bg-light";
    card.setAttribute("id", CARD_ID_MASK + note.id);
    card.style.cursor = "pointer";
    //event
    card.addEventListener("click", function () {
        onEdit(note);
    });
    // card body
    let cardBody: HTMLElement = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.minHeight = "250px";
    let header = document.createElement("h2");
    header.innerHTML = note.title;
    let cardText: HTMLElement = document.createElement("p");
    cardText.innerHTML = note.description;
    cardText.className = "card-text card-text-truncate";

    cardBody.appendChild(header);
    cardBody.appendChild(cardText);
    // card build
    card.appendChild(cardBody);
    return card;
}

function buildListCard(): HTMLElement {
    // card list container
    let cardList: HTMLElement = document.createElement("div");
    cardList.className = "row pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3"; // row-cols-lg-3 row-cols-xl-4";
    cardList.setAttribute("id", "cards");
    // notes
    let notes = new NoteLocalStorage().fetchAll();
    notes.forEach((element) => {
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
