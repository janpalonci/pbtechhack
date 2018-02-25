const baseURL = 'http://localhost:3000'

class Feed extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = "";
      
      this.state = {
          posts : [],
          filters: {
              type: 'class'
          }
      }

      this.hardRefresh();
      window.feed = this; //make this object available to window
    }

    hardRefresh(){ //refresh view
        this.resetPosts();
        this.getPosts()
        .then(() => {
            this.softRefresh();

            if(window.location.hash && $(window.location.hash).length) 
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top
            }, 1000);
            console.log(this.state)
        })
    }

    softRefresh(){
        this.resetView();
        this.viewAllPosts();
    }

 
    createNewPost(newPost){ //Create new post 
        if(!newPost) return console.log('Need to pass a post')
        if(Number.isInteger(newPost)) newPost = postExamples[newPost-1];

        axios.post(`${baseURL}/posts`,  newPost)
            .then(resp=>{
                let newPost = resp.data;
                this.state.posts.push(newPost)
                this.pushNewPostView(newPost)
                console.log(this.state)
            })
            .catch(err => console.error(err))
    }

    getPosts(){ //get posts from API
        return new Promise ((resolve, reject ) => {
            axios.get(`${baseURL}/posts`)
            .then(resp=>{
                this.state.posts = resp.data;
                this.state.posts.sort((a,b)=>new Date(a.created_at) - new Date(b.created_at))
                resolve()
            })
            .catch( err => reject())
        })
    }

    resetPosts(){ //reset everything
        this.state.posts = [];
        this.innerHTML = '';
    }

    resetView(){
        this.innerHTML = '';
    }

    filter(post){
        let skip = false;

        if(this.state.filters.type){
            let type = this.state.filters.type;

            skip = ( post.type === type ) ? false : true;
        }
        if(this.state.filters.search){
            let value = this.state.filters.search.toLowerCase();

            skip = ( post.title.toLowerCase().includes(value) || post.description.toLowerCase().includes(value))
             ? false : true;
        }

        return skip? null : post;
    }

    viewAllPosts(){ //push all posts to view
        this.state.posts.forEach( post => this.pushNewPostView(post))
    }
    

    pushNewPostView(post){ //push post to view
        
        if(! this.filter(post)) return; //filter
        
        let authorPicUrl = (post.author && post.author.picUrl) ? post.author.picUrl: "./assets/img_avatar.png";

        let postTemplate =`
         <div class="col-lg-6 portfolio-item p-4">
            <div class="card h-100 ">
            <img class="card-img-top" src="${post.picUrl}" alt="">
            <div class="card-body">
                <h4 class="card-title">
                ${post.title}
                </h4>
                <p class="card-text">${post.description}</p>
            </div>

            <div class="chip m-3">
            <img src="${authorPicUrl}" alt="Person" width="96" height="96">
                ${post.author.firstName} ${post.author.lastName}

            <a class='btn btn-outline-primary' href='mailto: ${post.contact.email}'>
                   Contact
            </a>
            </div>

                
            </div>

        </div>`
        // ${post.author.firstName} ${post.author.lastName}
   
        $(this).prepend(postTemplate);
    }

}

window.customElements.define('main-feed', Feed);

handleClickFilter = (filter) =>{
    feed.state.filters.type = filter;
    feed.softRefresh();
}


search = ()=>{
    let value = $('#search')[0].value;
    feed.state.filters.search = value;
    feed.softRefresh();
}

handleClickTeacher = (filter) =>{
    handleClickFilter(filter);

    $('.intro-text').slideUp()
    $('.navbar').addClass('navbar-shrink-always')
}


