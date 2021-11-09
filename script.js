function contactForm() {
    return {
        data: {
            email: '',
            question: '',
            message: ''
        },

        submitDataHandler() {
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.data)
            })
        }
    }
}