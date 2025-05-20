import React from 'react'

const Home = () => {
  return (
    <div className='w-full p-4'>
      <div className='w-full flex items-center justify-center text-2xl'>
        Thanks for trying out React-Ignite !
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <div>
          For firebase authentication to work, create a new firebase project and paste all the config keys to 
          <span className='text-blue-500 text-2xl'>&apos;.env.example&apos;</span> file
        </div>
        <div>
          Dont forget to provision your firestore database in your project for authentication to work well
        </div>
        <div>
          First add config keys, then website will work
        </div>
      </div>
      <div>Also, add .env to .gitignore</div>
    </div>
  )
}

export default Home