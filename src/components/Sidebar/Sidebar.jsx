import React, { useState,useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../Assets/assets/assets'
import { Context } from '../../context/Context'
const sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt,newChat } = useContext(Context)
  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt); {/* Đây là một lời gọi đến hàm setRecentPrompt,
      có nhiệm vụ cập nhật giá trị của recentPrompt trong state với giá trị của prompt truyền vào.
      Hàm này là hàm đồng bộ */ }
    await onSent(prompt); {/* Đây là lời gọi tới hàm onSent(prompt),
      và vì có await, nó sẽ chờ cho đến khi onSent hoàn thành trước khi tiếp tục thực hiện bất kỳ mã nào sau nó.
      onSent là một hàm bất đồng bộ, có khả năng trả về một Promise. 
      Vì thế, await đảm bảo rằng mã sẽ không tiếp tục cho đến khi onSent hoàn thành.
      (Sau đó loadPrompt mới kết thúc) */}
  }
  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        {/* Nhấn vào ảnh thay đổi trạng thái mở và đóng của sidebar */ }
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New chat</p> : null}
        </div>
        {/* Nếu ấn vào thẻ div thì sẽ tạo newChat, nếu extended thì sẽ hiện New chat */ }
        {extended ?
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              )
            })}
          </div> : null} {/* Map qua tất cả phần tử trong mảng prePrompts, và return về jsx với thẻ div,
                             nếu kick vào thì loadPrompt với item đó */}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default sidebar
