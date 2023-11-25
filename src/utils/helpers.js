export const formatPrice = (number) => {
    const newNumber=Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR'
    }).format(number/3)
    return newNumber;
}

export const getUniqueValues = (data,type) => {
    let unique=data.map((item)=>item[type])
    unique = unique.filter((value) => value !== undefined);
    if(type==='colors'){
        unique=unique.flat()
    }
    return ['all',...new Set(unique)]
}

