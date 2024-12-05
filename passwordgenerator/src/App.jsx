import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberallow,setNumallow]=useState(false);
  const [charallow,setCharallow]=useState(false);
  const [password,setPassword]=useState("");

  //useRef Hook
  const passwordRef= useRef(null)

  const passwordGenerator=useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallow) str+="0123456789"
    if(charallow)str+="!@#$%^&*(){}:<>?=+"

    for (let i=1; i<= length; i++){
      let char= Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberallow,charallow,setPassword])

  const copyPasswordToClipboard=useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0.999);
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=> {
    passwordGenerator()

  },[length,numberallow,charallow,passwordGenerator])
  return (
    <>
    <div className="w-full align-center max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow justify-center align-center 
     rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberallow}
          id="numberInput"
          onChange={() => {
              setNumallow((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charallow}
              id="characterInput"
              onChange={() => {
                  setCharallow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
  </>  
  )
}

export default App
