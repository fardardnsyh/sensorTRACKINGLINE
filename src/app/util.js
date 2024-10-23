import Swal from "sweetalert2"

export const letterDBKey = process.env.NEXT_PUBLIC_Seceret_Key_API


export function getDBData(DBKey){
    return JSON.parse(localStorage.getItem(DBKey)) || []
}
export function saveDBData(DBKey, DBData){
    if(!DBKey || !DBData){
        Swal.fire({
            title: "Error!",
            text: `${DBKey || DBData} is not valid!`,
            icon: "error",
            confirmButtonText: "ok",
          }).then(res =>{
            if(res.isConfirmed){
                return
            }
          });
    }

    localStorage.setItem(DBKey, JSON.stringify(DBData))
}

