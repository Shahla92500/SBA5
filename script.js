
// DOM Element Selection
const form = document.getElementById('postForm');
const postIn = document.getElementById('postInput');
const contentT = document.getElementById('content');
const postList = document.getElementById('postItems');
const submitB = document.getElementById('submitBtn');
const msgErrPostIn = document.getElementById('msgErrPostIn');
const msgErrContentT = document.getElementById('msgErrContentT');




let posts = [];
// load local storage into a javascrip array with help of JSON
document.addEventListener('DOMContentLoaded', () => {

  const saved = localStorage.getItem('posts');
  posts = saved ? JSON.parse(saved):[];
  render();
});
// save our array of posts into local storage, with json we convert JS array to string
function addToLocalStorage() {
    localStorage.setItem('posts',JSON.stringify(posts));
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    checkTitle();
    checkCont();
    if (!postIn.checkValidity() || !contentT.checkValidity()) {
        alert(msgErrPostIn.textContent+" "+msgErrContentT.textContent)
        return; 
  }
    const title = postIn.value;
    const content = contentT.value;
    console.log(`Input: ${title} , content: ${content}`);
    posts.push({title, content}); // adding read new value from form to the array of the values
    addToLocalStorage();
    render();
    form.reset(); // remove displayed data from input forms
});


postIn.addEventListener('input',checkTitle);
contentT.addEventListener('input', checkCont);

function render(){
    postList.innerHTML="";
    for (const post of posts) {
        console.log('in render posts: ', post);
        let li = document.createElement('li');
        li.className = 'postItem';
        li.innerHTML = `
         <div class='postItem'>
        <h3>${post.title} </h3> <p> ${post.content}</p> </div>`;
        postList.appendChild(li);
    }
}

function checkTitle(){

    postIn.setCustomValidity("");
    if (postIn.value.lenghth === 0) {
        postIn.setCustomValidity("Post title cannot be empty.");
    } else if (postIn.validity.tooLong) {
        postIn.setCustomValidity("Post title cannot exceed 50 characters.");
    } 
    console.log("validationMessage: "+postIn.validationMessage);
    msgErrPostIn.textContent = postIn.validationMessage;
    console.log(`In checktitle  : ${msgErrPostIn.textContent} `);

  }   

function checkCont(){
    contentT.setCustomValidity("");
    console.log();
    if (contentT.validity.valueMissing) {
        contentT.setCustomValidity("Post content cannot be empty.");
    } else if (contentT.validity.tooLong) {
        contentT.setCustomValidity("Post content cannot exceed 250 characters.");
    } 
    msgErrContentT.textContent = contentT.validationMessage;
    console.log(`In checkContent : ${msgErrContentT.textContent}`);

  }   