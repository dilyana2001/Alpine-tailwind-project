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
        successFinalMessase: false,

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

        subStepHandler(id, swiper) {
            this.subStepErrors = [];
            if (!this.nameData.name) {
                this.subStepErrors.push('Entrez le nom!');
                return this.subStepErrors;
            }
            if (this.nameData.name) {
                this.subStepErrors = [];
            }

            const name = this.nameData.name;
            const newsletter = this.nameData.newsletter;

            if (this.arrayNameData.name.some(x => x[0] == id)) {
                const index = this.arrayNameData.name.find(x => x[0] == id);
                index[0] = id;
                index[1] = this.nameData.name;
                index[2] = this.nameData.newsletter;
            } else {
                this.arrayNameData.name.push([id, name, newsletter]);
            }

            this.nameData.name = '';
            this.nameData.newsletter = false;
            console.log(this.arrayNameData.name);
            swiper.slideNext();
        },

        sendDataHandler() {
            this.secondStepErrors = [];
            this.successMessage = '';
            if (this.arrayNameData.name.length < this.numberSteps) {
                this.secondStepErrors.push('Entrez tous les noms!');
                return this.firstStepErrors.concat(this.secondStepErrors);
            }

            return fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.formData,
                        ...this.arrayNameData
                    })
                })
                .then(() => {
                    this.formData.email = '';
                    this.formData.question = '';
                    this.formData.message = '';
                    this.numberSteps = '';
                    this.successMessage = 'Merci! Votre question a été envoyée avec succès!';
                    this.successFinalMessase = true;
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