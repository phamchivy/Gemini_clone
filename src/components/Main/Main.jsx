import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../Assets/assets/assets'
import { Context } from '../../context/Context'
const Main = () => {
    {/* Lấy các trạng thái và dữ liệu từ Context */ }
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {/* Nếu biến showResult là false thì render ra bên dưới */}
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for out work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'> {/* Nếu showResult là đúng thì show kết quả */}
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>  {/* Hiện câu hỏi */}
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />

                                </div> : <p dangerouslySetInnerHTML={{ __html: resultData }} ></p>}
                            {/* Kiểm tra loading nếu là đúng thì hiện loading không thì trả về kết quả */}
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a promt here' />
                        {/* Thanh input và value của input sẽ luôn được cập nhật trong thanh người dùng nhập */}
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        {/* Khi ấn gửi thì hàm onSent() sẽ được gọi */}
                        </div>
                    </div>
                    <p className="bottom-info">Gemini may display inaccurate info, including about poeple, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    )
}

export default Main
