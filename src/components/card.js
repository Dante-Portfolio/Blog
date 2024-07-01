export class componente extends HTMLElement {

    constructor() {
        super()
        const template = document.createElement('template')
        template.innerHTML = `
                
        <div id='card' class="card">
            <img id="image"></img>
            <h3 id="title"></h3>
            <div id="name" class="name"></div>

            <p id='content'></p> 
            <div class="authorBox">
                <a id='mailLink'><div id="iconMail" class="iconMail"></div></a>
                <div id="date" class="date"></div>
            </div>

            <div class="labelBox">
                <div id="label1" class="label1"></div>
                <div id="label2" class="label2"></div>
            </div>

        </div>

        <style>
        :host {                 /* <------- CONTAINER !!!!!! */
            width: 30%;
            height: 100%;
        }

        .card {
            width: 100%; 
            height: 100%;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            position: relative;
            border: 4px solid blue;

            img {
                position: absolute;
                z-index: -1;
                height: 100%;
		        width: 100%;
		        object-fit: cover;
            }

            h3 {
                border: 1px solid grey;
                color: grey;
            }

            .name {
                border: 1px solid grey;
                color: grey;
            }

            p {
                border: 1px solid grey;
                color: grey;
                font-size: small;
            }

            .authorBox{
                height: 30px;
                border: 1px solid grey;
                color: grey;
                display: flex;
                justify-items: space-between;

                .iconMail {
                    height: 100%;
                    width: 30px;
                    background: url("https://i.pinimg.com/564x/ba/2a/23/ba2a23293e7b41da7643c59fda51b8b1.jpg");
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }

            .labelBox {
                height: 30px;
                border: 1px solid grey;
                color: grey;
                display: flex;
                justify-items: space-between;

                .label1,
                .label2 {
                    width: 50%;
                }
            }
        }
        </style>
        `
        const root = this.attachShadow({ mode: "open" })
        root.appendChild(document.importNode(template.content, true))
    }

    connectedCallback() {

        let config = []

        if (this.hasAttribute('config')) {
            config = JSON.parse(this.getAttribute('config'));
        } else {
            config = JSON.parse(localStorage.getItem('article'))
        }

        this.shadowRoot.getElementById('image').src = config.image
        this.shadowRoot.getElementById('title').textContent = config.title
        this.shadowRoot.getElementById('name').innerText = config.author.name
        this.shadowRoot.getElementById('content').innerText = config.content
        this.shadowRoot.getElementById('date').innerText = config.date
        this.shadowRoot.getElementById('label1').innerText = config.labels[0]
        this.shadowRoot.getElementById('label2').innerText = config.labels[1]
        // mailto
        this.shadowRoot.getElementById('mailLink').href = 'mailto:' + config.author.mail
        //

        // link
        const component = this.shadowRoot.getElementById('card')
        if (this.hasAttribute('config')) {
            component.addEventListener('click', () => {
                localStorage.setItem('article', JSON.stringify(config))
                window.open('../html/article.html')
            })
        }
    }
}

customElements.define('card-art', componente)
