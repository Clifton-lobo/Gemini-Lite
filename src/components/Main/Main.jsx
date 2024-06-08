import React, { useContext } from 'react'
import assets from '../../assets/assets'
import '../../components/Main/Main.css'
import { Context } from '../../context/Context'

const Main = () => {

const{onSent,RecentPrompt,ShowResult,loading,ResultData,setInput,Input} =useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

         {!ShowResult ? 
         <>
         <div className="greet">
          <p><span>Hello,Guest</span></p>
          <p>How can I help you today?</p>
        </div>

      <div className="cards">
        <div className="card">
        <p>Give me a help care for a tricky plant</p>
        <img src={assets.compass_icon} alt="" />
        </div>
     
        <div className="card">
        <p>Give me a beginner's guide to a activity</p>
        <img src={assets.question_icon} alt="" />
        </div>
    
      
        <div className="card">
        <p>Look up for Linux shell command for a speicific task</p>
        <img src={assets.code_icon} alt="" />
        </div>

        <div className="card">
        <p>Compare the differences between pickleball and tennis</p>
        <img src={assets.bulb_icon} alt="" />
        </div>
      
      </div>
         </>
         :

         <div className='result'>
          <div className='resulttitle'>
           <img src={assets.user_icon} alt="" />
           <p> {RecentPrompt}</p>
          </div>

          <div className='resultdata'>
           <img src={assets.gemini_icon} alt="" />
           {loading 
           ?
          <div className='loader'>
              <hr />
              <hr />
              <hr />
          </div>
          
        : <p  dangerouslySetInnerHTML={{__html:ResultData}}/>
        }
          </div>

         </div>
        }
        
      </div>
      <div className="main-bottom">
        <div className="searchbox">
          <input onChange={(e)=>setInput(e.target.value)} value={Input}  type="text" placeholder='Enter a prompt here' />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
     
}

export default Main
