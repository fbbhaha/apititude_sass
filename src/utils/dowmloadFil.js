export function fileDown(res,name) { 
    const bold = new Blob([res]) 
    const href = URL.createObjectURL(bold) 
    const down = document.createElement('a')
    down.href = href
    down.download =timeName() +name
    document.body.appendChild(down)
    down.click()
    document.body.removeChild(down)
    URL.revokeObjectURL(href)
    console.log()
}
function timeName(){
        let time = '',
            year = new Date().getFullYear(),
            month = new Date().getMonth()+1 
            console.log(year)
    return  time = `${year}-${month}  `
}