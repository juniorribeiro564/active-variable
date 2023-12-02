import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../../service/asset.service';
interface DadosTabela {
    dia: string;
    data: string;
    valor: number;
    variacaoD1: number;
    variacaoPrimeiraData: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public symbol = '';
    public assetValueOpen: string = '';
    public assetValueClose: string = '';
    public dataSource: any;
    public dados: DadosTabela[] = [];
    public nameAsset: string = '';
    public searchTerm: string = '';

    // chartData: ChartDataSets[] = [{ data: [], label: 'Valor' }];
    // chartLabels: ChartOptions[] = [];
    // chartOptions: ChartOptions = {
    //     responsive: true,
    //     scales: {
    //         x: [{
    //             type: 'time',
    //             time: {
    //                 unit: 'day',
    //                 tooltipFormat: 'DD/MM/YYYY',
    //             },
    //         }],
    //         y: [{
    //             title: {
    //                 display: true,
    //                 text: 'Valor',
    //             },
    //         }],
    //     } as any
    // };
    // chartType: ChartType = 'line';

    constructor(
        private assetService: AssetsService
    ) { }

    ngOnInit(): void {
    }

    public getAction() {
        this.assetService.addAsset(this.searchTerm).subscribe({
            next: (next: any) => {
                const quoteData = next.chart.result[0].indicators.quote[0].open;
                for (let i = 0; i < Math.min(30, quoteData.length); i++) {
                    const dia = i + 1;
                    const data = new Date(next.chart.result[0].meta.currentTradingPeriod.regular.start * 1000);
                    data.setDate(data.getDate() + dia - 1);
                    if (data.getDay() >= 1 && data.getDay() <= 5) {
                        const valor = quoteData[i];
                        let variacaoD1 = 0;
                        let variacaoPrimeiraData = 0;

                        if (i > 0) {
                            variacaoD1 = ((quoteData[i] - quoteData[i - 1]) / quoteData[i - 1]) * 100;
                            variacaoPrimeiraData = ((quoteData[i] - quoteData[0]) / quoteData[0]) * 100;
                        }

                        this.dados.push({
                            dia: this.obterDiaSemana(data.getDay()),
                            data: this.formatarData(data),
                            valor: valor.toString().slice(0, 5),
                            variacaoD1,
                            variacaoPrimeiraData
                        });
                    }
                }
            },
            error: (error: any) => {
                return error
            }
        });
    }

    getSearch() {
        if (this.searchTerm.length > 0) {
            this.getAction();
        }
      }

    // public ngAfterViewInit(): void {
    //     this.criarGrafico();
    // }

    // public criarGrafico(): void {
    //     const ctx = this.canvas?.nativeElement.getContext('2d');

    //     if (!ctx) {
    //         console.error('Erro ao obter o contexto do canvas.');
    //         return;
    //       }

    //     const data = this.dados.map(item => item.valor);
    //     const labels = this.dados.map(item => item.data) as any[];

    //     this.chartData[0].data = data;
    //     this.chartLabels = labels;

    //     new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: this.chartLabels as any,
    //             datasets: this.chartData,
    //         },
    //         options: this.chartOptions,
    //     });
    // }

    public obterDiaSemana(dia: number): string {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return diasSemana[dia];
    }

    public formatarData(data: Date): string {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}
