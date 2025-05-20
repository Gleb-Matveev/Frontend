document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.querySelector('.preloader');
    const errorMessage = document.querySelector('.error-message');
    const commentsList = document.querySelector('.comments');

    function getFilteredComments() {
        const random = Math.random();
        if (random < 0.5) {
            return fetch('https://jsonplaceholder.typicode.com/comments?id_gte=100')
        } else {
            return fetch('https://jsonplaceholder.typicode.com/comments?id_lte=100')
        }
    }

    function renderComments(comments) {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const li = document.createElement('li');
            const title = document.createElement('strong');
            const text = document.createElement('p');
            const author = document.createElement('i');
            li.classList.add('comment');

            title.textContent = comment.name;
            text.textContent = comment.body;
            author.textContent = comment.email;

            li.appendChild(title);
            li.appendChild(text);
            li.appendChild(author);
            commentsList.appendChild(li);
        });
    }

    function showError() {
        errorMessage.style.display = 'block';
    }

    function fetchData() {
        preloader.style.display = 'block';
        errorMessage.style.display = 'none';

        getFilteredComments()
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then(data => {
                preloader.style.display = 'none';
                renderComments(data);
            })
            .catch(err => {
                preloader.style.display = 'none';
                showError();
            });
    }

    fetchData();
});
