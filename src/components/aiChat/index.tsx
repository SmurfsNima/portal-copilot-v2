/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from '@/api';
import React, { useEffect, useState ,useRef } from 'react';
import { useParams } from 'react-router-dom';

type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
};
interface AiChatProps{
  memberID? : null | number
}
const AiChat: React.FC<AiChatProps> = ({memberID}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [memberId,setMemberId] = useState<any>(memberID)
  const [input, setInput] = useState('');
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setMemberId(memberID)
  },[memberID])
  useEffect(() => {
    if(id != undefined){
      setMemberId(id)
    }
  },[id])
  const [conversationId, setConversationId] = useState<number>(1);
  useEffect(()=> console.log(conversationId), [conversationId]
  )
  const handleSend = async() => {
    if (input.trim() && memberId!==null) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        text: input,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
      try{
        const res = await Application.aiStudio_copilotChat({
          text: newMessage.text,
          member_id: memberId,
          conversation_id: conversationId,

        })
        console.log(res);
   
          const data = await res.data
          setConversationId(data.current_conversation_id
          )
          const aiMessage: Message = {
            id: messages.length + 2,
            sender: 'ai',
            text: data.answer, 
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
         
      } 
      
      catch(err){
        console.log(err);
        
      }
      // Simulate AI response
      // setTimeout(() => {
      //   const aiMessage: Message = {
      //     id: messages.length + 2,
      //     sender: 'ai',
      //     text: 'Thank you for your message!',
      //     time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      //   };
      //   setMessages((prevMessages) => [...prevMessages, aiMessage]);
      // }, 1000);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }    
  useEffect(() => {
      scrollToBottom()
  }, [messages]);    
  useEffect(() => {
    Application.getListChats({
      member_id:memberId
    }).then(res => {
      const resolve = res.data.messages.flatMap((mes:any,index:number) => {
        const request:Message = {
          id:1,
          sender:'user',
          text:mes.request,
          time:mes.entrytime
        }
        const response:Message = {
          id:index,
          sender:'ai',
          text:mes.response,
          time:mes.entrytime
        }
        return [
          request,
          response
        ]
        
        
      })
      setMessages(resolve)
      // console.log(resolve)
    })
  },[memberId])
  return (
    <div className="w-full h-[424px]  mx-auto  bg-black-primary border border-main-border  rounded-md relative flex flex-col ">
      
      <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
        {messages.map((msg) => (
          <>
            {msg.sender=='ai' ?
              <div className='flex justify-start items-start gap-1'>
                <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#383838]'>
                  <img src="./images/clinic.png" alt="" />                 
                </div>
                <div>
                  <div className='text-[#FFFFFFDE] text-[12px]'>AI-Copilot <span className='text-[#FFFFFF99] ml-1'>{msg.time}</span></div>
                  <div className='max-w-[500px] bg-[#272727] p-4 text-justify  mt-1 border-[#383838] border text-[#FFFFFFDE] text-[12px] rounded-[20px] rounded-tl-none ' style={{lineHeight:'26px'}}>{msg.text}</div>
                </div>
              </div>
            :
              <div className='flex justify-end items-start gap-1'>
                <div className='flex flex-col items-end'>
                  <div className='text-[#FFFFFFDE] text-[12px]'>Coach <span className='text-[#FFFFFF99] ml-1'>{msg.time}</span></div>
                  <div className='max-w-[500px] bg-[#272727] p-4 text-justify mt-1 border-[#383838] border text-[#FFFFFFDE] text-[12px] rounded-[20px] rounded-tr-none '>{msg.text}</div>
                </div>
                <div className='w-[40px] h-[40px] overflow-hidden flex justify-center items-center rounded-full bg-[#383838]'>
                  <img className='rounded-full' src={`https://ui-avatars.com/api/?name=${'Coach'}`} alt="" />                 
                </div>
              </div>
            }
          </>
          // <div key={msg.id} className={` relative flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
          //   <div className="flex flex-col items-center space-x-2 max-w-[383px]">
          //   <div className='text-primary-text flex items-center gap-3 '>{msg.sender === "ai" ? 'ai-coilot' : 'nima'}
          //   <span className="text-xs  text-gray-400">{msg.time}</span></div>

          //     <div className={`rounded-[20px] p-3 bg-black-secondary text-primary-text`}>
          //       <p>{msg.text}</p>
          //     </div>
             
          //   </div>
          // </div>
        ))}
        <div  ref={messagesEndRef}></div>
      </div>
      <div className="w-[98%] bg-black-primar  absolute bottom-0 ml-2 mb-2    border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border border-main-border bg-black-secondary rounded-md outline-none pl-2 py-1 text-xs text-primary-text"
          type="text"
          placeholder="Write here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img onClick={handleSend} src="/Themes/Aurora/icons/send.svg" alt="" />
      </div>
      {/* <div className="p-4 border-t border-gray-700 flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded-lg outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div> */}
    </div>
  );
};

export default AiChat;