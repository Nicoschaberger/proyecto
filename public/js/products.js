const btns = document.getElementsByTagName('button');

const addProductsCart = async (pId) => {
    try{
        const result = await fetch(`http://localhost:8080/api/carts/${cId}/product/${pId}`, {
            body: JSON.stringify({
                quantity: 1
            }),
            method: 'post',
            headers: {
                'content-Type': 'appication/json'
            }
        });
        if(result){
            alert('Se agrego correctamente');
        }
    } catch(error){
    alert('Error, no se pudo agregar')
}
}

for(let btn of btns){
    btn.addEventListener('click', (event) => {
        addProductsCart(btn.id)
    })
}