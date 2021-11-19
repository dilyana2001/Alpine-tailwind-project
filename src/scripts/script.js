function contactForm() {
    return {
        numberSteps: '',
        successMessage: '',
        formData: {
            email: '',
            question: '',
            message: '',
            phone: '',
        },
        fullNumber: '',
        nameData: {
            title: '',
            name: '',
            newsletter: false,
        },
        arrayNameData: {
            people: []
        },
        firstStepErrors: [],
        subStepErrors: [],
        secondStepErrors: [],
        successFinalMessage: false,

        newSwiper() {
            return swiper = new Swiper('.swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return `<span class="${className}">${index + 1}</span>`;
                    },
                },
                loop: true,
                followFinger: true,
                slidesPerView: 1,
                noSwiping: true,
                noSwipingClass: 'swiper-slide',
            })
        },

        // need to return an array
        firstStepHandler() {
            this.secondStepErrors = [];
            this.firstStepErrors = [];
            this.subStepErrors = [];
            this.successMessage = '';
            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis !');
            } else {
                if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/)) {
                    this.firstStepErrors.push(`S'il vous plaît, mettez une adresse email valide !`);
                }
                if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                    this.firstStepErrors.push('La question et le message doivent comporter au moins cinq caractères !');
                }
                if (typeof this.numberSteps != 'number') {
                    this.firstStepErrors.push('La familia Veuillez saisir un numéro !');
                }
                if (typeof this.formData.phone != 'number') {
                    this.firstStepErrors.push('La phone numero Veuillez saisir un numéro !');
                }
                if (this.firstStepErrors.length > 0) {
                    return this.firstStepErrors;
                }
            }

            if (!this.arrayNameData.people.length) {
                for (let i = 1; i <= this.numberSteps; i++) {
                    this.inicializeEmptyObject(i);
                }
                console.log(this.arrayNameData.people);
                return this.firstStepErrors;
            }

            if (this.arrayNameData.people.length > this.numberSteps) {
                this.arrayNameData.people.splice(this.numberSteps);
            }

            if (this.arrayNameData.people.length < this.numberSteps) {
                for (let i = this.arrayNameData.people.length + 1; i <= this.numberSteps; i++) {
                    this.inicializeEmptyObject(i);
                }
            }

            console.log(this.arrayNameData.people);
            return this.firstStepErrors;
        },

        //dont need to return an array
        subStepHandler(id, valueName, title) {

            this.subStepErrors = [];
            this.secondStepErrors = [];

            let index = this.arrayNameData.people.find(x => x.hasOwnProperty(id));
            valueName = valueName.trim();

            if (!valueName) {
                this.subStepErrors.push('Entrez le nom !');
                return this.subStepErrors;
            }
            this.subStepErrors = [];

            index[id] = {
                title: title,
                name: valueName,
                isNewsletter: this.nameData.newsletter
            };

            this.nameData.newsletter = false;
            console.log(this.arrayNameData.people);
            swiper.slideNext();
        },

        // need to return an array
        sendDataHandler() {
            this.firstStepErrors = [];
            this.secondStepErrors = [];
            this.successMessage = '';
            let emptySlots = [];

            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis !');
                return this.firstStepErrors;
            }

            this.arrayNameData.people.forEach(x => {
                for (let i in x) {
                    if (x[i].name.trim() == '') {
                        emptySlots.push(`${i}`);
                    }
                }
            });

            if (emptySlots.length > 0) {
                emptySlots.map(x => this.secondStepErrors.push(`Entrez tous les noms de la ligne ${x} !`));
                return this.secondStepErrors;
            }
            this.secondStepErrors = [];

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
                    this.successFinalMessage = true;
                    this.successMessage = 'Merci! Votre question a été envoyée avec succès !';
                })
                .catch((err) => {
                    if (err) {
                        this.secondStepErrors.push(err);
                    }
                    return this.firstStepErrors.concat(this.secondStepErrors);
                });
        },

        inicializeEmptyObject(i) {
            let person = {};
            person[i] = {
                title: '',
                name: '',
                isNewsletter: false
            };
            this.arrayNameData.people.push(person);
        },
    }
}