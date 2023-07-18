import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card, FormField, Loader } from '../Components'

const RenderCards = ({data,title})=>{
if(data?.length>0) {
    return data.map((post)=><Card key={post.id} {...post}/>)
}
return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
        {title}
    </h2>
)
}

const Home = () => {
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)
    const [searchText, setSearchText] = useState("abc")


    useEffect(() => {
      const fetchPost = async()=>{
        setLoading(true)

        try {
            const res = await fetch('http://localhost:8080/api/v1/post',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            if(res.ok){
                const results = await res.json()
                setAllPosts(results.data.reverse())
            }
        } catch (error) {
            alert(error)
        }
        finally{
            setLoading(false)
        }
      }  
      fetchPost();
    }, []);

    const handleSearchChange = (e)=>{
        clearTimeout(searchTimeout)
        setSearchText(e.target.value);

        setSearchTimeout(setTimeout(()=>{
            const searchResults = allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())|| item.prompt.toLowerCase().includes(searchText.toLowerCase()))

            setSearchedResults(searchResults)
        },500))
        
    }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px] '>
           The Community Showcase 
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'> Browse through a collection of imaginative and visually stunning images genenrated by DALL-E AI</p>
      </div>
      <div className="mt-16 ">
        <FormField 
        labelName='search Post'
        type = "text"
        name = "text"
        placeholder='search posts'
        value={searchText}
        handleChange={handleSearchChange}
        />      
      </div>
      <div className="mt-10">
        {loading ? 
        (
            <div className="flex justify-center items-center">
                <Loader />
            </div>
        )   :  (
            <>
            {searchText && (
                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    Showing results for <span className='text-[#222328]'>{searchText}</span>
                </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText ? (
                    <RenderCards
                    data = {[]}
                    title="No Search Result found"
                    />
                )
            :
            (
                <RenderCards
                data={allPosts}
                title = "No posts Found"
                />
            )
            }
            </div>
            </>
        )
}
      </div>
    </section>
  )
}

export default Home
