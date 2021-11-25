function contactForm() {
    return {
        numberSteps: '',
        successMessage: '',
        formData: {
            email: '',
            question: '',
            message: '',
            fullNumber: ''
        },
        phone: '',
        nameData: {
            title: '',
            name: '',
            newsletter: false,
            dateOfBirth: '',
        },
        arrayNameData: {
            people: []
        },
        firstStepErrors: [],
        secondStepErrors: [],
        successFinalMessage: false,
        emptySlots: [],

        newSwiper() {
            return swiper = new Swiper('.swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className}">${index + 1}</span>`;
                    },
                },
                loop: true,
                followFinger: true,
                slidesPerView: 1,
                noSwiping: true,
                noSwipingClass: 'swiper-slide',
            });
        },

        firstStepHandler() {
            this.secondStepErrors = [];
            this.firstStepErrors = [];
            this.successMessage = '';

            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis !');
            } else {
                if (this.numberSteps <= 0) {
                    this.firstStepErrors.push('Le nombre de membres doit être un nombre positif !');
                }
                if (!this.formData.email.match(/[a-z\d]+[.]?[_]?[-]?[a-z\d]+@{1}[a-z]+[-]?[a-z]+[.]?[a-z]+[.][a-z]+/)) {
                    this.firstStepErrors.push(`S'il vous plaît, mettez une adresse email valide !`);
                }
                if (this.formData.question.length < 5 || this.formData.message.length < 5) {
                    this.firstStepErrors.push('Question et message doivent comporter au cinq caractères!');
                }
                if (typeof this.numberSteps != 'number') {
                    this.firstStepErrors.push('Les membres de la famille doivent être un numéro !');
                }
                if (this.numberSteps > 15) {
                    this.firstStepErrors.push('Le nombre de membres doit être au maximum de quinze !');
                }
                if (!typeof Number(this.phone) == 'number') {
                    this.firstStepErrors.push('Entrer un numéro de téléphone !');
                }
                if (this.firstStepErrors.length > 0) {
                    return this.firstStepErrors;
                }
            }

            if (!this.arrayNameData.people.length) {
                for (let i = 1; i <= this.numberSteps; i++) {
                    this.inicializeEmptyObject(i);
                }
            }

            if (this.arrayNameData.people.length > this.numberSteps) {
                this.arrayNameData.people.splice(this.numberSteps);
            }

            if (this.arrayNameData.people.length < this.numberSteps) {
                for (let i = this.arrayNameData.people.length + 1; i <= this.numberSteps; i++) {
                    this.inicializeEmptyObject(i);
                }
            }

            let code = document.querySelector('.iti__selected-dial-code');
            this.formData.fullNumber = `${code.textContent}-${this.phone}`;

            console.log(this.arrayNameData.people);
            return this.firstStepErrors;
        },

        subStepHandler(id, nameValue, title, dateValue) {
            this.secondStepErrors = [];
            let index = this.arrayNameData.people.find(x => x.hasOwnProperty(id));
            nameValue = nameValue.trim();

            if (!nameValue) {
                this.secondStepErrors.push('Entrez le nom !');
                return this.secondStepErrors;
            }

            const age = this.calculateAges(dateValue);
            if (age) {
                if (age < 0 || age > 120) {
                    this.secondStepErrors.push(`Entrez l'âge correct !`);
                    return this.secondStepErrors;
                }
                if (age < 14) {
                    this.secondStepErrors.push('Le membre de la famille doit avoir 14 ans !');
                    return this.secondStepErrors;
                }
            }

            index[id] = {
                title: title,
                name: nameValue,
                dateOfBirth: dateValue,
                isNewsletter: this.nameData.newsletter
            };

            document.querySelectorAll('.swiper-pagination-bullet')[id - 1].classList.remove('error-bullet');
            this.nameData.newsletter = false;
            swiper.slideNext();
        },

        sendDataHandler() {
            this.firstStepErrors = [];
            this.secondStepErrors = [];
            this.successMessage = '';
            this.emptySlots = [];

            if (!this.formData.email || !this.formData.question || !this.formData.message || !this.numberSteps) {
                this.firstStepErrors.push('Tous les champs sont requis !');
                return this.firstStepErrors;
            }

            this.arrayNameData.people.forEach(x => {
                for (let i in x) {
                    if (x[i].name.trim() == '') {
                        this.emptySlots.push(`${i}`);
                    }
                }
            });

            if (this.emptySlots.length > 0) {
                this.secondStepErrors.push('Entrez tous les noms !');

                let swiperBullets = document.querySelectorAll('.swiper-pagination-bullet');
                this.emptySlots.map((x) => {
                    swiperBullets[x - 1].classList.add('error-bullet');
                })
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
                    this.successFinalMessage = true;
                    this.successMessage = 'Merci! Votre question a été envoyée avec succès !';
                })
                .catch((err) => {
                    if (err) {
                        this.secondStepErrors.push(err);
                    }
                    return this.secondStepErrors;
                });
        },

        inicializeEmptyObject(i) {
            let person = {};
            person[i] = {
                title: '',
                name: '',
                dateOfBirth: '',
                isNewsletter: false
            };
            this.arrayNameData.people.push(person);
        },

        calculateAges(dateValue) {
            const regex = /(?<year>[\d]{4,})-(?<month>[\d]{2,})-(?<day>[\d]{2,})/;
            const dateOfBirthObj = (regex).exec(dateValue);

            if (!(dateValue).match(regex)) {
                return;
            }
            return moment().diff(`${dateOfBirthObj.groups.year}-${dateOfBirthObj.groups.month}-${dateOfBirthObj.groups.day}`, 'years');
        },
    }
}
