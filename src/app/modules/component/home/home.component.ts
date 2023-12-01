import { Component, OnInit } from '@angular/core';
import { ActiveService } from '../../../service/active.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public symbol = '';
    public activeValueOpen: string = '';
    public activeValueClose: string = '';
    public dataSource: any;
    public displayedColumns = ['index', 'date', 'open', 'close', 'variation'];

    constructor(
        private activeService: ActiveService
    ) { }



    ngOnInit(): void {
        this.dataSource = [
            {
                dia: '0',
                data:'',
                valor: '',
                variacao: '',
                variavao2: ''
            }
        ]
        this.activeService.addActive('PETR4.SA').subscribe({
            next: (next: any) => {
                // this.dataSource = next.chart.result[0].indicators.quote[0].open;
                this.activeValueClose = next.chart.result[0].indicators.quote[0].close[417];
            },
            error: (error: any) => {
                return error
            }
        });
    }

    // getData() {
    //     // let query = `${this.symbol}?period1=${period1}&period2=${period2}&intertrval=1d&events=history`
    //     this.activeService.getData('query').subscribe({
    //         next: (next: any) => {
    //             next;
    //         },
    //         error: (error: any) => {
    //             return error
    //         }
    //     });
    // }
}
