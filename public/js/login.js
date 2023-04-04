const loginForm = document.getElementById('loginForm')

if (loginForm instanceof HTMLFormElement) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const data = new FormData(loginForm)
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
        fetch('/api/sesiones/', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result.status === 200) {
                    window.location.replace('/')
                }
            })
    })
}