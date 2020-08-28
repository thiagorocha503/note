"use strict";
var TAB_LIST = document.getElementById("tab-list");
var TAB_EDIT = document.getElementById("tab-edit");
var TAB_DETAILS = document.getElementById("tab-details");
var TXT_TITLE = document.getElementById("txt-title");
var TXT_DESCRIPTION = document.getElementById("txt-description");
var DESCRIPTION_LABEL_ERROR = document.getElementById("description-label-error");
var TITLE_LABEL_ERROR = document.getElementById("title-label-error");
var CARD_ID_MASK = "card_id_";
var NOTE_TITLE = document.getElementById("note-title");
var NOTE_DESCRIPCTION = document.getElementById("note-description");
var ENTER_KEY = 13;
var noteID = 0;
TXT_TITLE.addEventListener("keypress", function (ev) {
    if (ev.keyCode == ENTER_KEY) {
        TXT_DESCRIPTION.focus();
    }
});
function hideTabs() {
    var tabs = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabs.length; i++) {
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
function onDelete() {
    $("#modal-delete").modal("show");
}
function onDeleteteConfirm() {
    if (noteID != 0) {
        new NoteLocalStorage().deleteById(noteID);
        $("#modal-delete").modal("hide");
        goHome();
    }
}
function onDetails(id) {
    var note = new NoteLocalStorage().getNoteByID(id);
    if (note == null) {
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
function onEdit() {
    var note = new NoteLocalStorage().getNoteByID(noteID);
    if (note == null) {
        goHome();
        return;
    }
    hideTabs();
    TAB_EDIT.classList.remove("d-none");
    TXT_TITLE.value = note.title;
    TXT_DESCRIPTION.value = note.description;
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
    var title = TXT_TITLE.value;
    var description = TXT_DESCRIPTION.value;
    if (title == "" || description == "") {
        if (title == "") {
            TXT_TITLE.classList.add("is-invalid");
            TITLE_LABEL_ERROR.classList.add("d-block");
            console.log("> Empty title");
        }
        if (description == "") {
            TXT_DESCRIPTION.classList.add("is-invalid");
            DESCRIPTION_LABEL_ERROR.classList.add("d-block");
            console.log("> Empty description");
        }
        return;
    }
    var note = new Note(noteID, title, description);
    var noteLocalStorage = new NoteLocalStorage();
    if (note.id == 0) {
        noteLocalStorage.add(note);
        clearField();
        showAlertSuccess("Note has been added successfully");
    }
    else {
        noteLocalStorage.update(note);
        showAlertSuccess("Note has been updated  successfully");
    }
}
function resetFieldStyle() {
    TXT_TITLE.classList.remove("is-invalid");
    TITLE_LABEL_ERROR.classList.remove("d-block");
    TXT_DESCRIPTION.classList.remove("is-invalid");
    DESCRIPTION_LABEL_ERROR.classList.remove("d-block");
}
function clearField() {
    TXT_TITLE.value = "";
    TXT_DESCRIPTION.value = "";
}
function showAlertSuccess(text) {
    // show alert and set interval time
    var alertText = document.getElementById("alert-sucess-text");
    if (alertText != null) {
        alertText.innerHTML = text;
    }
    $(".alert").stop().fadeTo(1, 1).removeClass('hidden');
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(".alert").addClass('hidden');
        });
    }, 2000);
}
/* ------------------ View -------------- */
function buildCard(note) {
    //card container
    var card = document.createElement("div");
    card.className = "card bg-light";
    card.setAttribute("id", CARD_ID_MASK + note.id);
    card.style.cursor = "pointer";
    //event
    card.addEventListener("click", function () {
        onDetails(note.id);
    });
    // card title
    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    var cardTitle = document.createElement("h5");
    cardTitle.innerHTML = note.title;
    cardTitle.className = "card-title";
    cardHeader.appendChild(cardTitle);
    // card body
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.minHeight = "250px";
    var cardText = document.createElement("p");
    cardText.innerHTML = note.description;
    cardText.className = "card-text card-text-truncate";
    cardBody.appendChild(cardText);
    // card build
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    return card;
}
function buildListCard() {
    // card list container
    var cardList = document.createElement("div");
    cardList.className = "row pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3"; // row-cols-lg-3 row-cols-xl-4";
    cardList.setAttribute("id", "cards");
    // notes
    var notes = new NoteLocalStorage().fetchAll();
    notes.forEach(function (element) {
        // column
        var column = document.createElement("div");
        column.className = "col mb-2";
        // card
        var oneCard = buildCard(element);
        column.appendChild(oneCard);
        cardList.appendChild(column);
    });
    return cardList;
}
function renderCards() {
    var container = document.getElementById("tab-list");
    var old_notes = document.getElementById("cards");
    var new_notes = buildListCard();
    if (old_notes == null) {
        return;
    }
    container === null || container === void 0 ? void 0 : container.replaceChild(new_notes, old_notes);
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
