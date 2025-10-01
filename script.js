
// DOM Element Selection
const postIn = document.getElementById('postInput');
const contentT = document.getElementById('content');
const submitB = document.getElementById('submitBtn');
const postList = document.getElementById('postItems');


let posts = [];
document.addEventListener('DOMContentLoaded', () => {

  const postInput = localStorage.getItem('post-input');
  const contentText = localStorage.getItem('content-text');
  if (postInput) { 
    postIn.value = postInput; 
  }
  if (contentText){
    contentT.value = contentText;
  }
  // Load existing posts from localStorage
   posts.forEach(post => {
    addPostToDOM(post.title, post.content);
  });
});

submitB.addEventListener("click", (e)=> {
    e.preventDefault();

    console.log(`Post Title: ${postIn.value}, Post Content: ${contentT.value}`);
    localStorage.setItem("post-input", postIn.value.push);
    localStorage.setItem("content-text", contentT.value);
    const postTitle = postIn.value;
    const postContent = contentT.value;

  if (postTitle && postContent) {
    const li = document.createElement('li');
    li.className = 'postItem';
    li.innerHTML = `
        <h3>${postTitle}</h3>
        <p>${postContent}</p>
    `;
    postList.appendChild(li);
    posts.push({ title: postTitle, content: postContent });
  }
});
postIn.addEventListner ('input', checkInputs);
contentT.addEventListener ('input', checkInputs);

function checkInputs(){
    if (postIn.value.length === 0) {
        postIn.setCustomValidity("Post title cannot be empty.");
    } else if (postIn.value.length > 50) {
        postIn.setCustomValidity("Post title cannot exceed 50 characters.");
    } else {
        postIn.setCustomValidity("");
        contentT.setCustomValidity("");
    }
    if (contentT.value.length === 0) {
        contentT.setCustomValidity("Post content cannot be empty.");
    } else if (contentT.value.length > 250) {
        contentT.setCustomValidity("Post content cannot exceed 250 characters.");
    } else {
        postIn.setCustomValidity("");
        contentT.setCustomValidity("");
    }
    msgErrPostIn.textContent = postIn.validationMessage;
    msgErrContentT.textContent = contentT.validationMessage;
    console.log(`Post Title: ${msgErrPostIn.textContent}, Post Content: ${msgErrContentT.textContent}`);    
}   
