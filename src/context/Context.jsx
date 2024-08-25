import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); //Trả về chuỗi
    const [recentPrompt, setRecentPrompt] = useState(""); //Trả về chuỗi
    const [prevPrompts, setPrevPrompts] = useState([]); // Trả về mảng Prompts
    const [showResult, setShowResult] = useState(false); // Trả về trạng thái
    const [loading, setLoading] = useState(false);   // Trả về trạng thái
    const [resultData, setResultData] = useState(""); // Trả về chuỗi
{/* Tạo các Hook để quản lý đầu vào, câu hỏi gần đây, câu hỏi trước, in kết quả, tải, trả kết quả */}
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }
    {/* Hàm dùng để tạo hiệu ứng giống gõ chữ, index là chỉ số của phần tử hiện tại, nextWord là từ tiếp theo
        khi gõ sẽ dùng setResultData() để trả kết quả */}
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    {/* Hàm newChat sẽ thực hiện xóa hiệu ứng Loading và ShowResult */}
    const onSent = async (prompt) => {
        setResultData("") //Làm rỗng dữ liệu kết quả
        setLoading(true) //Chạy hiệu ứng Loading
        setShowResult(true) //Show kết quả
        let response;
        if (prompt !== undefined) {
            resonpse = await runChat(prompt)
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        {/* Nếu đã có prompt thì lấy response từ API và setRecntPrompt
            Nếu chưa có prompt thì thêm PrevPrompts vào mảng và thêm RecentPrompt vào từ input
            Sau đó lấy response từ API */}
        let responseArray = response.split("**"); //Tạo mảng các từ và loại bỏ **
        let newResponse;
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]; //newResponse sẽ cộng thêm vào nếu là từ đầu hoặc số chẵn
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>"; //Nếu lẻ cộng thêm in đậm
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>") //Thay thế dấu * bằng thẻ ngắt dòng 
        let newResponseArray = newResponse2.split(" ");// Biến thàng mảng dựa trên khoảng trắng
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }// Hiển thị sử dụng delayPara
        setLoading(false)
        setInput("")
        {/* Ẩn Loading và setInput là rỗng */}
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider