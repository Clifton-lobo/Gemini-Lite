import { createContext, useState } from 'react';
import run from '../config/Gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [Input, setInput] = useState("");
  const [RecentPrompt, setRecentPrompt] = useState("");
  const [PrevPrompt, setPrevPrompt] = useState([]);
  const [ShowResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ResultData, setResultData] = useState("");

  // Moved delayPara inside ContextProvider
  const delayPara = (index, nextword) => {
    setTimeout(() => {
      setResultData(prev => prev + nextword);  // Using setResultData correctly in scope
    }, 75 * index);
  };

  const newchat =()=>{
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response; // Declare response once
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt(prev => [...prev, Input]);
      setRecentPrompt(Input);
      response = await run(Input);
    }
    // Removed redundant redeclaration of `response`

    let responseArray = response.split("**");
    let newResponse = " ";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextword = newResponseArray[i];
      delayPara(i, nextword + " ");  
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    PrevPrompt,
    setPrevPrompt,
    onSent,
    Input,
    setInput,
    loading,
    setLoading,
    RecentPrompt,
    setRecentPrompt,
    ResultData,
    ShowResult,
    newchat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
