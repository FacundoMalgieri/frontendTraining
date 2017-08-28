import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

declare var particlesJS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})

export class ContactComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder, private db: AngularFireDatabase, private router: Router) {
        this.createForm();
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if ((evt instanceof NavigationEnd))
                window.scrollTo(0, 0);
        });
        
        particlesJS.load('particles-js', 'assets/js/particles.json', function() {});
    }

    /**
     * @todo DOCUMENTAR!!!!!!!!!!!!!!!!!!!!!!
     */
    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    /**
     * 
     */
    onSubmit() {
        const { name, email, subject, message } = this.form.value;
        const html = `
            <div>From: ${name}</div>
            <div>Email: <a href="mailto:${email}">${email}</a></div>
            <div>Date: ${subject}</div>
            <div>Message: ${message}</div>`;
        let formRequest = { name, email, message, subject, html };
        this.db.list('/messages').push(formRequest);
        console.log(formRequest);
        this.form.reset();
    }
}