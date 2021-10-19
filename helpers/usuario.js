const validarDireccionAgregarUser = async (direccion)=>{
    //limpiar variable
    direccion = direccion.trim();
    if(direccion.length > 50){
        return "Direccion supero los 50 caracteres"
    }
    return true
}

export {
    validarDireccionAgregarUser
}