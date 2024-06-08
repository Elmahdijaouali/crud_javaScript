// mini projet en javascript ( CRUD ) 
let form=document.forms['form_ajouter']
let nom =form['nom']
let prenom =form['prenom']
let email=form['email']
let btn_ajouter=document.querySelector("#ajouter")

// validation form 
 function validationForm(){
      
      if(nom.value=="" ){
        if(nom.nextElementSibling.tagName != "SPAN"){
            let span=document.createElement("span");
            span.innerHTML="remplir le champ nom !!<br>"
            span.style.color="red"
            nom.after(span)
        }
        return false 
      }else{
        if(nom.nextElementSibling.tagName == "SPAN"){
            nom.nextElementSibling.remove()
        }
      }

      if(prenom.value==""){
        if(prenom.nextElementSibling.tagName != "SPAN"){
            let span=document.createElement("span");
            span.innerHTML="remplir le champ prénom !! <br>"
            span.style.color="red"
            prenom.after(span)
        }
        return false
      }else{
        if(prenom.nextElementSibling.tagName == "SPAN"){
            prenom.nextElementSibling.remove()
        }
      }

      if(email.value==""){
        if(email.nextElementSibling.tagName != "SPAN"){
            let span=document.createElement("span");
            span.innerHTML="remplir le champ email <br>"
            span.style.color="red"
            email.after(span)
        }
        return false
      }else{
        if(email.nextElementSibling.tagName == "SPAN"){
            email.nextElementSibling.remove()
        }
      }

      
      if(!/\w+@\w+\.\w+/.test(email.value)){
         alert("email false ")
         return false
      }
     
      return true
 }
let users=[]

// ajouter en array javascript 
function ajoute(){
        if(    validationForm()){
            let user ={}
             user.firstname=`${prenom.value}`
             user.lastname=`${nom.value}`
             user.email=`${email.value}`
             users.push(user)
             
              clear()
        }
    afficher()
    }
    // affichage en html 
function afficher(){
    let tbody=document.querySelector("tbody")
    tbody.textContent=""
     users.forEach((e)=>{
        let row =tbody.insertRow()
        let cell_nom=row.insertCell()
        cell_nom.textContent=e.lastname
        let cell_prenom =row.insertCell()
        cell_prenom.textContent=e.firstname
        let cell_email =row.insertCell()
        cell_email.textContent=e.email
        //   supprimer 
        let cell_delete =row.insertCell()
        let btn_d=document.createElement("input")
        btn_d.type='button'
        btn_d.value="Supprimer"
        btn_d.setAttribute("class","btn btn-danger")

        btn_d.onclick=function(){
            // alert(this.value)
           let index=this.parentElement.parentElement.rowIndex -1
           users.splice(index,1)
           afficher()
        }
        cell_delete.append(btn_d)
        // modifer 
        let cell_update =row.insertCell()
        let btn_u=document.createElement("input")
        btn_u.type='button'
        btn_u.value="Modifer"
        btn_u.setAttribute("class","btn btn-primary")
        
        btn_u.onclick=function(){
           
           let index=this.parentElement.parentElement.rowIndex -1
            let user=users[index]
            nom.value=user.lastname
            prenom.value=user.firstname
            email.value=user.email

            let btn_update=document.querySelector(".modifer")
            btn_update.style.display="inline"
            btn_ajouter.style.display="none"
            btn_update.onclick=function(){
                if(validationForm()){
                    user.lastname=nom.value
                    user.firstname=prenom.value
                    user.email=email.value

                afficher()
                clear()
                }
                btn_update.style.display="none" 
                btn_ajouter.style.display="inline"          
            }
        }
        cell_update.append(btn_u)
     })
     
}
// clear the inputs 
function clear(){
    nom.value=""
    prenom.value=""
    email.value=""
}
