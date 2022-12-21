import { useEffect, useState } from "react"



function Meme(){

    const [meme, setMeme] = useState({
        topText: "topText",
        bottomText: "bottomText",
        img: "http://i.imgflip.com/1bij.jpg"
    })

    const [memeImage, setMemeImage] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeImage(data.data.memes))
    }, [])

    console.log(memeImage)

    

    return(
        <main>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Top Text..."
                    className="formInput"
                    name="topText"
                    
                />
                <input 
                    type="text" 
                    placeholder="Bottom Text..."
                    className="formInput"
                    name="bottomText"
                    
                />
                <button className="memeButton">Get new meme image 🖼️ </button>
            </div>
            <div className="meme">
                <img src="http://i.imgflip.com/1bij.jpg" alt="" className="memeImage"/>
                <h2 className="meme-text top">top</h2>
                <h2 className="meme-text bottom">bottom</h2>
            </div>
            
        </main>
    )
}

export default Meme
