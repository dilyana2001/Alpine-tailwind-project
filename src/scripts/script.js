function contactForm() {
    return {
        numberSteps: '',
        successMessage: '',
        formData: {
            email: '',
            question: '',
            message: '',
        },
        nameData: {
            name: '',
            newsletter: false,
        },
        arrayNameData: {
            name: []
        },
        firstStepErrors: [],
        subStepErrors: [],
        secondStepErrors: [],

        firstStepErrorHandler() {
            this.firstStepErrors = [];
            this.successMessage = '';
            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis!');
            }
            if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/)) {
                this.firstStepErrors.push(`S'il vous plaît, mettez une adresse email valide!`);
            }
            if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                this.firstStepErrors.push('La question et le message doivent comporter au moins cinq caractères!');
            }
            return this.firstStepErrors;
        },

        subStepHandler(id) {
            this.subStepErrors = [];
            if (!this.nameData.name) {
                this.subStepErrors.push('Entrez le nom!');
                return this.subStepErrors;
            }
            if (this.nameData.name) {
                this.subStepErrors = [];
            }
            if (this.arrayNameData.name.length > this.numberSteps - 1) {
                return;
            }

            this.arrayNameData.name.push([id, this.nameData.name, this.nameData.newsletter]);
            this.nameData.name = '';
            this.nameData.newsletter = false;
            console.log(this.arrayNameData.name);
        },

        sendDataHandler() {
            this.secondStepErrors = [];
            this.successMessage = '';
            if (this.arrayNameData.name.length < this.numberSteps) {
                this.secondStepErrors.push('Entrez tous les noms!');
                return this.secondStepErrors;
            }
// if(this.arrayNameData.name)
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
                    this.successMessage = 'Merci! Votre question a été envoyée avec succès!';
                })
                .catch((err) => {
                    if (err) {
                        this.firstStepErrors.push(err);
                    }
                    return this.firstStepErrors;
                });
        },
    }
}

