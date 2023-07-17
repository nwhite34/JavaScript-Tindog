import Dog from './Dog.js';
import dogsData from './data.js';

let currentDogIndex = 0;
let currentDog = new Dog(dogsData[currentDogIndex]);
let timerId = null; // Variable to store the timer ID

document.getElementById("accept-button").addEventListener('click', yes);
document.getElementById("reject-button").addEventListener('click', no); // Corrected here


render();

function render() {
    document.getElementById('card').innerHTML = currentDog.getDogHtml();
}

function getNewDog() {
    currentDogIndex += 1;
    if (currentDogIndex >= dogsData.length) {
        currentDogIndex = 0;
        // Disable the accept and reject buttons
        document.getElementById("accept-button").disabled = true;
        document.getElementById("reject-button").disabled = true;
        document.getElementById("accept-button").classList.add('disabled-button');
        document.getElementById("reject-button").classList.add('disabled-reject-button');
        const card = document.getElementById('card');
        card.innerHTML = '';
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        card.appendChild(container);
        const img = document.createElement('img');
        img.src = 'images/icon-profile.png';
        img.alt = 'Description of the image';
        img.classList.add('my-image');
        container.appendChild(img);
        const message = document.createElement('div');
        message.textContent = " There's no one around you. Expand your discovery or go Global to see more.";
        message.classList.add('out-of-people');
        container.appendChild(message);
        const heading = document.createElement('h1');
        heading.textContent = 'Go Global';
        heading.addEventListener('click', function () {
            currentDogIndex = 0;
            currentDog = new Dog(dogsData[currentDogIndex]);
            render();
            document.getElementById("accept-button").disabled = false;
            document.getElementById("reject-button").disabled = false;
            document.getElementById("accept-button").classList.remove('disabled-button');
            document.getElementById("reject-button").classList.remove('disabled-reject-button');
        });

        container.appendChild(heading);


        const networkIcon = document.getElementById('network-icon');
        networkIcon.style.display = 'block';
        const favicon = document.getElementById('favicon');
        favicon.href = 'out-of-people-favicon.png';
        document.getElementById("accept-button").disabled = true;
        document.getElementById("reject-button").disabled = true;
        return;
    }

    currentDog = new Dog(dogsData[currentDogIndex]);
    render();

    const networkIcon = document.getElementById('network-icon');
    networkIcon.style.display = 'none';
    const favicon = document.getElementById('favicon');
    favicon.href = 'path/to/default-favicon.png';
}

function startTimer() {
    // Delay the next call to getNewDog() by three seconds (3000 milliseconds)
    timerId = setTimeout(() => {
        getNewDog();
        timerId = null; // Reset the timer ID after the callback execution
    }, 500);
}

function yes() {
    currentDog.setMatchStatus(true);

    if (timerId) {
        clearTimeout(timerId);
    }

    const likeImage = document.createElement('img');
    likeImage.classList.add('like-image');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.appendChild(likeImage);
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
    imageWrapper.appendChild(likeImage);
    document.getElementById('card').appendChild(imageWrapper);
    imageContainer.classList.add('like-animation');
    setTimeout(() => {
        imageWrapper.remove();
        getNewDog();
    }, 500);
}

function no() {
    currentDog.setMatchStatus(false);

    if (timerId) {
        clearTimeout(timerId);
    }

    const dislikeImage = document.createElement('img');
    dislikeImage.classList.add('dislike-image');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.appendChild(dislikeImage);
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
    imageWrapper.appendChild(dislikeImage);
    document.getElementById('card').appendChild(imageWrapper);
    imageContainer.classList.add('dislike-animation');
    setTimeout(() => {
        imageWrapper.remove();
        getNewDog();
    }, 500);
}
