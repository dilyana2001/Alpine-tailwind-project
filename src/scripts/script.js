function contactForm() {
    return {
        numberSteps: '',
        message: '',
        formData: {
            email: '',
            question: '',
            message: '',
        },
        nameData: {
            name: '',
            newsletter: ''
        },
        arrayNameData: {
            name: []
        },
        error: [],
        nameError: [],

        errorHandler() {
            this.error = [];
            this.message = '';
            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.error.push('Tous les champs sont requis!');
            }
            if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/)) {
                this.error.push(`S'il vous plaît, mettez une adresse email valide!`);
            }
            if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                this.error.push('La question et le message doivent comporter au moins cinq caractères!');
            }
            return this.error;
        },

        nameHandler() {
            if (this.arrayNameData.name.length > this.numberSteps) {
                return;
            }
            this.arrayNameData.name.push([this.nameData.name, this.nameData.newsletter]);
            this.nameData.name = '';
            this.nameData.newsletter = false;
        },

        nameErrorHandler() {
            this.nameError = [];
            this.message = '';
            if (this.arrayNameData.name.length < this.numberSteps) {
                this.nameError.push('Entrez tous les noms!');
                return this.nameError;
            }

            return fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...this.formData, ...this.arrayNameData })
            })
                .then(() => {
                    this.formData.email = '';
                    this.formData.question = '';
                    this.formData.message = '';
                    this.numberSteps = '';
                    this.message = 'Merci! Votre question a été envoyée avec succès!';
                })
                .catch((err) => {
                    if (err) {
                        this.error.push(err);
                    }
                    return this.error;
                });
        },
    }
}

