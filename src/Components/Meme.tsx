import { useEffect, useState } from "react"



function Meme(){

    // state holds data in the component as an object so that these 
    //values can be re-rendered when the user causes change 
    //including new text or getting a new image
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    //state for image is stored as an array since the data
    //is also in an array.
    const [allMeme, setAllMeme] = useState([])

    //useEffect to take care of side effects of fetcing images.
    //prevents function from infinite loop of grabbing the images over
    //and over again. 
    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes)
        }
        getMemes()
    }, [])


    //function grabs a random image from the data and renders 
    //it using state to update the chage 
    function getMemeImages(){
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    //set the state targeting the event to update the name value key
    // so that the state can change the text while user is typing up thier meme
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))

    }

    

    return(
        <main>
            {/* form where the text goes and is updated on state using 
            different function to handle state and change */}
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Top Text..."
                    className="formInput"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text" 
                    placeholder="Bottom Text..."
                    className="formInput"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button className="memeButton" onClick={getMemeImages}>Get new meme image 🖼️ </button>
            </div>
            {/* this is the meme gereation output where the text appears on top 
            of the randomly rendered image */}
            <div className="meme">
                <img src={meme.randomImage} alt="" className="memeImage"/>
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}

export default Meme
