export function maskInput(value:string, mask:string){

    let valorFormatado = '';
    let i = 0;

    for (let char of mask) {
        if (char === '#') {
            if (value[i] != null) {
                valorFormatado += value[i]
                i++;
            } else {
                break
            }
        } else {
            valorFormatado += char
        }
    }

    return valorFormatado
}

export function maskOutput(value:string, mask:string){
 
    let valorFormatado = '';
    let i = 0;

    for (let char of mask) {
        
        if (char === '#') {
            
            if(value[i] == null){
                break;
            } 
            valorFormatado += value[i]
        }
        i++
    }
    return valorFormatado
}