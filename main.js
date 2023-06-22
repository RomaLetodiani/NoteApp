const addBox = document.querySelector('.add-note'),
popupBox = document.querySelector('.popup'),
popup2 = document.getElementById('popup'),
popupTitle = popupBox.querySelector('header>h2'),
closeIcon = popupBox.querySelector('header i'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;

addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = '';
    descTag.value = '';
    popupBox.classList.remove('show');
    popup2.style.display = 'none';
    addBtn.innerText = "Add Note";
    popupTitle.innerText = 'Add A New Note';
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let divTag = `<div class='new-note note'>
                        <span>
                            <h2 class="title">${note.title}</h2>
                            <span class="description">${note.description}</span>
                        </span>
                        <div>
                            <span class="date">${note.date}</span>
                            <div>
                                <i onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="fa-solid fa-pen-to-square"></i>
                                <i onclick="deleteNote(${index})" class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </div>`;
        addBox.insertAdjacentHTML('afterend', divTag)            
    });
};

showNotes();

function deleteNote(noteId) {
    let confirmDel = confirm('Are you sure you want to delete this note?');
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
};

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = 'Update A Note';
};

addBtn.addEventListener('click', () => {
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    if (noteTitle || noteDesc) {
        const dateObj = new Date();
        let day = dateObj.getDate();
        let month = months[dateObj.getMonth()];
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();

        day = day < 10 ? `0${day}`:day;
        month = month < 10 ? `0${month}`:month;
        hour = hour < 10 ? `0${hour}`:hour;
        minute = minute < 10 ? `0${minute}`:minute;

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${hour}:${minute} | ${day} ${month}`
        }

        if (!isUpdate) {
            notes.push(noteInfo)
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    } else {
        popup2.style.display = 'block';
    }
})