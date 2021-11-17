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
            people: []
        },
        firstStepErrors: [],
        subStepErrors: [],
        secondStepErrors: [],
        successFinalMessase: false,

        newSwiper() {
            return swiper = new Swiper('.swiper', {
                loop: true,
                followFinger: true,
                slidesPerView: 1,
                spaceBetween: 30,
                noSwiping: true,
                onlyExternal: true,
                noSwipingClass: 'swiper-slide'
            })
        },

        // need to return an array
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
            if (this.firstStepErrors.length > 0) {
                return this.firstStepErrors;
            }

            this.arrayNameData.people = [];
            for (let i = 1; i <= this.numberSteps; i++) {
                let initializeInformation = {};
                initializeInformation[i] = { name: '', isNewsletter: false };
                this.arrayNameData.people.push(initializeInformation);
            }
            console.log(this.arrayNameData.people);
            return this.firstStepErrors;
        },

        //dont need to return an array
        subStepHandler(id) {
            this.subStepErrors = [];
            let index = this.arrayNameData.people.find(x => x.hasOwnProperty(id));

            if (!this.nameData.name) {
                this.subStepErrors.push('Entrez le nom!');
                return this.subStepErrors;
            }
            if (this.nameData.name) {
                this.subStepErrors = [];
            }

            index[id] = {
                name: this.nameData.name,
                isNewsletter: this.nameData.newsletter
            };
            this.nameData.newsletter = false;
            console.log(this.arrayNameData.people);
        },

        getInputValue(id) {
            if (this.arrayNameData.people.length == 0) {
                return '';
            }
            const index = this.arrayNameData.people.find(x => x.hasOwnProperty(id));
            console.log(Object.values(index)[0].name)
            return Object.values(index)[0].name;
        },

        // need to return an array
        sendDataHandler() {
            this.firstStepErrors = [];
            this.secondStepErrors = [];
            this.successMessage = '';

            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis!');
                return this.firstStepErrors;
            }
            if (this.arrayNameData.people.length < this.numberSteps) {
                this.secondStepErrors.push('Entrez tous les noms!');
                return this.secondStepErrors;
            }

            let data = {
                ...this.formData,
                ...this.arrayNameData
            };

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
                    this.numberSteps = '';
                    this.successMessage = 'Merci! Votre question a été envoyée avec succès!';
                    this.successFinalMessase = true;
                })
                .catch((err) => {
                    if (err) {
                        this.firstStepErrors.push(err);
                    }
                    return this.firstStepErrors.concat(this.secondStepErrors);
                });
        },
    }
}