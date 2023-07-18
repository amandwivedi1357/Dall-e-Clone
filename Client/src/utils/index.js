import {surpriseMePrompts}  from "../Constansts"
import FileSaver from "file-saver"
export const  getrandomPrompts = (prompt)=>{
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompts = surpriseMePrompts[randomIndex]

    if(randomIndex===prompt) return getrandomPrompts(prompt)

    return randomPrompts
}

export async function downloadImage(_id,photo){
FileSaver.saveAs(photo,`download-${_id}.jpg`)
}