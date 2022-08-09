import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
    
    constructor(private router: Router) {}
    
    ngOnInit(): void {
        
    }

    onSubmit(form: NgForm): void {
        this.router.navigate(['search', form.value.search])
        
        form.reset();
    }
}