import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    @ViewChild('visualization') visElemRef;
    @ViewChild('item') itemElemRef;

    public itemPositionCalculated: number[] = [];

    constructor() {
    }

    ngOnInit() {

        // Fetch the width and height of the visualization layer

        setInterval(() => {
            const itemWidth: number = this.itemElemRef.nativeElement.offsetWidth;
            const visualizerWidth: number = this.visElemRef.nativeElement.offsetWidth - itemWidth;

            this.itemPositionCalculated[0] = 0;
            this.itemPositionCalculated[1] = Math.round(visualizerWidth * parseFloat(Math.random().toString().substr(0, 3)));
        }, 125 * 2);
    }
}
