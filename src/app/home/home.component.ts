import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    selected: Date | null = new Date()

    // Admin or profile details

    adminStatus: boolean = false
    adminDetails: any = {}
    profileImg: string = "https://cdn.iconscout.com/icon/free/png-256/free-employee-1714118-1459147.png?f=webp"
    showsSideBar: boolean = true
    employeeCount:number=0

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions = {}

    constructor(private api: ApiServiceService) {
        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Work Completion Report'
            },
            tooltip: {
                valueSuffix: '%'
            },

            /* to remove watermarks */
            credits: {
                enabled: false
            },

            /* if needed or else delete */
            subtitle: {

            },
            /* dont edit plotOpitions */
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },

            /* to edit */
            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'React',
                            y: 55.02
                        },
                        {
                            name: 'HTML',
                            sliced: true,
                            selected: true,
                            y: 26.71
                        },
                        {
                            name: 'Typescript',
                            y: 1.09
                        },
                        {
                            name: 'Javascript',
                            y: 15.5
                        },
                        {
                            name: 'CSS',
                            y: 1.68
                        }
                    ]
                }
            ]

        }
        HC_exporting(Highcharts);

        // function to call admin details
        api.loginAPI().subscribe({
            next: (res: any) => {
                console.log(res);
                this.adminDetails = res

                // profile picture
                if (res.picture) {
                    this.profileImg = res.picture
                }

            },
            error: (err: any) => {
                console.log(err);

            }
        })

    }


    ngOnInit(): void {
        this.getAllEmployee()
    }


    getAdminDetail() {
        this.api.loginAPI().subscribe({
            next: (res: any) => {
                console.log(res);
                this.adminDetails = res

                // profile picture
                if (res.picture) {
                    this.profileImg = res.picture
                }

            },
            error: (err: any) => {
                console.log(err);

            }
        })
    }


    editStatus() {
        this.adminStatus = true
    }


    getFile(event: any) {
        // to convert file to url file reader
        let file = event.target.files[0]
        console.log(file);

        // to convert file to url 
        let fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = (event: any) => {
            this.profileImg = event.target.result
            this.adminDetails.picture = event.target.result

        }

    }


    cancel() {
        this.getAdminDetail()
        this.adminStatus = false
    }


    updateAdmin() {
        this.api.updateAdminAPI(this.adminDetails).subscribe({
            next: (res: any) => {
                Swal.fire({
                    title: 'woooh',
                    text: 'Updated Details',
                    icon: 'success'
                })
                console.log(res);
                this.adminDetails = res

            },
            error: (err: any) => {
                console.log(err);

            }
        })
    }


    //to handle sidebar 
    handlesideBar() {
        this.showsSideBar = !this.showsSideBar
    }


    getAllEmployee() {
        this.api.getAllEmplyeeAPI().subscribe({
            next: (res: any) => {
                console.log(res);
                this.employeeCount

            },
            error: (err: any) => {
                console.log(err);

            }
        })
    }




}


