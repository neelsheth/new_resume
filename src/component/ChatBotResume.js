import React, { useEffect, useState, useRef } from 'react'
import ChatBot from 'react-simple-chatbot'
import './style.css'
import { ThemeProvider } from 'styled-components';
import email from './img/email.png'
import whatsapp from './img/whatsapp.jpg'

import telephone from './img/telephone.png'
import n_logo from './img/n_logo.jpg'
// import bot_logo from './img/bot_logo.png'
import bot_logo from './img/final_logo.svg'
//bot_logo
import sound1 from './sound/message_sound.mp3'
import firebase from 'firebase/compat/app'; // Updated import statement
import 'firebase/compat/firestore'; // Updated import statement
import resume from './Neel-Sheth-Resume.pdf'
import apk from './neel_sheth_resume.apk'
import download from './img/download.png'


// import skype from './img/ic_skype.svg'
// import email from './img/ic_mail.svg'
// import telephone from './img/ic_phone.svg'
// import whatsapp from './img/ic_whatsapp.svg'
// import botAvatar from './img/botAvatar.svg'

// ic_chatbot
// ic_phone
// ic_whatsapp
// Logo_SquareWR
//botAvatar

export default function ChatHome() {
    // const [light, setLight] = useState(true)
    const [name, setName] = useState(null);
    const [num, setNum] = useState(null);
    const [purchaseCode, setPurchasecode] = useState(null);
    const [audio, setAudion] = useState(true);
    const [display, setDisplay] = useState(true);
    const [addeddata, setAdd] = useState([]);
    const [check, notcheck] = useState(false);
    const chatbotRef = useRef(null);
  const [scrollAfterStep, setScrollAfterStep] = useState(null);
  useEffect(() => {
    if (scrollAfterStep !== null) {
        console.log("okok");
      scrollToTop();
      setScrollAfterStep(null); // Reset the scrollAfterStep after scrolling
    }
  }, [scrollAfterStep]);

  const scrollToTop = () => {
    if (chatbotRef.current && chatbotRef.current.scrollContainer) {
      chatbotRef.current.scrollContainer.scrollTop = 0;
    }
  };

  const handleComplete = () => {
    // This function gets called after each step
    // You can add custom logic here if needed
  };

    const sound = new Audio(sound1);

    const firebaseConfig = {
        apiKey: "AIzaSyBTTkcAeGPLchxkhz_rj8HRcL1yv5nnFxo",
        authDomain: "chat-gpt-8c52d.firebaseapp.com",
        projectId: "chat-gpt-8c52d",
        storageBucket: "chat-gpt-8c52d.appspot.com",
        messagingSenderId: "29517456162",
        appId: "1:29517456162:web:ef52965486867c9a77bb7b",
        measurementId: "G-6LRXWZ77RM"
    };
    const [isMobile, setIsMobile] = useState(false);

    const [nextProps, setNextProps] = useState("More");



    // useEffect(() => {
    //   const checkIsMobile = () => {
    //     const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    //     setIsMobile(isMobileDevice);
    //     if(isMobileDevice){

    //         setNextProps('More')
    //     }
    //     else{
    //         setNextProps('query_option')
    //     }
    //     // alert(isMobileDevice);
    //   };

    //   checkIsMobile();
    //   window.addEventListener('resize', checkIsMobile);

    //   return () => {
    //     window.removeEventListener('resize', checkIsMobile);
    //   };
    // }, []);




    firebase.initializeApp(firebaseConfig);
    function addtoFirebase(name) {
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const db = firebase.firestore();
        const currentDate = new Date();

        const formattedDate = currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Add the user's name to the "users" collection

        //commet for not add firebase
        db.collection('user').add({
            name: name,
            date: formattedDate,
            isMobile: isMobileDevice,
        })
            .then(() => {
                // console.log('User name stored successfully!');
                // Reset the input field
                // setUserName('');
            })
            .catch((error) => {
                console.error('Error storing user name:', error);
            });
    }

    function handleClickEmail() {
        window.location.href = 'mailto:neelsheth18@gmail.com';
    }
    function handleClickPhone() {
        window.location.href = 'tel:+917802014355';
    }
    function linkedin() {
        // window.location.href = 'https://www.linkedin.com/in/neel-d-sheth/'
        window.open('https://www.linkedin.com/in/neel-d-sheth/', '_blank');
    }
    function whatspp() {
        window.open(`https://wa.me/7802014355`, '_blank');
    }

    const theme = {
        background: '#2121211A',
      

        fontFamily: 'Encode Sans Expanded',
        headerBgColor: '   white',
        headerFontColor: '#000000',
        headerFontSize: '20px',
        // botBubbleColor: '#444444',
        botBubbleColor: 'white',
        botFontColor: 'black',
        userBubbleColor: 'white',
        userFontColor: '#4a4a4a',
    };

    const [ans, setans] = useState(null);

    // useEffect(()=>{
    // },[])

    function sound_play() {
        sound.play();

    }

    const steps = [

        {

            id: "Greet",

            message: "Hello, my name is Neel Sheth. Thank you for showing interest in my resume.",

            // validator:sound_play(),

            trigger: "Done",

        },

        {

            id: "Done",

            message: "Please enter your name!",

            // message: "Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! Please enter your name! ",

            trigger: "waiting1",

        },

        {
            id: "waiting1",

            placeholder: 'Your Name....',

            user: true,

            validator: (value) => {
                sound_play()
                // console.log(value)
                if (value.length == 0 || value == " ") {
                    return 'Enter Name';
                }
                setName(value)
                addtoFirebase(value)
                // data("Name", value);
                return true;
            },
            trigger: "Query",
        },
        {

            id: "Query",

            message: `Hi {previousValue}. Discover more about me by selecting from the options below. `,

            trigger: "query_option",

        },

        {

            id: "query_option",

            placeholder: 'Please Select Any Option....',

            options: [

                { value: "About", label: "Objective", trigger: "About" },

                { value: "Education", label: "Education", trigger: "Education" },

                { value: "Experience", label: "Experience", trigger: "Experience" },

                { value: "Skills", label: "Skills", trigger: "Skills" },

                { value: "Projects ", label: "Projects", trigger: "Projects " },

                { value: "Achievements", label: "Achievements", trigger: "Achievements" },

                { value: "per_details", label: "Personal details", trigger: "per_details" },

                { value: "contact_me", label: "Contact me", trigger: "contact_me" },


            ],
            action: () => setScrollAfterStep('scrollStep')

        },
        {

            id: "Skills",

            component: (
                <>
                    <div className={"custom"}>

                        <ul style={{ listStyleType: 'none' }} >
                            <li className='arrow1-li'>HTML , CSS , JavaScript</li>
                            <li className='arrow1-li'>React Js</li>
                            <li className='arrow1-li'>SQL</li>
                            <li className='arrow1-li'>CodeIgniter</li>
                            <li className='arrow1-li'>FireBase</li>
                            <li className='arrow1-li'>DSA</li>
                            <li className='arrow1-li'>Problem Solving</li>
                            <li className='arrow1-li'>Project Management</li>
                            <li className='arrow1-li'>Teamwork</li>
                            <li className='arrow1-li'>Leadership</li>

                        </ul>

                    </div>

                </>
            ),


            trigger: "query_option",


        },
        {

            id: "contact_me",

            component: (
                <>
                    <div className='custom_cont' onClick={whatspp}>


                        <a><img src={whatsapp} width={'20px'}></img></a>
                        <div> WhatsApp</div>

                        {/* <div> +91 9797945459</div> */}
                    </div>
                    <div className='custom_cont' onClick={linkedin}>


                        <a ><img src='https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-vkm0drb1.png' width={'20px'}></img></a>
                        <div>Linkedin</div>

                        {/* <div> +91 9797945459</div> */}
                    </div>

                    <div className='custom_cont' onClick={handleClickEmail}>

                        {/* <div> +91 9797945459</div> */}
                        <a><img src={email} width={'20px'}></img></a>
                        <div>Email</div>

                    </div>
                    <div className='custom_cont' onClick={handleClickPhone}>

                        {/* <div> +91 9797945459</div> */}
                        <a><img src={telephone} width={'20px'}></img></a>
                        <div> Call</div>

                    </div>

                </>
            ),


            trigger: "query_option",


        },
        {

            id: "About",

            component: (
                <>
                    {/* {sound_play()} */}
                    <div className='custom'>
                        <ul style={{marginLeft:"20px", padding:"10px"}}>

                            <li>
                                With an unwavering passion for developing user-friendly web applications and a keen ability to solve complex problems, I am committed to making a meaningful impact as a web developer within an organization that values growth and continuous learning.
                            </li>
                        </ul>
                    </div>

                </>
            ),


            trigger: "query_option",


        },
        {

            id: "goback_from",

            options: [

                { value: "query_option", label: "More Query", trigger: "query_option" },
            ],

        },
        {

            id: "Education",

            // placeholder: 'Please select an option....',

            component: (
                <>
                    <div className='custom'>
                        <table style={{ borderSpacing: "10px" }}>
                            <thead>
                                <tr>
                                    {/* <th>Year</th> */}
                                    <th>Degree</th>
                                    <th>Institution</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>2022</td> */}
                                    <td>Web Developer</td>
                                    <td>Newton School,Bangalore</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    {/* <td>2020</td> */}
                                    <td>BE Mechanical</td>
                                    <td>SSASIT,Surat</td>
                                    <td>8.66</td>
                                </tr>
                                <tr>
                                    {/* <td>2017</td> */}
                                    <td>Diploma Mechanical</td>
                                    <td>STBS,Surat</td>
                                    <td>9.01</td>
                                </tr>
                                <tr>
                                    {/* <td>2014</td> */}
                                    <td>Matriculation(10th)</td>
                                    <td>L.H Boghra School</td>
                                    <td>80%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </>
            ),

            trigger: nextProps,
        },
        {

            id: "per_details",

            // placeholder: 'Please select an option....',

            component: (
                <div className='custom'>
                    <div>
                        <div>Name : Neel DharmeshBhai Sheth</div>
                        <div>Birthdate : 09 jun 1998</div>
                        <div style={{ padding: 0, display: 'flex', justifyContent: 'flex-start' }}>
                            <div>Address :</div>
                            <div>
                                <span>2,Haridhwar Soc,<br /></span>
                                <span> Near D-mart and karan park,<br /></span>
                                <span>Adajan,Surat,Gujarat.395009</span>
                            </div>
                        </div>

                        <div>Number : 7802014355</div>
                        <div>Email : neelsheth18@gmail.com</div>
                    </div>
                </div>
            ),
            trigger: nextProps,
        },



        {

            id: "Experience",

            // placeholder: 'Please select an option....',

            component: (
                <>
                    <div className='custom'>
                        <div style={{ marginLeft: "10px" }}>
                            {/* <div>
                                <div>Feb 2023...</div>
                                <div>....Present</div>
                            </div> */}
                            <div>
                           
                                    <div>

                                   
                                            <h4>Netsofters LLP :-</h4>
                                            <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                                                <li>
                                                    <b>Full Stack Developer</b> <span>(Feb 2023...Present)</span>
                                                    <div>
                                                    🚀 As a dedicated 𝑭𝒖𝒍𝒍 𝑺𝒕𝒂𝒄𝒌 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓 proficient in 𝑹𝒆𝒂𝒄𝒕.𝒋𝒔 for frontend development and 𝑪𝒐𝒅𝒆𝑰𝒈𝒏𝒊𝒕𝒆𝒓 for backend operations, I bring a blend of technical expertise and collaborative skills to every project. My primary responsibilities encompass crafting intuitive user interfaces using 𝑯𝑻𝑴𝑳, 𝑪𝑺𝑺, and 𝑱𝒂𝒗𝒂𝑺𝒄𝒓𝒊𝒑𝒕 while ensuring seamless integration with robust backend systems.
                                                    </div>
                                                    <div>
                                                    💡 Beyond technical proficiency, my dedication to client satisfaction sets me apart. I excel in client communication and relationship management, ensuring a clear understanding of requirements and delivering solutions that align perfectly with their vision and goals.
                                                    </div>
                                                
                                                </li>
                                             
                                            </ul>
                                      


                                        {/* <li>
                                            <h4>Newton School :-</h4>
                                            <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                                                <li>
                                                    Full Stack Development training
                                                    <div>
                                                        <li style={{ listStyleType: 'none' }} className='arrow-li'>
                                                            Feb 2022 - Dec 2022
                                                        </li>
                                                        <li style={{ listStyleType: 'none' }} className='arrow-li'>
                                                            React Js, HTML, CSS, JavaScript, DSA, JAVA , Firebase.
                                                        </li>
                                                    </div>
                                                </li>

                                            </ul>
                                        </li> */}
                                    </div>
                            
                            </div>

                        </div>
                    </div>

                </>
            ),


            trigger: "More",

        },

        {

            id: "More",

            options: [

                { value: "query_option", label: "More", trigger: "query_option" },
            ],

        },


        {

            id: "Projects ",

            // placeholder: 'Please select an option....',

            component: (
                <>
                    <div className='custom'>
                        <div>
                            <div>Netsofter's Projects - Customization</div>
                            <li><a href='https://codecanyon.net/item/elite-quiz-trivia-quiz-quiz-game-web-version/36712217' target='_blank' style={{ textDecoration: 'none' }}>Elite Quiz</a></li>
                            <li><a href='https://codecanyon.net/item/eshop-web-multi-vendor-ecommerce-marketplace-cms/34380052' target='_blank' style={{ textDecoration: 'none' }}>E-Shop Web - Multi Vendor eCommerce Marketplace</a></li>
                            <li><a href='https://codecanyon.net/item/egrocer-online-grocery-store-ecommerce-marketplace-flutter-full-app-with-admin-panel/41423150?s_rank=5' target='_blank' style={{ textDecoration: 'none' }}>E-Grocer :- Multi Vendor Grocery Store</a></li>
                            <li><a href='https://codecanyon.net/item/news-flutter-news-full-app/32062835?s_rank=18' target='_blank' style={{ textDecoration: 'none' }}>News App</a></li>
                        {/* </div>
                        <div> */}
                            <div>College Projects</div>
                            <li><a href='https://neel-sheth-resume.netlify.app' target='_blank' style={{ textDecoration: 'none' }}>ChatBot Resume</a></li>
                            <li><a href='https://show-info.netlify.app/' target='_blank' style={{ textDecoration: 'none' }}>Show Info</a></li>
                            <li><a href='https://weather-details-info.netlify.app/' target='_blank' style={{ textDecoration: 'none' }}>Weather Info</a></li>
                            <li><a href='https://swiggy-bug.netlify.app/' target='_blank' style={{ textDecoration: 'none' }}>Swiggy Bug</a></li>
                        </div>
                    </div>

                </>
            ),
            trigger: "query_option",
        },
        {

            id: "Achievements",

            component: (
                <div className='custom'>
                    <div style={{ marginLeft: "15px" }}>

                        <ul>
                            <div style={{ margin: "10px" }}>

                                {/* Published Patent on “<b>AN APPARATUS FOR MAKING PAPER BAG</b>” , Patent application No: 201921014989. */}
                                🏆Recognized with multiple prestigious awards, including "<b>Employee of the Month</b>" , "<b>Employee of the Week</b>" as well as the esteemed "<b>Problem Solver Award</b>", reflecting a commitment to excellence and problem-solving prowess in the office environment.

                            </div>
                            <div style={{ margin: "10px" }}>
                                {/* In my current company, I have attained extraordinary acknowledgment, having been honored as the <b>Employee of the Month, Employee of the Week</b>, and even receiving the <b>Early Bird</b> award */}
                                🔧Demonstrated expertise in <b>API optimization</b>, implementing strategies that led to a remarkable reduction of 70 to 80% in API response times in my previous E-commerce project. This optimization significantly enhanced system performance and user satisfaction, showcasing my commitment to delivering high-quality solutions.
                            </div>
                            <div style={{ margin: "10px" }}>

                                📜Published Patent on “<b>AN APPARATUS FOR MAKING PAPER BAG</b>” - Patent application No: 201921014989,showcasing innovative thinking and a drive for technological advancement.

                            </div>
                        </ul>
                    </div>



                </div>
            ),

            //query_option
            trigger: "query_option",

        },


    ];


    const config = {
        // botAvatar: "https://scontent.fstv5-1.fna.fbcdn.net/v/t39.30808-6/241190298_1029370764541379_8026433861392322788_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rwzWRrYkThwAX-shlVJ&_nc_ht=scontent.fstv5-1.fna&oh=00_AfBWNn0FDKo2Vyz3R3SR8LIMdfsjum6nSqQYohEJlLn-Hg&oe=641C99C4",
        floating: true,
    };

    const handleDownload = () => {
        addtoFirebase(`Resume_Download-->${name}`);
        const link = document.createElement('a');
        link.href = resume; // Replace with the actual path to your PDF file
        link.download = 'Neel-sheth-Resume.pdf'; // Replace with the desired filename for the downloaded file
        link.click();
    };

    const handleDownload1 = () => {
        addtoFirebase(`APK_Download-->${name}`);
        const link = document.createElement('a');
        link.href = apk; // Replace with the actual path to your APK file
        link.download = 'Neel-sheth-Resume.apk'; // Replace with the desired filename for the downloaded APK
        link.click();
    };



    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const lines = ['Web Developer...', 'Front End Developer...', 'Back End Developer...', 'Full Stack Developer...'];
    const [timer1, settimer] = useState(200)

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentCharacterIndex === lines[currentLineIndex].length) {
                // Reached the end of a line
                // settimer(2000);
                settimer(200);
                setCurrentCharacterIndex(0);


                if (currentLineIndex === lines.length - 1) {
                    // Reached the end of all lines, start over
                    setCurrentLineIndex(0);
                } else {
                    // Move to the next line
                    setCurrentLineIndex((prevIndex) => prevIndex + 1);
                }
            } else {
                settimer(200);
                // Increment the character index
                setCurrentCharacterIndex((prevIndex) => prevIndex + 1);
                if (currentCharacterIndex === lines[currentLineIndex].length - 1) {
                    // alert("w")
                    settimer(3000);
                }
            }
        }, [timer1]); // Delay between each character (adjust as needed)

        return () => clearInterval(timer);
    }, [currentLineIndex, currentCharacterIndex]);

    // handleClick = (event) => {
    //     if (event.target.classList.contains('flex')) {
    //         sound_play()
    //     }
    // };


    const handleClick = (event) => {
        // console.log(event.target.classList)
        if (event.target.classList.contains('rsc-os-option-element')) {
            setTimeout(() => {
                sound_play();
            }, 1500);

        }
    };





    return (

        <div>

            {/* <Loginheader change_login_display={(condition) => change_login_display(condition)}></Loginheader> */}
            {/* <button onClick={()=>setLight(!light)}>colour</button> */}
            {display &&
                <div onClick={handleClick}>
                    <div className='flex'>
                        <ThemeProvider theme={theme}>
                            <ChatBot
                                //  hideBotAvatar={true}
                                // botAvatar={n_logo}
                                userAvatar={n_logo}
                                // floating={true}
                                headerTitle="Web Developer"
                                headerComponent={
                                    <div className='custom_header'>

                                        <div className="writing-animation"><h3>I'm a {lines[currentLineIndex].substr(0, currentCharacterIndex)}</h3></div></div>
                                }
                                // speechSynthesis={{ enable: audio, lang: 'en' }}
                                // floating={true}
                                width={"600px"}
                                // recognitionEnable={true}
                                steps={steps}
                                ref={chatbotRef}
                                onComplete={handleComplete}
                                bubbleOptionStyle={{
                                    'background-color': 'white',
                                    'box-shadow': '0px 4px 16px #2121210F',
                                    'color': "black",
                                    'border-radius': '8px',
                                    'border': '0.5px solid #444444',
                                    'opacity': '1',
                                    'list-style': 'disc inside',
                                    'align-items': 'center',
                                    'min-width': '175px',
                                    'cursor': 'pointer',
                                }}
                                customStyle={{
                                    //for custom component style
                                    'padding': '0px',
                                    'margin': '10px',
                                    'max-width': '500px',
                                    'margin-left': '10px',
                                    // "border-radius": "20px",
                                    // 'border-bottom-left-radius': '0px',
                                    'background-color': 'rgb(232,232,232)',
                                    'box-shadow': 'none',
                                }}
                                avatarStyle={{
                                    // 'padding': 'px',
                                    "border-radius": "50%",
                                }}
                                bubbleStyle={{
                                    'border-bottom-left-radius': '15px',
                                    'border-top-right-radius': '15px',
                                    'border-top-left-radius': '0px',
                                    'border-bottom-right-radius': '0px',
                                }}
                            // {...config}
                            // botAvatar={botAvatar}
                            />

                        </ThemeProvider>

                    </div>
                </div>}
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
                
                <button style={{ margin: "10px" }} className='down_btn' onClick={handleDownload}>
                    <span role="img" aria-label="Download" style={{ marginRight: "5px" }}><img width={"20px"} src={download}></img></span> Resume
                </button>

                <button style={{ margin: "10px" }} className='down_btn' onClick={handleDownload1}>
                    <span role="img" aria-label="Download" style={{ marginRight: "5px" }}><img width={"20px"} src={download}></img></span>App Apk
                </button>
            </div> */}
        </div>
    )
}
