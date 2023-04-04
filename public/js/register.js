const registerForm = document.querySelector('#registerForm')
if (registerForm instanceof HTMLFormElement){
    registerForm.addEventListener('click', event => {
        event.preventDefault()

        const data = new FormData(registerForm)
        const obj = {}
        data.forEach((value, key) => obj[key] = value)

        fetch('/api/usuarios',{
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Constent-Type' : 'application/json'}
        })
        .then(result => {
            if (result.status === 200) {
                window.location.replace('/login')
            }
        })
    })
}