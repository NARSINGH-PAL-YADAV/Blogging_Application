document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    async function fetchPosts() {
        const response = await fetch('http://localhost:3000/posts');
        const posts = await response.json();
        postsDiv.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <small>Author: ${post.author}</small>
            `;
            postsDiv.appendChild(postElement);
        });
    }
    fetchPosts();
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;

        await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        });
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('author').value = '';
        fetchPosts();
    });
});
