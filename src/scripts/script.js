function contactForm() {
    return {
        numberSteps: 1,
        formData: {
            email: '',
            question: '',
            message: '',
        },
        error: [],
        message: '',
        errorHandler() {
            this.error = [];
            this.message = '';
            if (!this.formData.email || !this.formData.question || !this.formData.message) {
                this.error.push('Tous les champs sont requis!');
            }
            if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/)) {
                this.error.push('S\'il vous plaît, mettez une adresse email valide!');
            }
            if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                this.error.push('La question et le message doivent comporter au moins cinq caractères!');
            }
            return this.error;
        },
        personalData: {
            name: '',
            newsletter: false
        },
        nameError: [],
        nameErrorHandler() {
            this.nameError = [];
            if (!this.personalData.name) {
                this.nameError.push('Entrez votre nom.');
                console.log(this.personalData);
                return this.nameError;
            }
            if (!this.formData.email || !this.formData.question || !this.formData.message) {
                this.nameError.push('Veuillez appuyer sur le bouton Précédent et remplir tous les champs!');
                return this.nameError;
            }
            this.submitDataHandler();
        },
        submitDataHandler() {
            this.error = [];
            this.message = '';
            let data = {
                ...this.formData,
                ...this.personalData
            }
            if (!this.error.length == 0) {
                return;
            }
            return fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(() => {
                    this.formData.email = '';
                    this.formData.question = '';
                    this.formData.message = '';
                    this.personalData.name = '',
                        this.message = 'Merci! Votre question a été envoyée avec succès!';
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        return this.error = err;
                    }
                    return this.error;
                });
        }
    }
}

