const loadData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const main = await res.json();
    const allData = main.data;
    displayData(allData);
}
const convertSecond = (seconds) => {
    let hours = Math.trunc(seconds / 3600);
    const remainingSeconds = seconds - (hours * 3600);
    let minutes = Math.trunc(remainingSeconds / 60);
    let hourTime = ''
    let minuteTime = ''
    if (hours > 1) {
        hourTime = ` hrs `
    }
    else if (hours === 1) {
        hourTime = ` hr `
    }
    else if (hours === 0) {
        hourTime = ''
        hours = ''
    }
    if (minutes > 1) {
        minuteTime = ` mins ago`
    }
    else if (minutes === 1) {
        minuteTime = ` min ago`
    }
    else if (minutes === 0) {
        minuteTime = ''
        minutes = ''
    }
    const result = hours + hourTime + minutes + minuteTime;
    return result;

}

const buttonContainer = document.getElementById('btn-container')

const dynamicBtn = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const buttons = data.data;
    buttons.forEach(button => {
        const btn = document.createElement('btn');
        btn.innerHTML = `
        <button onclick="category(${button.category_id})" class="bg-gray-300 py-1 px-3 rounded-md focus:bg-red-500 focus:text-white">${button.category}</button>
        `
        buttonContainer.appendChild(btn);
    })
}

const cardsContainer = document.getElementById('cards-container')

const displayData = para => {
    const elements = para;
    elements.forEach(element => {
        const isVerified = `${element.authors[0].verified}`;
        const hasOverlay = `${element.others.posted_date}`
        const vector = () => {
            if (isVerified == 'true') {
                return '';
            }
            else {
                return 'hidden';
            }
        }
        const overlay = () => {
            if (hasOverlay == '') {
                return 'hidden';
            }
            else {
                return '';
            }
        }
        const hide = overlay();
        const isHidden = vector();
        const postedTime = element.others.posted_date;
        const date = convertSecond(postedTime);
        const card = document.createElement('card')
        card.innerHTML = `
        <div class="card card-compact max-w-xs bg-base-100 pb-3">
        <figure class="h-48 rounded-lg"><img src="${element.thumbnail}" class="overflow-hidden w-[100%] h-[100%] object-cover rounded-lg"  alt="Shoes" />
        <div class="bg-black absolute right-2 top-40 rounded-sm">
        <h1 ${hide} class="text-xs text-gray-300 px-2 py-1">${date}</h1>
        </div>
        </figure>
        <div class="flex py-5 px-3 gap-3">
        <img class="w-10 h-10 rounded-full" src="${element.authors[0].profile_picture}">
       <div>
       <h2 class="card-title text-lg">${element.title}</h2>
       <div class="flex w-fit gap-1"><p class="w-fit text-sm text-gray-600">${element.authors[0].profile_name}</p><svg ${isHidden} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill="blue" fill-rule="evenodd" clip-rule="evenodd" d="M6.26701 3.45496C6.91008 3.40364 7.52057 3.15077 8.01158 2.73234C9.15738 1.75589 10.8426 1.75589 11.9884 2.73234C12.4794 3.15077 13.0899 3.40364 13.733 3.45496C15.2336 3.57471 16.4253 4.76636 16.545 6.26701C16.5964 6.91008 16.8492 7.52057 17.2677 8.01158C18.2441 9.15738 18.2441 10.8426 17.2677 11.9884C16.8492 12.4794 16.5964 13.0899 16.545 13.733C16.4253 15.2336 15.2336 16.4253 13.733 16.545C13.0899 16.5964 12.4794 16.8492 11.9884 17.2677C10.8426 18.2441 9.15738 18.2441 8.01158 17.2677C7.52057 16.8492 6.91008 16.5964 6.26701 16.545C4.76636 16.4253 3.57471 15.2336 3.45496 13.733C3.40364 13.0899 3.15077 12.4794 2.73234 11.9884C1.75589 10.8426 1.75589 9.15738 2.73234 8.01158C3.15077 7.52057 3.40364 6.91008 3.45496 6.26701C3.57471 4.76636 4.76636 3.57471 6.26701 3.45496ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="#4B5563"/> </svg></div>
       <p class="text-sm text-gray-500 pt-1">${element.others.views} views</p>
       </div>
       </div>
        </div>
      </div>`
        cardsContainer.appendChild(card);
    })
    if (elements.length === 0) {
        const sorry = document.createElement('sorry')
        sorry.innerHTML = `
        <div class="flex flex-col justify-center items-center w-[100vw] mt-36">
            <img class="w-24" src="./Icons/Icon.png" alt="">
            <p class="font-bold text-xl">Oops!! Sorry, There is no content here</p>
        </div>
        `
        cardsContainer.appendChild(sorry)
    }
}

const category = (id) => {
    cardsContainer.innerHTML = '';
    loadData(id);
}

dynamicBtn()
loadData(1000)
