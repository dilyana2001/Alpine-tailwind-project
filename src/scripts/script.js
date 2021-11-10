function contactForm() {
    return {
        formData: {
            email: '',
            question: '',
            message: ''
        },
        error: '',
        submitDataHandler() {
            this.error = '';
            if (!this.formData.email || !this.formData.question || !this.formData.message) {
                this.error = 'All fields are required!';
                return;
            }
            if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/g)) {
                this.error = 'Please enter a correct email address!';
                return;
            }
            if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                this.error = 'Question and message need to be at least five symbols!';
                return;
            }

            return fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.formData)
            })
                .then(() => {
                    this.formData.email = '';
                    this.formData.question = '';
                    this.formData.message = '';
                    alert('Thank you! Your question is sucessfully submitted!');
                })
                .catch(() => this.error);
        }
    }
}

function navBar() {
    return {
        openCloseNav() {
            let sideNavBar = document.getElementById("mySidepanel");
            sideNavBar.style.width == "500px"
                ? sideNavBar.style.width = "0"
                : sideNavBar.style.width = "500px";
        }
    }
}