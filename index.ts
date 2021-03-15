import {busSeat} from './bus-seat';
import { Maps, ISelectionEventArgs, Selection } from '@syncfusion/ej2-maps';

    let seatInfo: HTMLDivElement = <HTMLDivElement>document.getElementById('selectedseats');
    Maps.Inject(Selection);
    interface SeatInfo {
        seatNo?: number;
        fill?: string;
    }
    let maps: Maps = new Maps({
        itemSelection: (args: ISelectionEventArgs) => {
            // Prohibit selection on booked seats
            if ((args.shapeData as SeatInfo).fill === 'Orange') {
                args.fill = 'Orange !important';
                document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
                return;
            }
            args.fill = 'green';
            let seat: number = (args.shapeData as SeatInfo).seatNo;
            let connector: string = ' ';

            // To add initial/connector text
            if (seatInfo.innerHTML === '') {
                seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
            } else {
                connector = ', ';
            }
            let seatString: string = '<span class="seats">' + connector + seat + '</span>';
            let seatString1: string = ' ' + seat + '</span><span class="seats">,</span>';
            let lastString: string = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';

            // To add/remove the seat number from the selected list
            if (seatInfo.innerHTML.indexOf(seatString) === -1 && seatInfo.innerHTML.indexOf(seatString1) === -1 &&
                seatInfo.innerHTML.indexOf(lastString) === -1) {
                seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
            } else {
                seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString, '');
                seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString1, '');
                if (seatInfo.innerHTML === lastString) {
                    seatInfo.innerHTML = '';
                }
            }
        },
        height: '400',
        width: '200',
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                geometryType: 'Normal',
                shapeData:busSeat,
                shapeSettings: {
                    colorValuePath: 'fill'
                },
                selectionSettings: {
                    enable: true,
                    enableMultiSelect: true
                }
            }
        ]
    });
    maps.appendTo('#maps');
    document.getElementById('clear-btn').onclick = () => {
        seatInfo.innerHTML = '';
        let selected: HTMLCollection = document.getElementsByClassName('ShapeselectionMapStyle');
        for (let i: number = 0, length: number = selected.length; i < length; i++) {
            selected[0].setAttribute('class', '');
        }
    };