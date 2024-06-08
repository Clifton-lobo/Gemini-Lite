import React, { useContext, useState } from 'react'
import './Sidebar.css'
import assets from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
 
 const{onSent,PrevPrompt,setRecentPrompt,newchat} = useContext(Context)
 const loadPrompt = async (prompt)=>{
   setRecentPrompt(prompt)
    await onSent(prompt)
 }
  const[extended,setextended]=useState(false)

  const MenuExtend=()=>{
    setextended(prev=>!prev)
  }
 

  return (
    <div className='sidebar'>

      <div className="top">
             <img  onClick={MenuExtend} className='menu'  src={assets.menu_icon} alt="" />
        <div onClick={()=>newchat()}  className='newchat'>
            <img src={assets.plus_icon} alt="" />
            {extended? <p>New chat</p>:null}
        </div>
       {extended? <div className='recent'>
          <p className='recent-title'>Recent</p>
            {PrevPrompt.map((item,index) =>{
              return(
                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                       <img src={assets.message_icon} alt="" />
                       <p>{item.slice(0,18)}...</p>

               </div>
              )})
              }
        </div>:null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-item">
          <img src={assets.question_icon} alt="" />
         {extended? <p>Help</p>:null}
        </div>
        <div className="bottom-item recent-item">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Recent</p>:null}
        </div>
        <div className="bottom-item recent-item">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>


      </div>
    </div>
  )
}

export default Sidebar
