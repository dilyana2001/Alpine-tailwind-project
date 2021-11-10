function contactForm() {
    let error = '';
    return {
        data: {
            email: '',
            question: '',
            message: ''
        },

        submitDataHandler() {
            if (!this.data.email || !this.data.question || !this.data.message) {
                error = 'All fields are required!';
                console.log(error);
                return error;
            }
            if (!this.data.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]{2,}/g)) {
                error = 'Please enter a correct email address!';
                console.log(error)
                return error;
            }
            if (this.data.question.length < 5 || this.data.message.length < 5) {
                error = 'Question and message need to be at least five symbols!';
                console.log(error)
                return error;
            }

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