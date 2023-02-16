import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "./DocAlpha.css"
import { useSelector } from "react-redux";

const DocAlphabot = () => {

    const [userchat, setUserchat] = useState("");
    const [aichat,setAichat] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [userchatlist, setUserchatlist] = useState([]);
    const [aichatlist,setAichatlist] = useState(["Hello, dear, I am Doc.Alpha, a ChatGPT demo AI, feel free to chat with me."]);
    const sessionUser = useSelector(state => state.session.user);


    const askSubmit = async (e) => {
        e.preventDefault();
       
        const question={question:userchat}
        setImageLoading(true); 
        const res = await fetch('/api/aichats', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });
        if (res.ok) {
            const anwser=await res.json();
            setUserchat(userchat)
            await setAichat(anwser.aires)
            setUserchatlist([...userchatlist,userchat])
            setUserchat("")
            await setAichatlist([...aichatlist,aichat])
            await setImageLoading(false);
        }
        else {
            setImageLoading(false);
            console.log("error")
        }
    }


    return(
        <div className="da-entiresec">
        <h1>Doctor Alpha's Playground</h1>
        <div className="da-topsec">
        <div>
            <img src="http://app-bucket-eric001.s3.amazonaws.com/77a01796ad9d4134958078f02a1e9487.jpg" className="docimage"/>
            <div className="da-title">Doc. Alpha</div>
            <div>Atlantis V.P.</div>
            <div className="chatgpt">ChatGPT Demo</div>
            <div>{(imageLoading)&& <p className="doctyping">Old Doc is typing...</p>}</div>
        </div>
        <div className="da-topright">
        {/* {!!testlist1.length && ( */}
        {!!aichatlist.length && (
        <div>
        <div>
        {/* {testlist1.map((item) => ( */}
          {aichatlist.filter(item=>item!=="").map((item) => (
            <div key={item} className="da-pretext">{`Doc_Alpha:$> ${item}`}</div>
          ))}
        </div>
        <div className="da-pretext">{`Doc_Alpha:$> ${aichat}`}<span id="caret">&nbsp;</span></div>
        </div>
        )}
        </div>

        </div>

        <div className="da-bottomsec">
        <div className="da-topright">
        <div>
        {/* {!!testlist1.length &&  */}
       {!!userchatlist.length && 
        (<div>

        <div>
        {/* {testlist1.map((item) => ( */}
          {userchatlist.map((item) => (
            <div key={item} className="da-pretext">{`Me:$> ${item}`}</div>
          ))}
        </div>
        </div>)
        }
        </div>


         </div>
         <div>
            <img src="http://app-bucket-eric001.s3.amazonaws.com/b36477cfcf1b4f579c0002ab589703d2.jpg" className="docimage"/>
            <div className="da-title">{sessionUser?sessionUser.username:"user"}</div>
            <div>Prime Member</div>
         </div>
         </div>
          
         
         <form onSubmit={askSubmit} className="da-typingsec">
         <div className=''>
         <input
         className='da-input'
         placeholder="Please input your question"
         type="text"
         name="question"
         onChange={(e) => setUserchat(e.target.value)}
         value={userchat}/></div>
         <button type="submit" className="da-button" title="send your message"><i className="fa-regular fa-paper-plane"/></button>
         </form>
        </div>
    )
}

export default DocAlphabot
