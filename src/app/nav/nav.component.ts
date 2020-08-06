import { Component, OnInit } from '@angular/core';
import { SquizifyService } from '../app.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    constructor(
        public api: SquizifyService
    ) { }

    ngOnInit(): void {
        
    }

}
