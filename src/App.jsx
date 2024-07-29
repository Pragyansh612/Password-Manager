import { useEffect, useState } from 'react'
import './App.css'
import Nav from './comp/Nav'
import Foot from './comp/Foot'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [Show, setShow] = useState(false)
  const [URL, setURL] = useState('')
  const [URL2, setURL2] = useState([])
  const [User, setUser] = useState('')
  const [Pass, setPass] = useState('')

  const handlePass = () => {
    setShow(!Show)
  }

  const handleURL = (e) => {
    setURL(e.target.value)
  }

  const handleUser = (e) => {
    setUser(e.target.value)
  }

  const handlePassw = (e) => {
    setPass(e.target.value)
  }

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: URL, user: User, pass: Pass })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      setURL2([...URL2, data]);
      setURL('');
      setUser('');
      setPass('');
      localStorage.setItem("URL2", JSON.stringify([...URL2, data])); // Store the updated URL2
      alert("Data saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save data: " + error.message);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("URL2")
    if (data) {
      const d = JSON.parse(data)
      setURL2(d)
    }
  }, [URL])

  const handleDel = (index) => {
    const password = [...URL2]
    password.splice(index, 1)
    setURL2(password)
    localStorage.setItem("URL2", JSON.stringify(password));
  }
  const handleEdit = (index) => {
    const selectedItem = URL2[index];
    setURL(selectedItem.url);
    setUser(selectedItem.user);
    setPass(selectedItem.pass);
    handleDel(index)
  }

  return (
    <>
      <Nav />
      <div className=' flex justify-center'>
        <div>
          <div className='text-center text-3xl m-2 font-semibold'>PassOP</div>
          <div className='text-lg m-1 font-medium text-center'>Your Password Manager</div>
          <div className=' relative top-6 flex flex-col gap-4 items-center'>
            <input onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave()
              }
            }} value={URL} onChange={(e) => handleURL(e)} type="text" className=' bg-slate-300 rounded-xl text-center w-96 h-10' placeholder='Enter URL'
            />
            <input onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave()
              }
            }} value={User} onChange={(e) => handleUser(e)} type="text" placeholder='Enter Username' className='bg-slate-300 rounded-xl text-center w-64 h-8' />
            {Show ? <div>
              <input value={Pass} onChange={(e) => handlePassw(e)} type="text" placeholder='Enter Password' className='bg-slate-300 rounded-xl text-center w-64 h-8 relative left-2' />
              <button className='relative right-5' onClick={() => { handlePass() }}><FaEyeSlash /></button>
            </div> : <div>
              <input value={Pass} onChange={(e) => handlePassw(e)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }} type="password" placeholder='Enter Password' className='bg-slate-300 rounded-xl text-center w-64 h-8 relative left-2' />
              <button className=' relative right-5' onClick={() => { handlePass() }}><FaEye /></button>
            </div>}
            <div className=' flex justify-center'>
              <button onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }} onClick={handleSave} className=' bg-violet-500 rounded-2xl text-white h-10 w-16'>Save</button>
            </div>
            <div className=' flex flex-col'>
              <div className=' text-center text-xl font-semibold'>Your Passwords</div>
              <div>
                {URL2.length === 0 ? <div className=' text-center'>No Passwords</div> : <div>
                  <div className=' bg-emerald-300 h-8'>
                    <div className=' flex gap-20 m-4 p-1'>
                      <div className=' w-96 text-center'>
                        URL
                      </div>
                      <div>
                        Username
                      </div>
                      <div>
                        Password
                      </div>
                      <div>
                        Action
                      </div>
                    </div>
                  </div>
                  {URL2.map((item, index) => (
                    <div key={index} className=' flex justify-center'>
                      <div className='relative text-center w-96 right-10'>{item.url}</div>
                      <div className='text-center relative right- w-32'>{item.user}</div>
                      <div className='text-center m-2 relative left-6 w-32'>{"*".repeat(item.pass.length)}</div>
                      <div className=' flex m-2 gap-2 relative left-16 w-16'>
                        <button onClick={() => handleEdit(index)}><FaEdit className='size-5' /></button>
                        <button onClick={() => handleDel(index)}><MdDelete className='size-5' /></button>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  )
}

export default App
