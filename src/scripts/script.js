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
                this.error = 'Tous les champs sont requis!';
                return;
            }
            if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/g)) {
                this.error = 'S\'il vous plaît, mettez une adresse email valide!';
                return;
            }
            if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                this.error = 'La question et le message doivent comporter au moins cinq caractères!';
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
                    alert('Merci! Votre question a été envoyée avec succès!');
                })
                .catch(() => this.error);
        }
    }
}

function navBar() {
    return {
        openCloseNav() {
            let sideNavBar = document.getElementById("mySidepanel");
            sideNavBar.style.width == "450px"
                ? sideNavBar.style.width = "0"
                : sideNavBar.style.width = "450px";
        }
    }
}