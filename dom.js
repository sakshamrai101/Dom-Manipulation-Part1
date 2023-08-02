function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advanced_walkBtn');
    element.addEventListener('click', function() {
        advancedWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advanced_modifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('modifyAddBtn');
    element.addEventListener('click', function () {
        advancedAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('deleteBySelectorBtn');
    element.addEventListener('click', function () {
        const selectorInput = document.getElementById('deleteSelector').value.trim();
        if (selectorInput) {
            deleteBySelector(selectorInput);
        }
    });

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
    let el;
    let outputTextarea = document.getElementById('output');
    outputTextarea.value='';

    el = document.getElementById('p1');
    showNode(el, outputTextarea);

    el = el.firstChild;
    showNode(el, outputTextarea);

    el = el.nextSibling;
    showNode(el, outputTextarea);

    el = el.lastChild;
    showNode(el, outputTextarea);

    el = el.parentNode.parentNode.parentNode;
    showNode(el, outputTextarea);

    el = el.querySelector('section > *');
    showNode(el, outputTextarea);


}

function advancedWalk() {
    let root_element = document.documentElement;
    let outputTextArea = document.getElementById('output');
    outputTextArea.value = '';

    showAdvanced(root_element, 0, outputTextArea);
}

function showAdvanced(root_element, level, outputTextArea) {
    let formatting = '    '.repeat(level);
    let nodeInfo = `${formatting}|-- ${root_element.nodeName}\n`;
    outputTextArea.value += nodeInfo;

    for (let childNode of root_element.childNodes) {
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            showAdvanced(childNode, level + 1, outputTextArea);
        }
    }
}

function showNode(el, outputTextArea) {

    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue; 

    let nodeInfo = `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
    outputTextArea.value += nodeInfo;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}
function advancedModify() {
    let heading1 = document.querySelector('h1');
    heading1.textContent = "Dom Manipulation is Fun!";

    let colors = [
        '--darkcolor1',
        '--darkcolor2',
        '--darkcolor3',
        '--darkcolor4',
        '--darkcolor5',
        '--darkcolor6'
    ];

    let randColor = colors[Math.floor(Math.random() * colors.length)] 

    heading1.style.color = `var(${randColor})`;

    let p = document.querySelector('p');
    p.classList.add('shmancy');

    p.classList.toggle('fancy');
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}
function advancedAdd() {
    const selectOption = document.getElementById('addType');
    const selectedValue = selectOption.value;
    const outputDiv = document.getElementById('output-area');

    const tagInput = document.getElementById('tagInput');
    const customTagName = tagInput.value.trim().toLowerCase();

    let elementToAdd;
    switch (selectedValue) {
        case 'text':
            elementToAdd = TextWithTimestamp();
            break;
        case 'comment':
            elementToAdd = CommentWithTimestamp();
            break;
        default:
            elementToAdd = ElementWithTimestamp(customTagName || 'div');
    }

    outputDiv.append(elementToAdd);
}

function TextWithTimestamp() {
    const date = new Date();
    const timestamp = date.toLocaleString();
    return document.createTextNode(` New Text Node - ${timestamp}`);
}

function CommentWithTimestamp() {
    const date = new Date();
    const timestamp = date.toLocaleString();
    const commentContent = `New Comment - ${timestamp}`;
    let result = document.createComment(commentContent);
    return result.textContent;
}

function ElementWithTimestamp(tagname) {
    const date = new Date();
    const timestamp = date.toLocaleString();
    const element = document.createElement(tagname);
    element.textContent = ` New Element - ${timestamp}`;
    return element.textContent;
}


function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
  
    const controlsSection = document.getElementById('controls');

  
    const elementsToDelete = [];
    let currentElement = document.body.lastChild;
    while (currentElement !== controlsSection) {
        elementsToDelete.push(currentElement);
        currentElement = currentElement.previousSibling;
    }

    
    elementsToDelete.forEach((element) => {
        if (element.nodeType === Node.ELEMENT_NODE) {
            
            if (element.tagName.toLowerCase() === 'button' || element === controlsSection) {
                return;
            }
            element.parentNode.removeChild(element);
        }
    });
}

function deleteBySelector(selector) {
    const elementsToDelete = document.querySelectorAll(selector);
    elementsToDelete.forEach((element) => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

function basicClone() {
    const p1 = document.getElementById('p1');
    const clonedP = p1.cloneNode(true);
    clonedP.id = ''; 
    document.body.appendChild(clonedP); 
}

function advancedClone() {
    const cardTemplate = document.getElementById('cardTemplate');
    const clonedCard = cardTemplate.content.cloneNode(true);

    const titleElement = clonedCard.querySelector('.card-title');
    const textElement = clonedCard.querySelector('.card-text');
    const randomNumber = Math.floor(Math.random() * 1000);
    titleElement.textContent = `Card Title ${randomNumber}`;
    textElement.textContent = `Card description for card ${randomNumber}.`;

    document.body.appendChild(clonedCard);
}

window.addEventListener('DOMContentLoaded', init);