let postExamples = [{
    title: "BlueTech Web Solutions",
    picUrl: "http://www.storystandardsguide.com/wp-content/uploads/2018/02/Web-Design.jpg",
    type: "company",
    description: "From frontend to backend we cover it all, and would be happy to share our skills with your students.",
    author: {
        pic: '',
        firstName: 'Alex',
        lastName: 'Kapre',
        id: '',
    },
    hashtags: ['#webdesign', '#websites','#fullstack','#frontend','#backend'],
    contact: {
        email: "BlueTechHelp@gmail.com",
        phone: 3055074770
    }
},
{
    title: "Miami Aero Tech",
    picUrl: "http://rijeka-airport.hr/img/aerodrom/aerodrom-rijeka-2-2.jpg",
    type: "company",
    description: "We are an all around aero maintence and engineering company. With years of experience we've worked on everything from training planes to jets. Give us a call and our coordinator will be happy to schedule a talk with your students.",
    author: {
        pic: '',
        firstName: 'Jorge',
        lastName: 'Gonzalez',
        id: '',
    },
    hashtags: [ '#engineering', '#aero','#plane','#jets'],
    contact: {
        email: "MiaAeroTech@gmail.com",
        phone: 7544536372
    }
},
{
    title: "Zapp Electrical Solutions",
    picUrl: "http://electric-ideas.com/assets/img/Electric_Logo_5.png",
    type: "company",
    description: "Wiring South Florida for over 20 years. Our team is full of very qualified electrical engineers.",
    author: {
        pic: '',
        firstName: 'Nikola',
        lastName: 'Edwards',
        id: '',
    },
    hashtags: [ '#electrical', '#engineering','#robotics','#wiring'],
    contact: {
        email: "ZappES@gmail.com",
        phone: 9546078293
    }
},

{
    title: "Vigilant Biosciences",
    picUrl: "https://azbigmedia.com/wp-content/uploads/2017/08/bioscience.jpg",
    type: "company",
    description: "We are a fresh startup helping spread the bioscience industry in South Florida.",
    author: {
        pic: '',
        firstName: 'Violet',
        lastName: 'Mc Guiness',
        id: '',
    },
    hashtags: [ '#bioscience', '#biology','#stemcells','#biochem'],
    contact: {
        email: "VigilentBio@gmail.com",
        phone: 5647830192
    },
    
},


{  
    title:"Seeking Web Developer",
    picUrl:"https://www1-lw.xda-cdn.com/files/2017/05/AAEAAQAAAAAAAAg8AAAAJGFhMDRkNmMyLTY5M2EtNDgwYS1iMWE4LTk2YThkYTM0ODY4OQ.jpg",
    type:"class",
    description:"We are looking for a quest speaker for our class that’s in the web development industry.",
    author:{  
       pic:'',
       firstName:'Saara',
       lastName:'Saarelaa',
       id:'',
 
    },
    hashtags:[  
       '#school',
       '#webdevelopment',
       '#technology',
 
    ],
    contact:{  
       email:"saarelaa@fhhs.com",
       phone:5618362563
    }
 },
 {  
    title:"Guest Speaker Biologist ",
    picUrl:"https://wonderopolis.org/wp-content/uploads/2017/08/Molecular_Biologistdreamstime_xl_94595845.jpg",
    type:"class",
    description:"In need of a biologist to speak and Q&A with 10th grade class",
    author:{  
       pic:'',
       firstName:'Charles',
       lastName:'Darwin',
       id:'',
 
    },
    hashtags:[  
       '#school',
       '#questspeaker',
       '#biology',
       '#science',
 
    ],
    contact:{  
       email:"darwin@aol.com",
       phone:01145264936
    }
 },
 {  
    title:"Seeking IT Mentor",
    picUrl:"https://i2.wp.com/thehelpbyastrids.com/wp-content/uploads/2014/04/22-2-13-Mentoring1.jpg",
    type:"class",
    description:"I am looking for an IT mentor for a gifted student. He is aspiring to become a data admin after graduation.",
    author:{  
       pic:'',
       firstName:'Jukka',
       lastName:'Jokinnen',
       id:'',
 
    },
    hashtags:[  
       '#school',
       '#it',
       '#mentor',
       '#dataadmin',
 
    ],
    contact:{  
       email:"jukka572@gmail.com",
       phone:3056372298
    }
 },
 {  
    title:"Web Designer Guest Speaker",
    picUrl:"https://image.freepik.com/free-photo/web-design-concept-with-drawings_1134-77.jpg",
    type:"class",
    description:"Looking for a web designer quest speaker with 3+ years of work experiance.",
    author:{  
       pic:'',
       firstName:'Jean',
       lastName:'LeBlanc',
       id:'',
 
    },
    hashtags:[  
       '#school',
       '#it',
       '#mentor',
       '#webdesign',
       '#questspeaker',
 
    ],
    contact:{  
       email:"jukka572@gmail.com",
       phone:5617442298
    }
 }

]